/**
 * =============================================================================
 * CHECKPOINT: STAGE 06 - GitHub Repository Fetcher
 * =============================================================================
 *
 * This challenge combines: Promises, Async/Await, Error Handling
 *
 * Run this file: bun run checkpoints/stage-06/challenge.ts
 */

// =============================================================================
// TYPES
// =============================================================================

type GitHubUser = {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
};

type GitHubRepo = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    language: string | null;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
    };
    created_at: string;
    updated_at: string;
    pushed_at: string;
};

type FetchResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };

type RepoStats = {
    totalStars: number;
    totalForks: number;
    languages: Record<string, number>;
    mostStarred: GitHubRepo | null;
    recentlyUpdated: GitHubRepo | null;
};

// =============================================================================
// CUSTOM ERRORS
// =============================================================================

/**
 * TASK 1: Create custom error classes
 *
 * Create three custom error classes that extend Error:
 * 1. NetworkError - for network/connection issues
 * 2. RateLimitError - for GitHub API rate limits (include resetTime property)
 * 3. UserNotFoundError - for 404 user responses
 */

// TODO: Implement NetworkError class
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

// TODO: Implement RateLimitError class with resetTime property (number - unix timestamp)
export class RateLimitError extends Error {
    constructor(message: string, public resetTime: number) {
        super(message);
        this.name = "RateLimitError";
    }
}

// TODO: Implement UserNotFoundError class
export class UserNotFoundError extends Error {
    constructor(username: string) {
        super(`User '${username}' not found`);
        this.name = "UserNotFoundError";
    }
}

// =============================================================================
// API CLIENT
// =============================================================================

const GITHUB_API_BASE = "https://api.github.com";

/**
 * TASK 2: Create a fetch wrapper with error handling
 *
 * @param url - The URL to fetch
 * @returns Promise that resolves to the JSON response
 * @throws NetworkError if fetch fails
 * @throws RateLimitError if rate limited (403 with X-RateLimit-Reset header)
 * @throws Error for other HTTP errors
 */
async function fetchJSON<T>(url: string): Promise<T> {
    // TODO:
    // 1. Try to fetch the URL
    // 2. If fetch throws, convert to NetworkError
    // 3. Check response.ok
    // 4. If 403, check for rate limit headers and throw RateLimitError
    // 5. If !ok, throw Error with status text
    // 6. Parse and return JSON

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 403) {
            const resetTime = parseInt(response.headers.get("X-RateLimit-Reset") || "0");
            throw new RateLimitError("Rate limit exceeded", resetTime);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * TASK 3: Fetch a GitHub user by username
 *
 * @param username - GitHub username
 * @returns Promise resolving to GitHubUser
 */
export async function fetchUser(username: string): Promise<GitHubUser> {
    // TODO: Use fetchJSON to get user from /users/{username}
    // Handle 404 specifically by throwing UserNotFoundError
    return fetchJSON<GitHubUser>(`${GITHUB_API_BASE}/users/${username}`);
}

/**
 * TASK 4: Fetch repositories for a user
 *
 * @param username - GitHub username
 * @param page - Page number (optional, default 1)
 * @param perPage - Items per page (optional, default 30)
 * @returns Promise resolving to array of GitHubRepo
 */
export async function fetchUserRepos(
    username: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubRepo[]> {
    // TODO: Use fetchJSON to get repos from /users/{username}/repos
    // Include query params: page, per_page, sort=updated
    const url = `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`;
    return fetchJSON<GitHubRepo[]>(url);
}

/**
 * TASK 5: Fetch all repositories (handle pagination)
 *
 * GitHub limits to 100 items per page, so we need to fetch multiple pages
 *
 * @param username - GitHub username
 * @param maxPages - Maximum pages to fetch (default 10)
 * @returns Promise resolving to all repositories
 */
export async function fetchAllRepos(
    username: string,
    maxPages: number = 10
): Promise<GitHubRepo[]> {
    // TODO:
    // 1. Fetch pages until we get less than 100 items or reach maxPages
    // 2. Use Promise.all for parallel fetching (optional optimization)
    // 3. Flatten results into single array

    const allRepos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (page <= maxPages) {
        const repos = await fetchUserRepos(username, page, perPage);
        allRepos.push(...repos);

        if (repos.length < perPage) break;
        page++;
    }

    return allRepos;
}

// =============================================================================
// DATA PROCESSING
// =============================================================================

/**
 * TASK 6: Calculate repository statistics
 *
 * @param repos - Array of repositories
 * @returns Aggregated statistics
 */
export function calculateStats(repos: GitHubRepo[]): RepoStats {
    // TODO:
    // 1. Calculate total stars (sum of stargazers_count)
    // 2. Calculate total forks (sum of forks_count)
    // 3. Count repos by language (exclude null languages)
    // 4. Find most starred repo
    // 5. Find most recently updated repo (compare pushed_at dates)

    if (repos.length === 0) {
        return {
            totalStars: 0,
            totalForks: 0,
            languages: {},
            mostStarred: null,
            recentlyUpdated: null,
        };
    }

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

    const languages: Record<string, number> = {};
    for (const repo of repos) {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    }

    const mostStarred = repos.reduce((max, repo) =>
        repo.stargazers_count > max.stargazers_count ? repo : max
    );

    const recentlyUpdated = repos.reduce((latest, repo) =>
        new Date(repo.pushed_at) > new Date(latest.pushed_at) ? repo : latest
    );

    return {
        totalStars,
        totalForks,
        languages,
        mostStarred,
        recentlyUpdated,
    };
}

// =============================================================================
// RESULT WRAPPER (DISCRIMINATED UNION)
// =============================================================================

/**
 * TASK 7: Create a safe fetch function with Result type
 *
 * Use discriminated unions to return either success or error
 *
 * @param fetchFn - Async function to execute
 * @returns FetchResult with success flag
 */
export async function safeFetch<T>(
    fetchFn: () => Promise<T>
): Promise<FetchResult<T>> {
    // TODO:
    // 1. Try to execute fetchFn
    // 2. Return { success: true, data: result } on success
    // 3. Return { success: false, error: message } on error
    // Handle different error types appropriately

    try {
        const data = await fetchFn();
        return { success: true, data };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "Unknown error occurred" };
    }
}

/**
 * TASK 8: Fetch user with their repository stats
 *
 * Combines user and repo fetching with proper error handling
 *
 * @param username - GitHub username
 */
export async function fetchUserWithStats(username: string): Promise<{
    user: GitHubUser;
    repos: GitHubRepo[];
    stats: RepoStats;
}> {
    // TODO:
    // 1. Fetch user first
    // 2. If user exists, fetch their repos
    // 3. Calculate stats
    // 4. Return combined result
    // Use Promise.all for parallel fetching where possible

    const user = await fetchUser(username);
    const repos = await fetchAllRepos(username);
    const stats = calculateStats(repos);

    return { user, repos, stats };
}

// =============================================================================
// BONUS: CONCURRENT FETCHING WITH LIMITS
// =============================================================================

/**
 * BONUS TASK: Fetch multiple users concurrently with a concurrency limit
 *
 * @param usernames - Array of usernames
 * @param concurrency - Max concurrent requests (default 5)
 * @returns Array of FetchResults
 */
export async function fetchMultipleUsers(
    usernames: string[],
    concurrency: number = 5
): Promise<FetchResult<GitHubUser>[]> {
    // TODO:
    // Implement a concurrency-limited batch fetcher
    // Use a queue or chunking approach
    // Don't use external libraries - implement from scratch

    const results: FetchResult<GitHubUser>[] = [];

    for (let i = 0; i < usernames.length; i += concurrency) {
        const batch = usernames.slice(i, i + concurrency);
        const batchResults = await Promise.all(
            batch.map(username => safeFetch(() => fetchUser(username)))
        );
        results.push(...batchResults);
    }

    return results;
}

// =============================================================================
// TEST YOUR SOLUTION
// =============================================================================

async function runTests() {
    console.log("=".repeat(60));
    console.log("GITHUB REPOSITORY FETCHER - TESTS");
    console.log("=".repeat(60));

    const testUsername = "octocat"; // GitHub's official test account

    try {
        // Test fetchUser
        console.log(`\n👤 Fetching user: ${testUsername}`);
        const user = await fetchUser(testUsername);
        console.log(`   Name: ${user.name || user.login}`);
        console.log(`   Public repos: ${user.public_repos}`);
        console.log(`   Followers: ${user.followers}`);

        // Test fetchUserRepos
        console.log(`\n📦 Fetching repositories...`);
        const repos = await fetchUserRepos(testUsername, 1, 5);
        console.log(`   Found ${repos.length} repos (first page)`);
        repos.forEach(repo => {
            console.log(`   - ${repo.name} (⭐ ${repo.stargazers_count})`);
        });

        // Test calculateStats
        console.log(`\n📊 Repository Statistics:`);
        const stats = calculateStats(repos);
        console.log(`   Total Stars: ${stats.totalStars}`);
        console.log(`   Total Forks: ${stats.totalForks}`);
        console.log(`   Languages: ${JSON.stringify(stats.languages)}`);
        if (stats.mostStarred) {
            console.log(`   Most Starred: ${stats.mostStarred.name}`);
        }

        // Test safeFetch
        console.log(`\n🔒 Testing safeFetch with invalid user...`);
        const result = await safeFetch(() => fetchUser("this-user-does-not-exist-12345"));
        if (result.success) {
            console.log(`   Unexpected success`);
        } else {
            console.log(`   Got expected error: ${result.error}`);
        }

        // Test error handling
        console.log(`\n❌ Testing UserNotFoundError...`);
        try {
            await fetchUser("this-user-definitely-does-not-exist-xyz");
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                console.log(`   Caught UserNotFoundError: ${error.message}`);
            } else {
                console.log(`   Got different error: ${error}`);
            }
        }

    } catch (error) {
        console.error(`\n❌ Error: ${error}`);
        if (error instanceof RateLimitError) {
            const resetDate = new Date(error.resetTime * 1000);
            console.log(`   Rate limit resets at: ${resetDate.toLocaleTimeString()}`);
        }
    }

    console.log("\n" + "=".repeat(60));
    console.log("Complete the TODOs to make all tests pass!");
    console.log("Note: These tests use the real GitHub API");
    console.log("=".repeat(60));
}

// Run tests
runTests();
