/**
 * =============================================================================
 * LESSON 02: ASYNC/AWAIT
 * =============================================================================
 *
 * Async/await is syntactic sugar over Promises that makes async code
 * look and behave more like synchronous code.
 *
 * Run this file: bun run curriculum/stage-06-async/02-async-await/lesson.ts
 */

// =============================================================================
// PART 1: ASYNC FUNCTION SYNTAX
// =============================================================================

// Adding 'async' makes a function return a Promise
async function greet(): Promise<string> {
    return "Hello!"; // Automatically wrapped in Promise.resolve()
}

// Equivalent to:
function greetEquivalent(): Promise<string> {
    return Promise.resolve("Hello!");
}

// Async functions always return Promises
const result = greet();
console.log("Async function returns:", result); // Promise<string>

result.then(msg => console.log("Greeting:", msg));

// =============================================================================
// PART 2: AWAIT KEYWORD
// =============================================================================

// 'await' pauses execution until the Promise resolves
// Can only use 'await' inside async functions

async function fetchUserName(id: number): Promise<string> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 50));
    const users = ["Alice", "Bob", "Charlie"];
    return users[id] ?? "Unknown";
}

async function displayUser() {
    console.log("Fetching user...");
    const name = await fetchUserName(0); // Pauses here until resolved
    console.log(`User is: ${name}`);
    console.log("Done!");
}

// Must call the async function
displayUser();

// =============================================================================
// PART 3: ERROR HANDLING WITH TRY/CATCH
// =============================================================================

async function riskyOperation(): Promise<string> {
    await new Promise((_, reject) => setTimeout(reject, 50));
    return "Success";
}

async function handleErrors() {
    try {
        const result = await riskyOperation();
        console.log("Result:", result);
    } catch (error) {
        // error is 'unknown' in TypeScript, so we narrow it
        if (error instanceof Error) {
            console.log("Caught error:", error.message);
        } else {
            console.log("Unknown error:", error);
        }
    } finally {
        console.log("Cleanup code always runs");
    }
}

handleErrors();

// Multiple awaits in one try/catch
async function fetchUserData(userId: number) {
    try {
        const user = await fetchUserName(userId);
        const details = await fetchUserDetails(userId);
        return { user, details };
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw error; // Re-throw or return default
    }
}

async function fetchUserDetails(id: number): Promise<{ email: string }> {
    await new Promise(resolve => setTimeout(resolve, 30));
    return { email: `user${id}@example.com` };
}

// =============================================================================
// PART 4: SEQUENTIAL VS PARALLEL EXECUTION
// =============================================================================

async function fetchSlow(id: number): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return `Result ${id}`;
}

// ❌ SEQUENTIAL - slow! (300ms total)
async function sequentialFetch() {
    const start = Date.now();

    const a = await fetchSlow(1); // 100ms
    const b = await fetchSlow(2); // 100ms
    const c = await fetchSlow(3); // 100ms

    console.log(`Sequential took ${Date.now() - start}ms`);
    return [a, b, c];
}

// ✅ PARALLEL - fast! (100ms total)
async function parallelFetch() {
    const start = Date.now();

    // Start all promises immediately
    const promiseA = fetchSlow(1);
    const promiseB = fetchSlow(2);
    const promiseC = fetchSlow(3);

    // Wait for all to complete
    const [a, b, c] = await Promise.all([promiseA, promiseB, promiseC]);

    console.log(`Parallel took ${Date.now() - start}ms`);
    return [a, b, c];
}

// Even better - Promise.all with map
async function fetchMany(ids: number[]) {
    // All fetches start immediately
    const promises = ids.map(id => fetchSlow(id));
    return await Promise.all(promises);
}

// Top-level await (Bun supports this!)
// You can use 'await' at the top level of a module
const topLevelResult = await greet();
console.log("Top-level await result:", topLevelResult);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Convert this Promise chain to async/await:
// fetchUser(1)
//   .then(user => fetchOrders(user.id))
//   .then(orders => console.log(orders))
//   .catch(err => console.error(err));

// TODO 2: Create an async function 'retryFetch' that:
// - Takes a URL and maxAttempts
// - Tries to fetch up to maxAttempts times
// - Waits 1 second between attempts
// - Returns the response or throws after all attempts fail

// TODO 3: Create an async function 'loadDashboard' that:
// - Fetches user, posts, and notifications in PARALLEL
// - Returns an object with all three results
// - Has proper error handling


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Async Task Queue
 *
 * Build a task queue that processes async operations with concurrency control.
 *
 * 1. Create a 'TaskQueue' class with:
 *    - constructor(concurrency: number) - max simultaneous tasks
 *    - add<T>(task: () => Promise<T>): Promise<T> - adds task to queue
 *    - pendingCount: number - getter for pending tasks
 *    - runningCount: number - getter for running tasks
 *
 * 2. The queue should:
 *    - Run up to 'concurrency' tasks simultaneously
 *    - Start new tasks as soon as running count drops
 *    - Maintain order (FIFO) for task results
 *    - Properly propagate errors
 *
 * 3. Test with:
 *    - Create queue with concurrency 2
 *    - Add 5 tasks that take different times
 *    - Verify only 2 run at once
 *    - Verify all complete in correct order
 */

export class TaskQueue {
    private concurrency: number;
    private running = 0;
    private queue: Array<{
        task: () => Promise<any>;
        resolve: (value: any) => void;
        reject: (error: any) => void;
    }> = [];

    constructor(concurrency: number) {
        this.concurrency = concurrency;
    }

    get pendingCount(): number {
        return this.queue.length;
    }

    get runningCount(): number {
        return this.running;
    }

    async add<T>(task: () => Promise<T>): Promise<T> {
        // TODO: Implement task queuing with concurrency control
        return task();
    }

    private processQueue(): void {
        // TODO: Process queued tasks when capacity is available
    }
}

// Helper for testing
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function runChallenge() {
    console.log("Creating task queue with concurrency 2...");
    const queue = new TaskQueue(2);

    const results: string[] = [];

    // Create 5 tasks with different durations
    const tasks = [
        { id: 1, duration: 100 },
        { id: 2, duration: 200 },
        { id: 3, duration: 50 },
        { id: 4, duration: 150 },
        { id: 5, duration: 100 }
    ];

    // Start all tasks (they should be queued)
    const promises = tasks.map(({ id, duration }) =>
        queue.add(async () => {
            const start = Date.now();
            console.log(`Task ${id} started (running: ${queue.runningCount})`);
            await delay(duration);
            const result = `Task ${id} completed in ${Date.now() - start}ms`;
            results.push(result);
            console.log(result);
            return result;
        })
    );

    // Wait for all to complete
    await Promise.all(promises);

    console.log("\nAll tasks complete!");
    console.log("Results:", results);
    console.log("Expected order: Task 1, Task 2, Task 3, Task 4, Task 5");
}

// Uncomment to test:
// runChallenge();

// Run: bun run curriculum/stage-06-async/02-async-await/lesson.ts
