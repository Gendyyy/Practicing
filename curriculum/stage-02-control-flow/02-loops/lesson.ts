/**
 * =============================================================================
 * LESSON 02: LOOPS
 * =============================================================================
 * 
 * Different loop constructs in TypeScript and when to use each.
 * 
 * Run this file: bun run curriculum/stage-02-control-flow/02-loops/lesson.ts
 */

// =============================================================================
// PART 1: FOR LOOP (Index-based)
// =============================================================================

// Standard for loop - when you need the index
console.log("Standard for loop:");
for (let i = 0; i < 5; i++) {
    console.log(`Index: ${i}`);
}


// =============================================================================
// PART 2: FOR...OF LOOP (Values)
// =============================================================================

// Iterates over VALUES in an array (preferred for most cases)
console.log("\nfor...of loop:");
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
    console.log(fruit);
}

// Can also get index with entries()
console.log("\nfor...of with index:");
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}


// =============================================================================
// PART 3: WHILE LOOP
// =============================================================================

// While loop - when condition is checked before each iteration
console.log("\nWhile loop:");
let count = 0;
while (count < 3) {
    console.log(`Count: ${count}`);
    count++;
}


// =============================================================================
// PART 4: DO...WHILE LOOP
// =============================================================================

// Do...while - always executes at least once
console.log("\nDo...while loop:");
let num = 5;
do {
    console.log(`Num: ${num}`);
    num++;
} while (num < 3);  // Condition is false, but loop ran once


// =============================================================================
// PART 5: FOR...IN LOOP (Keys/Indices)
// =============================================================================

// Iterates over KEYS of an object or INDICES of an array
console.log("\nfor...in loop:");
const person = { name: "Alice", age: 30, city: "NYC" };
for (const key in person) {
    console.log(`${key}: ${person[key as keyof typeof person]}`);
}


// =============================================================================
// PART 6: FOR EACH (Array method)
// =============================================================================

// Functional approach - array method
console.log("\n.forEach() method:");
const numbers = [10, 20, 30];
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Use a for loop to print numbers 1 to 10

// TODO 2: Use for...of to sum all numbers in [5, 10, 15, 20]

// TODO 3: Use while loop to count down from 5 to 1


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: FizzBuzz
 * 
 * Print numbers from 1 to 30, but:
 * - For multiples of 3, print "Fizz" instead of the number
 * - For multiples of 5, print "Buzz" instead of the number
 * - For multiples of both 3 and 5, print "FizzBuzz"
 * 
 * Expected output: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, ...
 */

export function runChallenge() {
    // TODO: Implement FizzBuzz here
    
    console.log("Challenge incomplete - implement FizzBuzz!");
}

// Run: bun run curriculum/stage-02-control-flow/02-loops/lesson.ts
