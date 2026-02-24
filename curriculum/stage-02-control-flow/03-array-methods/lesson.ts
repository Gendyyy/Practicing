/**
 * =============================================================================
 * LESSON 03: ARRAY METHODS
 * =============================================================================
 * 
 * Modern, functional array methods with TypeScript.
 * These are preferred over traditional loops in most cases!
 * 
 * Run this file: bun run curriculum/stage-02-control-flow/03-array-methods/lesson.ts
 */

// =============================================================================
// PART 1: MAP - Transform Each Element
// =============================================================================

const numbers = [1, 2, 3, 4, 5];

// Transform each element
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// With index
const withIndex = numbers.map((n, i) => `Index ${i}: ${n}`);
console.log("With index:", withIndex);


// =============================================================================
// PART 2: FILTER - Keep Matching Elements
// =============================================================================

const scores = [85, 92, 78, 95, 88, 73];

// Keep only high scores
const highScores = scores.filter(s => s >= 85);
console.log("High scores (>=85):", highScores);

// Filter objects
interface User {
    name: string;
    age: number;
}
const users: User[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Carol", age: 30 }
];
const adults = users.filter(u => u.age >= 18);
console.log("Adults:", adults);


// =============================================================================
// PART 3: FIND - Get First Match
// =============================================================================

// Returns the first element that matches
const firstHighScore = scores.find(s => s >= 90);
console.log("First score >=90:", firstHighScore);

// Returns undefined if not found
const perfectScore = scores.find(s => s === 100);
console.log("Perfect score:", perfectScore);  // undefined


// =============================================================================
// PART 4: REDUCE - Combine All Elements
// =============================================================================

// Sum all numbers
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// Build an object from array
const userMap = users.reduce((acc, user) => {
    acc[user.name] = user;
    return acc;
}, {} as Record<string, User>);
console.log("User map:", userMap);


// =============================================================================
// PART 5: SOME & EVERY - Boolean Checks
// =============================================================================

// .some() - at least one matches?
const hasHighScore = scores.some(s => s >= 90);
console.log("Has score >=90?", hasHighScore);

// .every() - all match?
const allPassing = scores.every(s => s >= 70);
console.log("All scores >=70?", allPassing);


// =============================================================================
// PART 6: CHAINING METHODS
// =============================================================================

// Chain multiple methods together
const result = users
    .filter(u => u.age >= 18)
    .map(u => u.name.toUpperCase())
    .sort();
console.log("Adult names (uppercase, sorted):", result);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Use .map() to convert ["hello", "world"] to ["HELLO", "WORLD"]

// TODO 2: Use .filter() to get only even numbers from [1,2,3,4,5,6]

// TODO 3: Use .reduce() to find the maximum number in [10, 5, 8, 20, 3]


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Data Processing Pipeline
 * 
 * Given an array of products, create a pipeline that:
 * 1. Filters products with price > 10
 * 2. Calculates 10% discount on remaining products
 * 3. Returns array of { name, originalPrice, discountedPrice }
 * 
 * Use method chaining (.filter().map())
 */

interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Apple", price: 2 },
    { name: "Laptop", price: 999 },
    { name: "Banana", price: 1 },
    { name: "Phone", price: 699 },
    { name: "Coffee", price: 5 }
];

export function runChallenge() {
    // TODO: Implement the data processing pipeline
    // const discountedProducts = products
    //     .filter(...)
    //     .map(...);
    
    console.log("Challenge incomplete - implement pipeline!");
}

// Run: bun run curriculum/stage-02-control-flow/03-array-methods/lesson.ts
