/**
 * =============================================================================
 * LESSON 03: ABSTRACT CLASSES
 * =============================================================================
 *
 * Abstract classes are blueprints that cannot be instantiated directly.
 * They define a common structure that subclasses must implement.
 *
 * Run this file: bun run curriculum/stage-04-classes-oop/03-abstract-classes/lesson.ts
 */

// =============================================================================
// PART 1: ABSTRACT CLASSES BASICS
// =============================================================================

// 'abstract' keyword prevents direct instantiation
abstract class Shape {
    // Abstract property - must be implemented by subclasses
    abstract readonly name: string;

    constructor(protected color: string) {}

    // Abstract method - no implementation, subclasses MUST override
    abstract calculateArea(): number;

    // Abstract method for perimeter
    abstract calculatePerimeter(): number;

    // Concrete method - shared by all subclasses
    describe(): string {
        return `${this.color} ${this.name} - Area: ${this.calculateArea()}, Perimeter: ${this.calculatePerimeter()}`;
    }
}

// Cannot create instance of abstract class:
// const shape = new Shape("red"); // Error!

// Concrete subclass must implement ALL abstract members
class Rectangle extends Shape {
    readonly name = "Rectangle";

    constructor(
        color: string,
        private width: number,
        private height: number
    ) {
        super(color);
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    readonly name = "Circle";

    constructor(
        color: string,
        private radius: number
    ) {
        super(color);
    }

    calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

const rect = new Rectangle("blue", 10, 5);
const circle = new Circle("red", 7);

console.log(rect.describe());   // blue Rectangle - Area: 50, Perimeter: 30
console.log(circle.describe()); // red Circle - Area: 153.94..., Perimeter: 43.98...


// =============================================================================
// PART 2: MUST IMPLEMENT PATTERN
// =============================================================================

// Abstract classes enforce implementation contracts
abstract class PaymentProcessor {
    constructor(protected merchantId: string) {}

    // All payment processors MUST implement these
    abstract processPayment(amount: number): Promise<string>;
    abstract refundPayment(transactionId: string): Promise<boolean>;

    // Shared utility method
    protected generateTransactionId(): string {
        return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Shared validation
    validateAmount(amount: number): boolean {
        return amount > 0 && amount < 1000000;
    }
}

class StripeProcessor extends PaymentProcessor {
    async processPayment(amount: number): Promise<string> {
        if (!this.validateAmount(amount)) {
            throw new Error("Invalid amount");
        }
        const txnId = this.generateTransactionId();
        console.log(`Processing $${amount} via Stripe...`);
        return txnId;
    }

    async refundPayment(transactionId: string): Promise<boolean> {
        console.log(`Refunding ${transactionId} via Stripe...`);
        return true;
    }
}

class PayPalProcessor extends PaymentProcessor {
    async processPayment(amount: number): Promise<string> {
        if (!this.validateAmount(amount)) {
            throw new Error("Invalid amount");
        }
        const txnId = this.generateTransactionId();
        console.log(`Processing $${amount} via PayPal...`);
        return txnId;
    }

    async refundPayment(transactionId: string): Promise<boolean> {
        console.log(`Refunding ${transactionId} via PayPal...`);
        return true;
    }
}


// =============================================================================
// PART 3: ABSTRACT VS INTERFACE
// =============================================================================

// Interface - pure contract, no implementation
interface Drawable {
    draw(): void;
    x: number;
    y: number;
}

// Abstract class - can have implementation AND required methods
abstract class GameObject implements Drawable {
    constructor(
        public x: number,
        public y: number
    ) {}

    // Must implement from interface
    abstract draw(): void;

    // Abstract update method
    abstract update(deltaTime: number): void;

    // Concrete shared method
    moveTo(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }

    getPosition(): string {
        return `(${this.x}, ${this.y})`;
    }
}

// When to use what:
// - Interface: When you only need to define the shape/contract
// - Abstract Class: When you want to share implementation code

// Example: Interface for simple contracts
interface Serializable {
    serialize(): string;
}

// Example: Abstract class for shared behavior
abstract class Entity implements Serializable {
    constructor(public id: string) {}

    abstract serialize(): string;

    // Shared across all entities
    logAction(action: string): void {
        console.log(`[${this.id}] ${action}`);
    }
}


// =============================================================================
// PART 4: TEMPLATE METHOD PATTERN
// =============================================================================

// Abstract class defining algorithm steps
abstract class DataImporter {
    // Template method - defines the algorithm
    async import(filePath: string): Promise<void> {
        console.log("Starting import process...");

        const rawData = await this.readFile(filePath);
        const parsedData = this.parse(rawData);
        const validatedData = this.validate(parsedData);
        await this.save(validatedData);

        console.log("Import completed!");
    }

    // Abstract steps - subclasses customize these
    abstract readFile(filePath: string): Promise<string>;
    abstract parse(data: string): unknown[];

    // Hook method - can be overridden
    validate(data: unknown[]): unknown[] {
        console.log("Running default validation...");
        return data.filter(item => item !== null);
    }

    abstract save(data: unknown[]): Promise<void>;
}

class CsvImporter extends DataImporter {
    async readFile(filePath: string): Promise<string> {
        return `name,age\nAlice,30\nBob,25`; // Simulated
    }

    parse(data: string): unknown[] {
        const lines = data.split("\n");
        const headers = lines[0].split(",");
        return lines.slice(1).map(line => {
            const values = line.split(",");
            return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
        });
    }

    async save(data: unknown[]): Promise<void> {
        console.log("Saving to database:", data);
    }
}

const csvImporter = new CsvImporter();
// csvImporter.import("data.csv"); // Would work with real file system


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create an abstract 'Animal' class with abstract methods:
//   - makeSound(): string
//   - getSpecies(): string
//   Add a concrete method describe() that uses these.

// TODO 2: Create an abstract 'Database' class with abstract methods:
//   - connect(): Promise<void>
//   - query(sql: string): Promise<unknown[]>
//   - disconnect(): Promise<void>
//   Add a concrete method transaction() that wraps multiple queries.

// TODO 3: Create a 'NotificationService' abstract class with:
//   - abstract send(to: string, message: string): Promise<boolean>
//   - concrete validateAddress(address: string): boolean
//   Extend with EmailNotification and SmsNotification classes.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Plugin System Architecture
 *
 * Create an extensible plugin system:
 * 1. Abstract 'Plugin' class with:
 *    - abstract name: string
 *    - abstract version: string
 *    - abstract initialize(): void
 *    - abstract execute(data: unknown): unknown
 *    - concrete log(message: string): void - prefixes with plugin name
 *
 * 2. Create two concrete plugins:
 *    - 'UppercasePlugin': Converts string data to uppercase
 *    - 'AddTimestampPlugin': Adds timestamp to data object
 *
 * 3. Create a 'PluginManager' that:
 *    - Registers plugins
 *    - Runs all plugins in sequence
 *    - Tracks which plugins are active
 *
 * Test by creating plugins, registering them, and processing data.
 */

export abstract class Plugin {
    // TODO: Implement abstract Plugin class
}

export class UppercasePlugin extends Plugin {
    // TODO: Implement uppercase transformation
}

export class AddTimestampPlugin extends Plugin {
    // TODO: Implement timestamp addition
}

export class PluginManager {
    // TODO: Implement plugin management
}

export function runChallenge() {
    // TODO: Create plugins, register, and test
    console.log("Challenge incomplete - implement Plugin system!");
}

// Run: bun run curriculum/stage-04-classes-oop/03-abstract-classes/lesson.ts
