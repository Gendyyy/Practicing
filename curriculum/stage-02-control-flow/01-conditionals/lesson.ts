/**
 * =============================================================================
 * LESSON 01: CONDITIONALS & TYPE NARROWING
 * =============================================================================
 * 
 * Control flow with if/else/switch and how TypeScript narrows types.
 * 
 * Run this file: bun run curriculum/stage-02-control-flow/01-conditionals/lesson.ts
 */

// =============================================================================
// PART 1: BASIC CONDITIONALS
// =============================================================================

const age = 25;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// Ternary operator (shorthand)
const status = age >= 18 ? "adult" : "minor";
console.log("Status:", status);


// =============================================================================
// PART 2: TYPE NARROWING WITH CONDITIONALS
// =============================================================================

// TypeScript gets SMARTER inside if blocks!
function processValue(value: string | number) {
    if (typeof value === "string") {
        // TypeScript knows 'value' is a string here
        console.log(value.toUpperCase());
    } else {
        // TypeScript knows 'value' is a number here
        console.log(value.toFixed(2));
    }
}

processValue("hello");
processValue(42);


// =============================================================================
// PART 3: SWITCH STATEMENTS
// =============================================================================

type Direction = "north" | "south" | "east" | "west";

function getDirectionMessage(dir: Direction): string {
    switch (dir) {
        case "north":
            return "Going up!";
        case "south":
            return "Heading down";
        case "east":
            return "Moving right";
        case "west":
            return "Going left";
        default:
            // TypeScript ensures all cases are handled
            const _exhaustiveCheck: never = dir;
            return _exhaustiveCheck;
    }
}

console.log(getDirectionMessage("north"));


// =============================================================================
// PART 4: TRUTHINESS CHECKS
// =============================================================================

function greetUser(name: string | null | undefined) {
    if (name) {
        // name is truthy (not null, undefined, or empty string)
        console.log(`Hello, ${name}!`);
    } else {
        console.log("Hello, stranger!");
    }
}

greetUser("Alice");
greetUser(null);
greetUser(undefined);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a function that checks if a number is positive, negative, or zero
// function checkNumber(num: number): string { ... }

// TODO 2: Create a function that uses typeof to handle string vs number inputs differently

// TODO 3: Create a switch statement for different user roles ("admin", "user", "guest")


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Grade Calculator
 * 
 * Create a function 'getGrade' that takes a score (number 0-100) and returns:
 * - "A" for 90-100
 * - "B" for 80-89
 * - "C" for 70-79
 * - "D" for 60-69
 * - "F" for 0-59
 * - "Invalid" for anything else
 * 
 * Bonus: Use a switch statement instead of if/else
 */

export function runChallenge() {
    // TODO: Implement getGrade function here
    
    console.log("Challenge incomplete - implement getGrade!");
}

// Run: bun run curriculum/stage-02-control-flow/01-conditionals/lesson.ts
