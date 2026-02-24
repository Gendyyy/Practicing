/**
 * =============================================================================
 * LESSON 03: TYPE GUARDS
 * =============================================================================
 * 
 * Type guards are runtime checks that narrow types within conditional blocks.
 * They let TypeScript know exactly what type you're working with.
 * 
 * Run this file: bun run curriculum/stage-03-advanced-types/03-type-guards/lesson.ts
 */

// =============================================================================
// PART 1: TYPEOF GUARD (Primitives)
// =============================================================================

function processInput(input: string | number | boolean) {
    if (typeof input === "string") {
        // TypeScript knows input is a string here
        console.log(input.toUpperCase());
    } else if (typeof input === "number") {
        // TypeScript knows input is a number here
        console.log(input.toFixed(2));
    } else {
        // TypeScript knows input is a boolean here
        console.log(input ? "YES" : "NO");
    }
}

processInput("hello");
processInput(42);
processInput(true);


// =============================================================================
// PART 2: INSTANCEOF GUARD (Classes)
// =============================================================================

class Dog {
    bark() {
        return "Woof!";
    }
}

class Cat {
    meow() {
        return "Meow!";
    }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        // TypeScript knows it's a Dog
        console.log(animal.bark());
    } else {
        // TypeScript knows it's a Cat
        console.log(animal.meow());
    }
}

makeSound(new Dog());
makeSound(new Cat());


// =============================================================================
// PART 3: IN GUARD (Property Check)
// =============================================================================

interface Car {
    drive(): void;
    wheels: number;
}

interface Boat {
    sail(): void;
    draft: number;
}

function operate(vehicle: Car | Boat) {
    if ("drive" in vehicle) {
        // TypeScript knows it has a 'drive' method
        vehicle.drive();
    } else {
        // TypeScript knows it's a Boat
        vehicle.sail();
    }
}


// =============================================================================
// PART 4: CUSTOM TYPE GUARD FUNCTIONS
// =============================================================================

interface User {
    name: string;
    email: string;
}

// Type guard function - returns boolean and has 'is' return type
function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "name" in obj &&
        "email" in obj &&
        typeof (obj as User).name === "string" &&
        typeof (obj as User).email === "string"
    );
}

function greetEntity(entity: unknown) {
    if (isUser(entity)) {
        // TypeScript now knows entity is User
        console.log(`Hello, ${entity.name}!`);
    } else {
        console.log("Not a user");
    }
}

greetEntity({ name: "Alice", email: "alice@test.com" });
greetEntity("just a string");


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a function that uses typeof to handle string vs number differently

// TODO 2: Create two classes and use instanceof to distinguish them

// TODO 3: Create an 'in' type guard for checking if an object has a specific property


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Safe Data Parser
 * 
 * Create a system for safely parsing unknown data:
 * 
 * 1. Define interfaces for:
 *    - Person { name: string, age: number }
 *    - Company { name: string, employees: number }
 * 
 * 2. Create type guard functions:
 *    - isPerson(obj: unknown): obj is Person
 *    - isCompany(obj: unknown): obj is Company
 * 
 * 3. Create a function 'processEntity' that:
 *    - Takes unknown data
 *    - Uses type guards to check if it's Person or Company
 *    - Logs appropriate message for each type
 *    - Logs error if neither type matches
 */

export function runChallenge() {
    // TODO: Define Person interface
    
    // TODO: Define Company interface
    
    // TODO: Create isPerson type guard
    
    // TODO: Create isCompany type guard
    
    // TODO: Implement processEntity function
    
    // Test cases:
    // processEntity({ name: "Alice", age: 30 });  // Should log person message
    // processEntity({ name: "Acme", employees: 100 });  // Should log company message
    // processEntity("invalid");  // Should log error
    
    console.log("Challenge incomplete - implement type guards!");
}

// Run: bun run curriculum/stage-03-advanced-types/03-type-guards/lesson.ts
