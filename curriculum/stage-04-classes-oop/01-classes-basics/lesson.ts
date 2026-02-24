/**
 * =============================================================================
 * LESSON 01: CLASSES BASICS
 * =============================================================================
 *
 * Classes are blueprints for creating objects with properties and methods.
 * TypeScript adds type annotations and access modifiers to JavaScript classes.
 *
 * Run this file: bun run curriculum/stage-04-classes-oop/01-classes-basics/lesson.ts
 */

// =============================================================================
// PART 1: CLASS SYNTAX & INSTANCES
// =============================================================================

// A class is a template for creating objects
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
    }
}

// Creating instances (objects) from the class
const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

console.log(alice.greet()); // Hello, I'm Alice and I'm 30 years old
console.log(bob.greet());   // Hello, I'm Bob and I'm 25 years old


// =============================================================================
// PART 2: CONSTRUCTOR SHORTHAND
// =============================================================================

// TypeScript shorthand: prefix parameters with access modifier
// This automatically creates properties and assigns values
class Animal {
    constructor(
        public name: string,
        public species: string,
        private age: number
    ) {}

    describe(): string {
        return `${this.name} is a ${this.species}`;
    }

    getAge(): number {
        return this.age;
    }
}

const dog = new Animal("Buddy", "Golden Retriever", 5);
console.log(dog.describe()); // Buddy is a Golden Retriever
console.log(dog.name);       // Buddy (public - accessible)
// console.log(dog.age);     // Error: age is private


// =============================================================================
// PART 3: THE 'THIS' KEYWORD
// =============================================================================

// 'this' refers to the current instance of the class
class Counter {
    count: number = 0;

    increment(): void {
        this.count++; // 'this' refers to the Counter instance
    }

    decrement(): void {
        this.count--;
    }

    getCount(): number {
        return this.count;
    }

    reset(): void {
        this.count = 0;
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
console.log("Count after 2 increments:", counter.getCount()); // 2
counter.decrement();
console.log("Count after 1 decrement:", counter.getCount());  // 1


// =============================================================================
// PART 4: DEFAULT VALUES & OPTIONAL PROPERTIES
// =============================================================================

class Product {
    // Default values in the property declaration
    inStock: boolean = true;
    quantity: number = 0;

    constructor(
        public name: string,
        public price: number,
        public category?: string  // Optional parameter
    ) {}

    getInfo(): string {
        const categoryInfo = this.category ? ` [${this.category}]` : "";
        return `${this.name}${categoryInfo} - $${this.price} (${this.inStock ? "In Stock" : "Out of Stock"})`;
    }
}

const laptop = new Product("Laptop", 999, "Electronics");
const mug = new Product("Coffee Mug", 12); // No category

console.log(laptop.getInfo()); // Laptop [Electronics] - $999 (In Stock)
console.log(mug.getInfo());    // Coffee Mug - $12 (In Stock)


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a 'Car' class with make, model, and year properties.
// Add a method 'getAge()' that returns how many years old the car is.

// TODO 2: Create a 'BankAccount' class using constructor shorthand with
// public owner and private balance. Add methods to deposit and withdraw.

// TODO 3: Create a 'Rectangle' class with width and height (both with default 0).
// Add methods: getArea(), getPerimeter(), and isSquare().


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Todo List Manager
 *
 * Create a TodoList class that manages tasks:
 * 1. Each task has: id (number), title (string), completed (boolean, default false)
 * 2. Methods: addTask(title), completeTask(id), removeTask(id), getAllTasks()
 * 3. Auto-increment task IDs starting from 1
 *
 * Test by:
 * - Adding 3 tasks
 * - Completing task #2
 * - Removing task #1
 * - Printing remaining tasks
 */

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export class TodoList {
    // TODO: Implement the TodoList class
}

export function runChallenge() {
    // TODO: Create a TodoList instance and test all methods
    console.log("Challenge incomplete - implement TodoList!");
}

// Run: bun run curriculum/stage-04-classes-oop/01-classes-basics/lesson.ts
