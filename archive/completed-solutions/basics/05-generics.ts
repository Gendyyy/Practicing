/**
 * -----------------------------------------------------------------------------
 * 05 - GENERICS & UTILITIES
 * -----------------------------------------------------------------------------
 * 
 * Generics allows code to be reusable for ANY type.
 * Utility types are built-in tools to transform types.
 */

// -----------------------------------------------------------------------------
// PART 1: GENERIC FUNCTIONS
// -----------------------------------------------------------------------------

// T is a placeholder. It becomes whatever type we pass in.
function identity<T>(arg: T): T {
    return arg;
}

const num = identity<number>(42); // T is number
const str = identity<string>("Hi"); // T is string


// -----------------------------------------------------------------------------
// PART 2: GENERIC INTERFACES
// -----------------------------------------------------------------------------

interface Box<T> {
    contents: T;
}

const numBox: Box<number> = { contents: 100 };
const stringBox: Box<string> = { contents: "Secret" };


// -----------------------------------------------------------------------------
// PART 3: UTILITY TYPES (Very Common!)
// -----------------------------------------------------------------------------

interface Todo {
    title: string;
    description: string;
}

// Partial<T>: Makes everything optional
const update: Partial<Todo> = { title: "New Title" };

// Record<K, V>: A clearer way to define maps/dictionaries
const pageInfo: Record<string, number> = {
    "home": 200,
    "about": 404
};

// Omit<T, K>: Remove a key
type TinyTodo = Omit<Todo, "description">;

// Pick<T, K>: Keep only specific keys
type TitleOnly = Pick<Todo, "title">;


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Create a generic class 'Storage<T>' that holds an array of items of type T.
// 2. Add methods: 'add(item: T)' and 'getAll(): T[]'.
// 3. Create an instance for numbers and one for strings.

export function runChallenge() {
    // TODO: Write code here
}
