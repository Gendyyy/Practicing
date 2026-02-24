/**
 * =============================================================================
 * LESSON 01: GENERICS
 * =============================================================================
 * 
 * Generics allow you to write reusable code that works with ANY type.
 * The <T> syntax is like a placeholder that gets filled in later.
 * 
 * Run this file: bun run curriculum/stage-03-advanced-types/01-generics/lesson.ts
 */

// =============================================================================
// PART 1: GENERIC FUNCTIONS
// =============================================================================

// T is a placeholder for ANY type
function identity<T>(arg: T): T {
    return arg;
}

// TypeScript figures out T from the argument
const num = identity(42);        // T is number
const str = identity("hello");   // T is string
const arr = identity([1, 2, 3]); // T is number[]

console.log("Identity of 42:", num);
console.log("Identity of 'hello':", str);

// You can also explicitly specify the type
const explicit = identity<string>("typed");


// =============================================================================
// PART 2: GENERIC INTERFACES
// =============================================================================

// Generic interface for a container
interface Box<T> {
    contents: T;
    label?: string;
}

// Different types of boxes
const numberBox: Box<number> = { contents: 100, label: "Score" };
const stringBox: Box<string> = { contents: "Secret", label: "Message" };
const userBox: Box<{ name: string; age: number }> = { 
    contents: { name: "Alice", age: 30 } 
};

console.log("Number box:", numberBox);
console.log("String box:", stringBox);


// =============================================================================
// PART 3: GENERIC CLASSES
// =============================================================================

class Stack<T> {
    private items: T[] = [];
    
    push(item: T): void {
        this.items.push(item);
    }
    
    pop(): T | undefined {
        return this.items.pop();
    }
    
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
    
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// Number stack
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log("Top of number stack:", numberStack.peek()); // 20

// String stack
const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log("Popped:", stringStack.pop()); // "second"


// =============================================================================
// PART 4: MULTIPLE GENERIC PARAMETERS
// =============================================================================

// You can have multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const mixedPair = pair("age", 25);  // [string, number]
const idPair = pair(123, { name: "Bob" });  // [number, object]

console.log("Mixed pair:", mixedPair);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a generic function 'wrapInArray' that takes a value and returns [value]
// function wrapInArray<T>(value: T): T[] { ... }

// TODO 2: Create a generic interface 'Response<T>' with data (T), success (boolean), and message (string)

// TODO 3: Create a generic function 'swap' that takes a tuple [T, U] and returns [U, T]


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Generic Cache System
 * 
 * Create a generic Cache class that:
 * 1. Stores key-value pairs where both key and value can be any type
 * 2. Has methods: set(key, value), get(key), has(key), clear()
 * 3. Type-safe: if you create Cache<string, number>, keys must be strings and values must be numbers
 * 
 * Test with:
 * - Cache<string, number> for user IDs to ages
 * - Cache<number, string> for product IDs to names
 */

export function runChallenge() {
    // TODO: Implement generic Cache class
    
    // TODO: Test with string keys and number values
    // const userCache = new Cache<string, number>();
    // userCache.set("alice", 30);
    
    // TODO: Test with number keys and string values
    // const productCache = new Cache<number, string>();
    // productCache.set(101, "Laptop");
    
    console.log("Challenge incomplete - implement Cache!");
}

// Run: bun run curriculum/stage-03-advanced-types/01-generics/lesson.ts
