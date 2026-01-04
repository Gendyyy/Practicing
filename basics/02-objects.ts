/**
 * -----------------------------------------------------------------------------
 * 02 - OBJECTS & INTERFACES
 * -----------------------------------------------------------------------------
 * 
 * In TS, we define the "shape" of objects using Interfaces or Types.
 * Interfaces are generally preferred for defining objects.
 */

// -----------------------------------------------------------------------------
// PART 1: BASIC INTERFACE
// -----------------------------------------------------------------------------

interface Car {
    brand: string;
    model: string;
    year: number;
    isElectric?: boolean; // Optional Property (?)
    readonly vin: string; // Read-only: Cannot be changed after creation
}

const myCar: Car = {
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    isElectric: true,
    vin: "123XYZ"
    // missing properties would cause an error
};

// myCar.vin = "ABC"; // Error! Read-only.


// -----------------------------------------------------------------------------
// PART 2: TYPE ALIASES VS INTERFACES
// -----------------------------------------------------------------------------
// They are very similar.

// Interface
interface PointI {
    x: number;
    y: number;
}

// Type
type PointT = {
    x: number;
    y: number;
};

// Types can be used for Primitives too (Interfaces cannot)
type ID = string | number;


// -----------------------------------------------------------------------------
// PART 3: INTERSECTION TYPES (The "AND" Operator)
// -----------------------------------------------------------------------------
// Combining multiple types into one.

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


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Create an interface 'Product' with: name, price, and optional 'description'.
// 2. Create an interface 'Discounted' with: discountPercent (number).
// 3. Create a type 'SaleItem' that intersects Product & Discounted.
// 4. Create an object of type SaleItem.

export function runChallenge() {
    // TODO: Write code here
}
