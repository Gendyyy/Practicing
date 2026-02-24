/**
 * =============================================================================
 * LESSON 03: OBJECTS & INTERFACES
 * =============================================================================
 * 
 * Define the "shape" of objects using Interfaces or Types.
 * Interfaces are preferred for defining objects.
 * 
 * Run this file: bun run curriculum/stage-01-fundamentals/03-objects-and-interfaces/lesson.ts
 */

// =============================================================================
// PART 1: BASIC INTERFACE
// =============================================================================

interface Car {
    brand: string;
    model: string;
    year: number;
    isElectric?: boolean;      // Optional Property (?)
    readonly vin: string;       // Read-only: Cannot be changed after creation
}

const myCar: Car = {
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    isElectric: true,
    vin: "123XYZ"
    // Missing required properties would cause an error!
};

console.log("My car:", myCar);

// myCar.vin = "ABC";  // Error! Read-only property


// =============================================================================
// PART 2: TYPE ALIASES VS INTERFACES
// =============================================================================

// Interface - preferred for objects
interface PointI {
    x: number;
    y: number;
}

// Type alias - also works, more flexible
 type PointT = {
    x: number;
    y: number;
};

// Types can be used for primitives too (Interfaces cannot)
type ID = string | number;
let userId: ID = "user-123";
userId = 456;  // Also valid


// =============================================================================
// PART 3: INTERSECTION TYPES (The "AND" Operator)
// =============================================================================

// Combining multiple types into one
interface Employee {
    id: number;
    name: string;
}

interface Admin {
    role: "admin" | "super-admin";
    permissions: string[];
}

// SuperUser must have ALL properties of Employee AND Admin
type SuperUser = Employee & Admin;

const boss: SuperUser = {
    id: 1,
    name: "Sarah",
    role: "super-admin",
    permissions: ["delete-db", "hire-people"]
};

console.log("Boss:", boss);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create an interface 'Book' with: title (string), author (string), 
// year (number), and optional isbn (string)

// TODO 2: Create a variable 'myBook' of type Book with sample data

// TODO 3: Create a type alias 'UserID' that can be string or number


// =============================================================================
// MINI CHALLENGE
 // =============================================================================

/**
 * Challenge: Product Sale System
 * 
 * 1. Create an interface 'Product' with: name (string), price (number), 
 *    and optional description (string)
 * 2. Create an interface 'Discounted' with: discountPercent (number)
 * 3. Create a type 'SaleItem' that combines both using intersection (&)
 * 4. Create an object of type SaleItem
 */

export function runChallenge() {
    // TODO: Define Product interface
    
    // TODO: Define Discounted interface
    
    // TODO: Create SaleItem type
    
    // TODO: Create a SaleItem object
    
    console.log("Challenge incomplete - implement above!");
}

// Run: bun run curriculum/stage-01-fundamentals/03-objects-and-interfaces/lesson.ts
