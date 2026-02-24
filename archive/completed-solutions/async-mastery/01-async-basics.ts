/**
 * -----------------------------------------------------------------------------
 * ASYNC/AWAIT & PROMISES MASTERY
 * -----------------------------------------------------------------------------
 *
 * In TS/JS, we don't have Threads in the traditional C# sense.
 * We have an "Event Loop" and "Promises" (which are exactly like C# Tasks).
 */

// =============================================================================
// LESSON 1: THE ANATOMY OF A PROMISE
// =============================================================================
// A Promise is an object representing the eventual completion of an async operation.
// It's like a buzzer at a restaurant: you hold it (Pending), and eventually,
// it either flashes (Resolved) or beeps an error (Rejected).

/**
 * Example: A function that simulates fetching data from a database.
 * In C#, this would be: Task<string> FetchData()
 */
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    const success = true;

    // Simulate a 1-second delay
    setTimeout(() => {
      if (success) {
        resolve("Data from Database"); // Success state
      } else {
        reject("Database connection failed"); // Error state
      }
    }, 1000);
  });
}

// =============================================================================
// EXERCISE 1
// =============================================================================
// Create a function `simulateApiCall` that:
// 1. Returns a `Promise<number>`
// 2. Uses `setTimeout` to wait 500ms
// 3. Resolves with the number `42`

// Your code here:

// =============================================================================
// LESSON 2: ASYNC / AWAIT (The Modern Way)
// =============================================================================
// `async` and `await` are syntactic sugar over Promises.
// They make async code look and feel like synchronous (linear) code.
//
// RULES:
// 1. Any function marked `async` AUTOMATICALLY returns a Promise.
// 2. You can only use `await` inside an `async` function.
// 3. `await` pauses execution until the Promise resolves.

async function runExample() {
  console.log("Starting...");

  // Without await, 'data' would just be the Promise object itself
  // With await, 'data' becomes the actual string "Data from Database"
  const data = await fetchData();

  console.log("Result:", data);
}

// =============================================================================
// EXERCISE 2
// =============================================================================
// You have these two functions:
async function getUserId(): Promise<number> {
  return 101;
}

async function getUserEmail(id: number): Promise<string> {
  return `user_${id}@example.com`;
}

// TASK:
// Create an `async` function called `processUser` that:
// 1. Awaits `getUserId()` to get the ID.
// 2. Awaits `getUserEmail(id)` using the ID from step 1.
// 3. Returns the email string.

async function processUser() {
  const id = await getUserId();
  const email = await getUserEmail(id);
  return email;
}

// Your code here:

// =============================================================================
// LESSON 3: ERROR HANDLING (Try/Catch)
// =============================================================================
// Just like C#, we use `try/catch` to handle errors in `async` functions.
// If a Promise is rejected, it throws an exception that `catch` can grab.

async function handleDatabase() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error("Caught an error:", error);
  } finally {
    console.log("Operation finished.");
  }
}

// =============================================================================
// EXERCISE 3
// =============================================================================
// Create a function `safeFetch` that:
// 1. Awaits a function called `unstableNetworkCall()` (provided below).
// 2. Wraps it in a try/catch block.
// 3. If it succeeds, return the data.
// 4. If it fails, return "Default Data".

async function unstableNetworkCall(): Promise<string> {
  if (Math.random() > 0.5) return "Success!";
  throw new Error("Network failed");
}

async function safeFetch(): Promise<string> {
  try {
    const data = await unstableNetworkCall();
    return data;
  } catch (error) {
    return "Default Data";
  }
}

const data = await safeFetch();
console.log(data);

// Your code here:

// =============================================================================
// LESSON 4: PROMISE.ALL (Parallel Execution)
// =============================================================================
// Sometimes you don't want to wait for one thing to finish before starting another.
// In C#, this is `Task.WhenAll`. In TS, it's `Promise.all`.

async function fetchMultiple() {
  const p1 = fetchData(); // Starts immediately
  const p2 = fetchData(); // Starts immediately

  // Wait for BOTH to finish. Returns an array of results.
  const [res1, res2] = await Promise.all([p1, p2]);
  console.log(res1, res2);
}

// =============================================================================
// EXERCISE 4
// =============================================================================
// You need to fetch a user's profile and their posts at the same time.
async function getProfile() {
  return { name: "Alice" };
}
async function getPosts() {
  return ["Post 1", "Post 2"];
}

// TASK:
// Create a function `getUserDashboard` that:
// 1. Starts both `getProfile()` and `getPosts()` simultaneously.
// 2. Awaits both using `Promise.all`.
// 3. Returns an object: { profile: results[0], posts: results[1] }

// Your code here:
async function getUserDashboard(): Promise<{ profile: any; posts: any[] }> {
  const [profile, posts] = await Promise.all([getProfile(), getPosts()]);
  return { profile, posts };
}

const result = await getUserDashboard();
console.log(result);

/**
 * LESSON 5: ADVANCED PROMISE COMBINATORS
 * -----------------------------------------------------------------------------
 *
 * Promise.all is great, but what if you don't care if EVERYTHING succeeds?
 * Or what if you only want the FASTEST response?
 *
 * 1. Promise.allSettled: Waits for all promises to finish, whether they succeed or fail.
 * 2. Promise.race: Returns the result of the FIRST promise to finish (winner takes all).
 */

// Example: allSettled
async function checkServices() {
  const services = [fetchData(), unstableNetworkCall()];
  const results = await Promise.allSettled(services);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Service ${index} success:`, result.value);
    } else {
      console.log(`Service ${index} failed:`, result.reason);
    }
  });
}

// checkServices()

// Example: race (Useful for timeouts)
async function fetchWithTimeout() {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), 2000)
  );

  try {
    const data = await Promise.race([fetchData(), timeout]);
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}
// console.log("Fetching with timeout...");
// fetchWithTimeout();

// =============================================================================
// EXERCISE 5
// =============================================================================
// You have 3 mirrors for the same file. You want to use whichever one responds first.
async function mirror1() {
  return new Promise((res) =>
    setTimeout(() => res("File from Mirror 1"), 5000)
  );
}
async function mirror2() {
  return new Promise((res) =>
    setTimeout(() => res("File from Mirror 2"), 2000)
  );
}
async function mirror3() {
  return new Promise((res) =>
    setTimeout(() => res("File from Mirror 3"), 8000)
  );
}

// TASK:
// Create a function `getFastestFile` that:
// 1. Calls all 3 mirrors.
// 2. Uses `Promise.race` to return the first successful response.

async function getFastestFile() {
  return await Promise.race([mirror1(), mirror2(), mirror3()]);
}

console.log("Fetching the fastest file...");
console.log(await getFastestFile())

// =============================================================================
// EXERCISE 6: EVERYONE REPORTS IN (Promise.allSettled)
// =============================================================================
// You are checking the status of 3 independent services.
// Even if one is down, you want to know the status of the others.

async function checkStock() {
  return "Stock: OK";
}
async function checkPayment() {
  throw new Error("Payment Gateway Timeout");
}
async function checkShipping() {
  return "Shipping: OK";
}

// TASK:
// 1. Create a function `checkSystemHealth` that:
// 2. Calls all 3 checks simultaneously.
// 3. Uses Promise.allSettled.
// 4. Logs which ones were successful and which one failed (with the reason).

// Your code here:

async function checkSystemHealth(): Promise<any[]> {
  return await Promise.allSettled([
    checkStock(),
    checkPayment(),
    checkShipping(),
  ]);
}

console.log("Checking system health...");
const result1 = await checkSystemHealth();
result1.forEach((item) =>{
  if (item.status === "fulfilled") {
    console.log(item.value);
  } else {
    console.log("Status Unknown (Service Down)");
  }
  });
// for (const item of result1) {
//   if (item.status === "fulfilled") {
//     console.log(item.value);
//   } else {
//     console.log("Status Unknown (Service Down)");
//   }
// }
// console.log(await checkSystemHealth());

export {};
