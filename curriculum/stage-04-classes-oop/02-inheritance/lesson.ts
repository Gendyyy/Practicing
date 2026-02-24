/**
 * =============================================================================
 * LESSON 02: INHERITANCE
 * =============================================================================
 *
 * Inheritance lets you create new classes based on existing ones.
 * The child class (subclass) inherits properties and methods from the parent (superclass).
 *
 * Run this file: bun run curriculum/stage-04-classes-oop/02-inheritance/lesson.ts
 */

// =============================================================================
// PART 1: EXTENDS KEYWORD
// =============================================================================

// Parent class (base class)
class Vehicle {
    constructor(
        public brand: string,
        public model: string,
        public year: number
    ) {}

    start(): string {
        return `${this.brand} ${this.model} engine started`;
    }

    stop(): string {
        return `${this.brand} ${this.model} engine stopped`;
    }
}

// Child class inherits from Vehicle using 'extends'
class Car extends Vehicle {
    constructor(
        brand: string,
        model: string,
        year: number,
        public numDoors: number  // Additional property
    ) {
        // super() calls the parent constructor - REQUIRED first
        super(brand, model, year);
    }

    honk(): string {
        return `${this.brand} goes BEEP BEEP!`;
    }
}

const myCar = new Car("Toyota", "Camry", 2023, 4);
console.log(myCar.start());   // From parent: Toyota Camry engine started
console.log(myCar.honk());    // From child: Toyota goes BEEP BEEP!
console.log(myCar.numDoors);  // 4


// =============================================================================
// PART 2: SUPER() CALLS
// =============================================================================

// super() is required in child constructors before using 'this'
class Motorcycle extends Vehicle {
    constructor(
        brand: string,
        model: string,
        year: number,
        public hasSidecar: boolean
    ) {
        // Must call super() first!
        super(brand, model, year);
    }

    // Call parent methods with super.methodName()
    start(): string {
        const parentStart = super.start();
        return `${parentStart} - Vroom vroom!`;
    }

    wheelie(): string {
        return `${this.brand} ${this.model} pops a wheelie!`;
    }
}

const moto = new Motorcycle("Harley", "Sportster", 2022, false);
console.log(moto.start()); // Calls parent's start() + adds custom message


// =============================================================================
// PART 3: METHOD OVERRIDING
// =============================================================================

// Use 'override' keyword (TypeScript 4.3+) when replacing parent methods
class ElectricCar extends Vehicle {
    constructor(
        brand: string,
        model: string,
        year: number,
        public batteryCapacity: number
    ) {
        super(brand, model, year);
    }

    // Override parent method
    override start(): string {
        return `${this.brand} ${this.model} powers up silently 🔋`;
    }

    // Override stop method
    override stop(): string {
        return `${this.brand} ${this.model} powers down`;
    }

    charge(): string {
        return `Charging ${this.brand}... ${this.batteryCapacity}kWh battery`;
    }
}

const tesla = new ElectricCar("Tesla", "Model 3", 2023, 75);
console.log(tesla.start()); // Uses overridden method
console.log(tesla.stop());  // Uses overridden method
console.log(tesla.charge());


// =============================================================================
// PART 4: PROTECTED PROPERTIES
// =============================================================================

// Protected = accessible in class AND its subclasses (not from outside)
class Employee {
    constructor(
        public name: string,
        protected salary: number,  // Subclasses can access this
        private ssn: string        // Only this class can access
    ) {}

    getSalaryInfo(): string {
        return `${this.name} earns $${this.salary}`;
    }
}

class Manager extends Employee {
    constructor(
        name: string,
        salary: number,
        ssn: string,
        public department: string
    ) {
        super(name, salary, ssn);
    }

    getBonus(): number {
        // Can access protected 'salary' from parent
        return this.salary * 0.1;
    }

    getDetails(): string {
        return `${this.name} manages ${this.department}, bonus: $${this.getBonus()}`;
        // Cannot access this.ssn - it's private to Employee
    }
}

const mgr = new Manager("Sarah", 100000, "123-45-6789", "Engineering");
console.log(mgr.getDetails());
console.log(mgr.getSalaryInfo());
// console.log(mgr.salary);  // Error: protected
// console.log(mgr.ssn);     // Error: private


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a 'Shape' parent class with a getArea() method returning 0.
// Create 'Circle' and 'Rectangle' child classes that properly override getArea().

// TODO 2: Create an 'Animal' parent class with name and a makeSound() method.
// Create 'Dog' and 'Cat' classes that extend Animal and override makeSound().

// TODO 3: Create a 'BankAccount' parent class with protected balance.
// Create 'SavingsAccount' that adds interest calculation using the protected balance.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Game Character Hierarchy
 *
 * Create a game character system:
 * 1. Base 'Character' class with: name, health (protected), maxHealth
 *    - Methods: takeDamage(amount), heal(amount), isAlive()
 *
 * 2. 'Warrior' extends Character with: armor (reduces damage by 50%)
 *    - Override takeDamage to apply armor reduction
 *
 * 3. 'Mage' extends Character with: mana
 *    - Method: castSpell(cost) - only if enough mana, returns damage dealt
 *
 * 4. Test by creating instances and simulating a battle
 */

export class Character {
    // TODO: Implement base Character class
}

export class Warrior extends Character {
    // TODO: Implement Warrior with armor
}

export class Mage extends Character {
    // TODO: Implement Mage with mana
}

export function runChallenge() {
    // TODO: Create characters and simulate battle
    console.log("Challenge incomplete - implement Character classes!");
}

// Run: bun run curriculum/stage-04-classes-oop/02-inheritance/lesson.ts
