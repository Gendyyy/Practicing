/**
 * =============================================================================
 * LESSON 01: TYPES & VARIABLES
 * =============================================================================
 * 
 * Welcome to TypeScript! TS adds static typing to JavaScript, catching errors
 * BEFORE your code runs (at compile time).
 * 
 * Run this file: bun run curriculum/stage-01-fundamentals/01-types-and-variables/lesson.ts
 */

// =============================================================================
// PART 1: BASIC TYPES (Explicit Typing)
// =============================================================================

// You tell TypeScript what type a variable should be
let username: string = "Ahmed";
let age: number = 25;
let isDeveloper: boolean = true;

console.log("User:", username, "Age:", age, "Developer:", isDeveloper);


// =============================================================================
// PART 2: TYPE INFERENCE (Preferred)
// =============================================================================

// TypeScript can GUESS the type from the value (PREFERRED when obvious)
let framework = "React";  // TS knows this is a string
let score = 100;          // TS knows this is a number

// Try changing 'framework' to a number below - you'll get an error!
// framework = 42;  // Uncomment to see the error


// =============================================================================
// PART 3: SPECIAL TYPES
// =============================================================================

// null - explicitly nothing
let nothing: null = null;

// undefined - not yet assigned
let notDefined: undefined = undefined;

// any - turns off type checking (AVOID this!)
let anything: any = "scary";
anything = 42;  // No error, but defeats the purpose of TypeScript!

// unknown - safer alternative to 'any', requires checking before use
let unknownValue: unknown = "safer";
// unknownValue.toUpperCase();  // Error! Must check type first
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase());  // Now OK
}


// =============================================================================
// PART 4: ARRAYS
// =============================================================================

// Array of numbers
let scores: number[] = [95, 80, 100];

// Array of strings
let heroes: string[] = ["Batman", "Superman"];

// Array using generic syntax (same as above)
let fruits: Array<string> = ["apple", "banana"];

console.log("Scores:", scores);
console.log("Heroes:", heroes);


// =============================================================================
// PART 5: TUPLES (Fixed Length & Types)
// =============================================================================

// Tuples have a fixed number of elements with specific types
// [Latitude, Longitude]
let coordinates: [number, number] = [40.7128, -74.0060];

// [HTTP Status Code, Message]
let response: [number, string] = [200, "OK"];

console.log("Coordinates:", coordinates);
console.log("Response:", response);


// =============================================================================
// PART 6: UNION TYPES (OR Operator)
// =============================================================================

// A variable that can be one type OR another
let id: string | number;
id = 101;      // OK - it's a number
id = "A-101";  // OK - it's a string

// Literal unions - specific values only
type Mood = "happy" | "sad" | "neutral";
let myMood: Mood = "happy";
// myMood = "angry";  // Error! Must be one of the three

console.log("Current mood:", myMood);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a variable 'pi' with type number and value 3.14159
// let pi: FILL_IN = FILL_IN;

// TODO 2: Create an array 'colors' that holds strings
// let colors: FILL_IN = ["red", "green", "blue"];

// TODO 3: Create a tuple 'rgb' for [red, green, blue] values
// let rgb: FILL_IN = [255, 128, 0];


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Create a User Profile System
 * 
 * 1. Create a type 'UserTuple' that holds: [name (string), age (number), isAdmin (boolean)]
 * 2. Create a variable 'myUser' using that tuple type with sample data
 * 3. Create a function 'printUser' that takes that tuple and logs:
 *    "[name] is [age] years old. Admin: [isAdmin]"
 */

// TODO: Define your UserTuple type here
// type UserTuple = 

export function runChallenge() {
    // TODO: Create your user tuple
    // const myUser: UserTuple = 
    
    // TODO: Call printUser
    console.log("Challenge incomplete - implement above!");
}

// Run: bun run curriculum/stage-01-fundamentals/01-types-and-variables/lesson.ts
