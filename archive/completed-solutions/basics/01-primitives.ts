/**
 * -----------------------------------------------------------------------------
 * 01 - PRIMITIVE TYPES & BASICS
 * -----------------------------------------------------------------------------
 * 
 * TypeScript adds static typing to JavaScript. This means we verify types 
 * BEFORE the code runs (at compile time).
 */

// -----------------------------------------------------------------------------
// PART 1: BASIC TYPES
// -----------------------------------------------------------------------------

// Explicit typing (You tell TS what it is)
let username: string = "Ahmed";
let age: number = 25;
let isDeveloper: boolean = true;

// Type Inference (TS guesses based on value - PREFERRED when obvious)
let framework = "React"; // TS knows this is a string

// Special Types
let nothing: null = null;
let notDefined: undefined = undefined;
let anything: any = "scary"; // Avoid 'any' if possible!
let unknownValue: unknown = "safer"; // Like 'any', but requires checking before use

// -----------------------------------------------------------------------------
// PART 2: ARRAYS & TUPLES
// -----------------------------------------------------------------------------

let scores: number[] = [95, 80, 100];
let heroNames: string[] = ["Batman", "Superman"];

// Tuples: Fixed length and fixed types
// [Latitude, Longitude]
let coordinates: [number, number] = [40.7128, -74.0060];

// [Status, Message]
let responseTuple: [number, string] = [200, "OK"];


// -----------------------------------------------------------------------------
// PART 3: UNION TYPES (The "OR" Operator)
// -----------------------------------------------------------------------------
// A variable that can be one thing OR another.

let id: string | number;
id = 101;    // OK
id = "A-101"; // OK

type Status = "scared" | "happy" | "confused"; // Literal Union
let mood: Status = "happy";


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Create a Tuple type 'UserTuple' that holds: [name (string), age (number), isAdmin (boolean)]
// 2. Create a variable 'myUser' using that type.
// 3. Create a function 'printUser' that takes that tuple and logs a message.

export function runChallenge() {
    // TODO: Define UserTuple type

    // TODO: Create myUser variable

    // TODO: Log it
    console.log("Challenge Incomplete");
}
