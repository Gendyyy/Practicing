/**
 * -----------------------------------------------------------------------------
 * 03 - FUNCTIONS
 * -----------------------------------------------------------------------------
 * 
 * Typing function arguments and return values is critical for safe code.
 */

// -----------------------------------------------------------------------------
// PART 1: BASIC SIGNATURES
// -----------------------------------------------------------------------------

// (a: type, b: type): returnType
function add(a: number, b: number): number {
    return a + b;
}

const multiply = (a: number, b: number): number => a * b;

// Void return type (returns nothing)
function logMessage(msg: string): void {
    console.log(msg);
}


// -----------------------------------------------------------------------------
// PART 2: OPTIONAL & DEFAULT PARAMETERS
// -----------------------------------------------------------------------------

// Default Value (title = "Guest")
function greet(name: string, title: string = "Guest"): string {
    return `Hello ${title} ${name}`;
}

// Optional Value (age?)
function createProfile(name: string, age?: number): string {
    if (age) {
        return `${name} is ${age}`;
    }
    return `${name} is ageless`;
}


// -----------------------------------------------------------------------------
// PART 3: OBJECT DESTRUCTURING IN PARAMS
// -----------------------------------------------------------------------------

interface Config {
    url: string;
    method: "GET" | "POST";
}

// We explode the object in the arguments
function request({ url, method }: Config) {
    console.log(`Sending ${method} to ${url}`);
}


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Write a function 'calculateTotal' that takes:
//    - price (number)
//    - taxRate (number, default = 0.05)
//    - discount (number, optional)
// 2. Return the final price.

export function runChallenge() {
    // TODO: Write function here
}
