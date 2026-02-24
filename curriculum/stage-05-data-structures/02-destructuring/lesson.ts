/**
 * =============================================================================
 * LESSON 02: DESTRUCTURING
 * =============================================================================
 *
 * Destructuring lets you extract values from arrays and objects into variables
 * with a clean, readable syntax.
 *
 * Run this file: bun run curriculum/stage-05-data-structures/02-destructuring/lesson.ts
 */

// =============================================================================
// PART 1: OBJECT DESTRUCTURING
// =============================================================================

const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    job: "Developer"
};

// Basic destructuring - extract properties by name
const { name, age } = person;
console.log(`${name} is ${age} years old`); // Alice is 30 years old

// Destructuring with different variable names
const { name: fullName, city: location } = person;
console.log(`${fullName} lives in ${location}`); // Alice lives in New York

// Default values (used if property is undefined)
const { country = "USA" } = person;
console.log(`Country: ${country}`); // Country: USA (default used)


// =============================================================================
// PART 2: ARRAY DESTRUCTURING
// =============================================================================

const coordinates = [10, 20, 30];

// Destructure by position
const [x, y, z] = coordinates;
console.log(`x=${x}, y=${y}, z=${z}`); // x=10, y=20, z=30

// Skip elements with commas
const [first, , third] = coordinates;
console.log(`First: ${first}, Third: ${third}`); // First: 10, Third: 30

// Default values
const [a, b, c, d = 0] = coordinates;
console.log(`d=${d}`); // d=0 (default used since coordinates[3] is undefined)

// Swapping variables (no temp variable needed!)
let num1 = 5;
let num2 = 10;
[num1, num2] = [num2, num1];
console.log(`num1=${num1}, num2=${num2}`); // num1=10, num2=5


// =============================================================================
// PART 3: NESTED DESTRUCTURING
// =============================================================================

const user = {
    id: 1,
    profile: {
        firstName: "John",
        lastName: "Doe",
        address: {
            street: "123 Main St",
            zip: "10001"
        }
    },
    hobbies: ["coding", "gaming", "reading"]
};

// Nested object destructuring
const { profile: { firstName, lastName } } = user;
console.log(`${firstName} ${lastName}`); // John Doe

// Deep nesting
const { profile: { address: { street, zip } } } = user;
console.log(`${street}, ${zip}`); // 123 Main St, 10001

// Mixed: nested object + array
const { profile: { firstName: fName }, hobbies: [hobby1, hobby2] } = user;
console.log(`${fName} likes ${hobby1} and ${hobby2}`); // John likes coding and gaming


// =============================================================================
// PART 4: REST OPERATOR IN DESTRUCTURING
// =============================================================================

// Rest in object destructuring (gathers remaining properties)
const product = {
    id: "prod-123",
    name: "Laptop",
    price: 999,
    category: "Electronics",
    inStock: true
};

const { id, name: prodName, ...details } = product;
console.log(`ID: ${id}, Name: ${prodName}`);
console.log("Details:", details); // { price: 999, category: "Electronics", inStock: true }

// Rest in array destructuring
const numbers = [1, 2, 3, 4, 5];
const [firstNum, secondNum, ...restNums] = numbers;
console.log(`First: ${firstNum}, Second: ${secondNum}`); // First: 1, Second: 2
console.log("Rest:", restNums); // [3, 4, 5]

// Function parameter destructuring with defaults
function createUser({ username, email, role = "user" }: {
    username: string;
    email: string;
    role?: string;
}) {
    return {
        username,
        email,
        role,
        createdAt: new Date()
    };
}

const newUser = createUser({ username: "alice", email: "alice@example.com" });
console.log("New user:", newUser);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Given const point = { x: 10, y: 20, z: 30 }, destructure to get
// x and y, and rename z to "depth". Use a default value of 0 if z is missing.

// TODO 2: Given const rgb = [255, 128, 64], destructure into r, g, b variables.
// Then destructure only the red value and gather the rest into "otherColors".

// TODO 3: Create a function 'formatPerson' that takes a person object with
// nested address, and uses destructuring in parameters to return a formatted string.
// Example: formatPerson({ name: "Bob", address: { city: "NYC", state: "NY" } })
// Returns: "Bob lives in NYC, NY"


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: API Response Parser
 *
 * You're working with a user API that returns nested data.
 * Create functions that use destructuring to extract specific information.
 *
 * 1. Write 'getUserSummary' that takes:
 *    { data: { user: { id, name, email }, posts: [{ title, likes }] } }
 *    and returns: "{name} ({email}) wrote {postCount} posts with {totalLikes} total likes"
 *
 * 2. Write 'extractCoordinates' that takes:
 *    { location: { coordinates: { lat, lng }, timezone } }
 *    and returns: { lat, lng, timezone } using destructuring
 *
 * 3. Write 'parseConfig' that takes a config object with many properties
 *    and extracts only the 'apiUrl' and 'timeout', with defaults of
 *    "http://localhost" and 5000 respectively.
 *
 * Test data provided below.
 */

const apiResponse = {
    status: "success",
    data: {
        user: {
            id: 42,
            name: "Sarah Chen",
            email: "sarah@example.com",
            role: "admin"
        },
        posts: [
            { title: "TypeScript Tips", likes: 150 },
            { title: "React Patterns", likes: 230 },
            { title: "CSS Tricks", likes: 89 }
        ],
        meta: { page: 1, total: 3 }
    }
};

const locationData = {
    location: {
        coordinates: { lat: 40.7128, lng: -74.0060 },
        timezone: "America/New_York",
        country: "USA"
    }
};

const appConfig = {
    apiUrl: "https://api.example.com",
    timeout: 10000,
    retries: 3,
    debug: true,
    features: ["auth", "billing", "notifications"]
};

export function getUserSummary(response: typeof apiResponse): string {
    // TODO: Use destructuring to extract and format user summary
    return "Not implemented";
}

export function extractCoordinates(data: typeof locationData): { lat: number; lng: number; timezone: string } {
    // TODO: Use destructuring to extract coordinates and timezone
    return { lat: 0, lng: 0, timezone: "" };
}

export function parseConfig(config: Partial<typeof appConfig>): { apiUrl: string; timeout: number } {
    // TODO: Use destructuring with defaults
    return { apiUrl: "", timeout: 0 };
}

export function runChallenge() {
    console.log("User summary:", getUserSummary(apiResponse));
    console.log("Coordinates:", extractCoordinates(locationData));
    console.log("Config:", parseConfig(appConfig));
    console.log("Config with defaults:", parseConfig({}));
}

// Run: bun run curriculum/stage-05-data-structures/02-destructuring/lesson.ts
