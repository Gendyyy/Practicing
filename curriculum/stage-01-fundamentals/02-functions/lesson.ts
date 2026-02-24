/**
 * =============================================================================
 * LESSON 02: FUNCTIONS
 * =============================================================================
 * 
 * Typing function arguments and return values is critical for safe code.
 * 
 * Run this file: bun run curriculum/stage-01-fundamentals/02-functions/lesson.ts
 */

// =============================================================================
// PART 1: BASIC FUNCTION SIGNATURES
// =============================================================================

// Explicit typing: (param1: type, param2: type): returnType
function add(a: number, b: number): number {
    return a + b;
}

console.log("5 + 3 =", add(5, 3));

// Arrow functions with return types
const multiply = (a: number, b: number): number => a * b;

console.log("4 * 7 =", multiply(4, 7));

// void return type - function returns nothing
function logMessage(msg: string): void {
    console.log(`LOG: ${msg}`);
}

logMessage("Hello TypeScript!");


// =============================================================================
// PART 2: OPTIONAL & DEFAULT PARAMETERS
// =============================================================================

// Default parameter value
function greet(name: string, title: string = "Guest"): string {
    return `Hello, ${title} ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob", "Dr."));

// Optional parameter (may or may not be provided)
function createProfile(name: string, age?: number): string {
    if (age !== undefined) {
        return `${name} is ${age} years old.`;
    }
    return `${name}'s age is unknown.`;
}

console.log(createProfile("Charlie"));
console.log(createProfile("Diana", 30));


// =============================================================================
// PART 3: OBJECT DESTRUCTURING IN PARAMETERS
// =============================================================================

interface Config {
    url: string;
    method: "GET" | "POST";
}

// Destructure object directly in parameters
function makeRequest({ url, method }: Config): void {
    console.log(`Sending ${method} request to ${url}`);
}

makeRequest({ url: "https://api.example.com", method: "GET" });


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a function 'subtract' that takes 2 numbers and returns their difference
// function subtract(???): ??? {
//     return ???;
// }

// TODO 2: Create a function 'sayHello' with a default name of "World"
// function sayHello(???): ??? {
//     return ???;
// }

// TODO 3: Create a function 'formatUser' that takes name (required) and age (optional)
// and returns a formatted string


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Shopping Cart Calculator
 * 
 * Create a function 'calculateTotal' that:
 * 1. Takes 'price' (number) - required
 * 2. Takes 'taxRate' (number) - default to 0.08 (8%)
 * 3. Takes 'discount' (number) - optional, default to 0
 * 4. Returns the final price after tax and discount
 * 
 * Formula: finalPrice = price + (price * taxRate) - discount
 * 
 * Example: calculateTotal(100) → 108
 * Example: calculateTotal(100, 0.1, 10) → 100
 */

export function runChallenge() {
    // TODO: Implement calculateTotal function here
    
    console.log("Challenge incomplete - implement calculateTotal!");
}

// Run: bun run curriculum/stage-01-fundamentals/02-functions/lesson.ts
