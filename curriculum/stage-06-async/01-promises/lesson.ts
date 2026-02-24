/**
 * =============================================================================
 * LESSON 01: PROMISES
 * =============================================================================
 *
 * Promises represent asynchronous operations that will complete in the future.
 * TypeScript adds type safety with Promise<T> where T is the resolved value type.
 *
 * Run this file: bun run curriculum/stage-06-async/01-promises/lesson.ts
 */

// =============================================================================
// PART 1: PROMISE<T> TYPE
// =============================================================================

// Promise<T> represents a value that will be available in the future
// T is the type of the resolved value

// Creating a Promise manually
const fetchUserData = new Promise<{ id: number; name: string }>((resolve, reject) => {
    // Simulate async operation
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve({ id: 1, name: "Alice" });
        } else {
            reject(new Error("Failed to fetch user"));
        }
    }, 100);
});

// The Promise is now pending - it will resolve or reject later
console.log("Promise created:", fetchUserData);

// Type inference with promises
const numberPromise: Promise<number> = Promise.resolve(42);
const stringPromise = Promise.resolve("hello"); // Type: Promise<string>


// =============================================================================
// PART 2: .THEN() AND .CATCH()
// =============================================================================

// .then() handles successful resolution
// .catch() handles rejection

fetchUserData
    .then((user) => {
        // TypeScript knows user is { id: number; name: string }
        console.log(`User loaded: ${user.name} (ID: ${user.id})`);
        return user.id; // Return value is passed to next .then()
    })
    .then((userId) => {
        // TypeScript knows userId is number
        console.log(`Got user ID: ${userId}`);
    })
    .catch((error) => {
        // Handles any rejection in the chain
        console.error("Error:", error.message);
    });

// Chaining promises - each .then() returns a new Promise
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(50)
    .then(() => {
        console.log("Step 1 complete");
        return delay(50);
    })
    .then(() => {
        console.log("Step 2 complete");
        return "final result";
    })
    .then((result) => {
        console.log(`Result: ${result}`);
    });


// =============================================================================
// PART 3: PROMISE.ALL()
// =============================================================================

// Promise.all() waits for ALL promises to resolve
// Returns a Promise of an array with all results

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve("two");
const promise3 = Promise.resolve(true);

const allPromises = Promise.all([promise1, promise2, promise3]);
// Type: Promise<[number, string, boolean]>

allPromises.then(([num, str, bool]) => {
    console.log(`All resolved: ${num}, ${str}, ${bool}`);
});

// Practical example: fetch multiple users in parallel
function fetchUser(id: number): Promise<{ id: number; name: string }> {
    const users = ["Alice", "Bob", "Charlie"];
    return Promise.resolve({ id, name: users[id - 1] });
}

const userIds = [1, 2, 3];
const userPromises = userIds.map(id => fetchUser(id));

Promise.all(userPromises).then(users => {
    console.log("All users loaded:", users.map(u => u.name));
});

// If ANY promise rejects, Promise.all() rejects immediately
const mixedPromises = [
    Promise.resolve("good"),
    Promise.reject(new Error("bad")),
    Promise.resolve("also good")
];

Promise.all(mixedPromises).catch(err => {
    console.log("Promise.all failed:", err.message);
});


// =============================================================================
// PART 4: PROMISE.RACE() AND PROMISE.ALLSETTLED()
// =============================================================================

// Promise.race() - resolves/rejects as soon as FIRST promise resolves/rejects
const slow = new Promise<string>((resolve) => setTimeout(() => resolve("slow"), 200));
const fast = new Promise<string>((resolve) => setTimeout(() => resolve("fast"), 50));

Promise.race([slow, fast]).then(winner => {
    console.log(`Race winner: ${winner}`); // "fast"
});

// Promise.allSettled() - waits for ALL, returns status of each
// Never rejects - always resolves with array of results
const settledPromises = [
    Promise.resolve("success 1"),
    Promise.reject(new Error("failure")),
    Promise.resolve("success 2")
];

Promise.allSettled(settledPromises).then(results => {
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Promise ${index} succeeded:`, result.value);
        } else {
            console.log(`Promise ${index} failed:`, result.reason.message);
        }
    });
});

// Promise.any() (ES2021) - resolves with first SUCCESSFUL promise
// Only rejects if ALL promises reject
const anyPromises = [
    Promise.reject(new Error("fail 1")),
    Promise.resolve("first success"),
    Promise.resolve("second success")
];

Promise.any(anyPromises).then(firstSuccess => {
    console.log("First success:", firstSuccess); // "first success"
}).catch(err => {
    // err is AggregateError if all fail
    console.log("All failed:", err.errors);
});


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a function 'fetchWithTimeout' that takes a Promise and a timeout.
// Use Promise.race() to return the promise result OR reject with "Timeout" if too slow.

// TODO 2: Create a function 'loadAllData' that takes an array of user IDs
// and fetches all user data using Promise.all(). Return the array of users.

// TODO 3: Create a function 'retryPromise' that attempts a promise up to N times.
// If all attempts fail, return the last error.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Data Loader with Parallel Fetching
 *
 * Build a type-safe data loading system:
 *
 * 1. Create interfaces:
 *    - User { id, name, email }
 *    - Post { id, userId, title, body }
 *    - Comment { id, postId, text }
 *
 * 2. Create mock data fetchers (return Promises with setTimeout):
 *    - fetchUser(id): Promise<User>
 *    - fetchPostsForUser(userId): Promise<Post[]>
 *    - fetchCommentsForPost(postId): Promise<Comment[]>
 *
 * 3. Create a 'DataLoader' class with methods:
 *    - loadUserWithPosts(userId): Promise<{ user: User; posts: Post[] }>
 *    - loadPostsWithComments(userId): Promise<PostWithComments[]>
 *      where PostWithComments = Post & { comments: Comment[] }
 *    - loadUserDashboard(userId): Promise<{
 *        user: User;
 *        posts: PostWithComments[];
 *        stats: { totalPosts: number; totalComments: number }
 *      }>
 *
 * 4. Use Promise.all() for parallel fetching where possible
 * 5. Add proper error handling
 */

interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface Comment {
    id: number;
    postId: number;
    text: string;
}

type PostWithComments = Post & { comments: Comment[] };

// Mock data
const mockUsers: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];

const mockPosts: Post[] = [
    { id: 1, userId: 1, title: "First Post", body: "Hello world" },
    { id: 2, userId: 1, title: "Second Post", body: "Another post" },
    { id: 3, userId: 2, title: "Bob's Post", body: "Hi there" }
];

const mockComments: Comment[] = [
    { id: 1, postId: 1, text: "Great post!" },
    { id: 2, postId: 1, text: "Thanks for sharing" },
    { id: 3, postId: 2, text: "Interesting" }
];

// Mini challenge helper functions (prefixed to avoid collision with examples)
function apiFetchUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers.find(u => u.id === id);
            user ? resolve(user) : reject(new Error("User not found"));
        }, 100);
    });
}

function apiFetchPostsForUser(userId: number): Promise<Post[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockPosts.filter(p => p.userId === userId));
        }, 100);
    });
}

function apiFetchCommentsForPost(postId: number): Promise<Comment[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockComments.filter(c => c.postId === postId));
        }, 50);
    });
}

export class DataLoader {
    // TODO: Implement loadUserWithPosts using apiFetchUser and apiFetchPostsForUser
    async loadUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
        throw new Error("Not implemented");
    }

    // TODO: Implement loadPostsWithComments using apiFetchCommentsForPost
    async loadPostsWithComments(userId: number): Promise<PostWithComments[]> {
        throw new Error("Not implemented");
    }

    // TODO: Implement loadUserDashboard combining all data
    async loadUserDashboard(userId: number): Promise<{
        user: User;
        posts: PostWithComments[];
        stats: { totalPosts: number; totalComments: number };
    }> {
        throw new Error("Not implemented");
    }
}

export async function runChallenge() {
    const loader = new DataLoader();

    try {
        console.log("Loading user with posts...");
        const userWithPosts = await loader.loadUserWithPosts(1);
        console.log(userWithPosts);

        console.log("\nLoading posts with comments...");
        const postsWithComments = await loader.loadPostsWithComments(1);
        console.log(postsWithComments);

        console.log("\nLoading full dashboard...");
        const dashboard = await loader.loadUserDashboard(1);
        console.log(dashboard);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Uncomment to test:
// runChallenge().catch(console.error);

// Run: bun run curriculum/stage-06-async/01-promises/lesson.ts
