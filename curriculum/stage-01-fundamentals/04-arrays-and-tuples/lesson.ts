/**
 * =============================================================================
 * LESSON 04: ARRAYS & TUPLES
 * =============================================================================
 * 
 * Deep dive into TypeScript arrays, tuples, and array methods.
 * 
 * Run this file: bun run curriculum/stage-01-fundamentals/04-arrays-and-tuples/lesson.ts
 */

// =============================================================================
// PART 1: TYPED ARRAYS
// =============================================================================

// Standard typed arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Using generic Array syntax
let values: Array<number> = [10, 20, 30];

// Mixed types with union
let mixed: (string | number)[] = ["age", 25, "score", 100];

console.log("Numbers:", numbers);
console.log("Names:", names);


// =============================================================================
// PART 2: READONLY ARRAYS
// =============================================================================

// Arrays that cannot be modified after creation
const readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers.push(4);  // Error! Cannot modify readonly array

// Alternative syntax
const frozenNames: ReadonlyArray<string> = ["A", "B", "C"];


// =============================================================================
// PART 3: ARRAY METHODS (Type-Safe!)
// =============================================================================

const scores: number[] = [85, 92, 78, 95, 88];

// map - transform each element
const doubled = scores.map(n => n * 2);
console.log("Doubled:", doubled);

// filter - keep elements that match condition
const highScores = scores.filter(n => n >= 90);
console.log("High scores (>=90):", highScores);

// find - get first matching element
const firstHighScore = scores.find(n => n >= 90);
console.log("First high score:", firstHighScore);

// reduce - combine all elements
const total = scores.reduce((sum, n) => sum + n, 0);
console.log("Total:", total);


// =============================================================================
// PART 4: ADVANCED TUPLES
// =============================================================================

// Labeled tuples (more readable)
type UserTuple = [name: string, age: number, isActive: boolean];
const user: UserTuple = ["Alice", 30, true];

// Rest elements in tuples
type StringNumberPairs = [string, ...number[]];
const data: StringNumberPairs = ["scores", 95, 87, 92, 88];

// Optional tuple elements
type Address = [street: string, city: string, zip?: string];
const addr1: Address = ["123 Main St", "NYC"];
const addr2: Address = ["456 Oak Ave", "LA", "90210"];


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create an array of 5 numbers and calculate their average

// TODO 2: Create a readonly array of strings and try to push to it (see error)

// TODO 3: Use .filter() to get only even numbers from [1,2,3,4,5,6,7,8,9,10]


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Student Grade Analyzer
 * 
 * Given an array of student objects with name and grades, create functions to:
 * 1. Calculate average grade for each student
 * 2. Find students with average >= 85 ("Honors")
 * 3. Return array of [name, averageGrade] tuples
 */

interface Student {
    name: string;
    grades: number[];
}

const students: Student[] = [
    { name: "Alice", grades: [95, 87, 92] },
    { name: "Bob", grades: [78, 82, 80] },
    { name: "Carol", grades: [88, 91, 85] }
];

export function runChallenge() {
    // TODO: Function to calculate average grade for a student
    
    // TODO: Function to get honor students (avg >= 85)
    
    // TODO: Function to return [name, average] tuples
    
    console.log("Challenge incomplete - implement above!");
}

// Run: bun run curriculum/stage-01-fundamentals/04-arrays-and-tuples/lesson.ts
