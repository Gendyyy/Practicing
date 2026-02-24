/**
 * =============================================================================
 * LESSON 01: MAPS AND SETS
 * =============================================================================
 *
 * Map and Set are ES6 data structures. TypeScript adds type safety with
 * generic types Map<K, V> and Set<T>.
 *
 * Run this file: bun run curriculum/stage-05-data-structures/01-maps-and-sets/lesson.ts
 */

// =============================================================================
// PART 1: MAP BASICS
// =============================================================================

// Map<K, V> - stores key-value pairs with ANY type as key (unlike objects)
const userScores = new Map<string, number>();

// Adding entries with .set()
userScores.set("alice", 100);
userScores.set("bob", 85);
userScores.set("charlie", 92);

// Getting values with .get()
console.log("Alice's score:", userScores.get("alice")); // 100
console.log("Unknown user:", userScores.get("dave"));   // undefined

// Checking existence with .has()
console.log("Has bob?", userScores.has("bob"));   // true
console.log("Has dave?", userScores.has("dave")); // false

// Size property
console.log("Total users:", userScores.size); // 3

// Delete and clear
userScores.delete("bob");
// userScores.clear(); // Would remove all


// =============================================================================
// PART 2: SET BASICS
// =============================================================================

// Set<T> - stores unique values of type T (no duplicates!)
const uniqueTags = new Set<string>();

// Adding values with .add()
uniqueTags.add("typescript");
uniqueTags.add("javascript");
uniqueTags.add("typescript"); // Duplicate - ignored
uniqueTags.add("react");

console.log("Unique tags:", [...uniqueTags]); // ["typescript", "javascript", "react"]
console.log("Count:", uniqueTags.size);       // 3 (not 4!)

// Checking membership
console.log("Has 'react'?", uniqueTags.has("react"));     // true
console.log("Has 'vue'?", uniqueTags.has("vue"));       // false

// Creating from array (removes duplicates)
const numbers = [1, 2, 2, 3, 3, 3, 4];
const uniqueNumbers = new Set(numbers);
console.log("Unique numbers:", [...uniqueNumbers]); // [1, 2, 3, 4]


// =============================================================================
// PART 3: ITERATING MAPS AND SETS
// =============================================================================

const inventory = new Map<string, number>([
    ["apples", 10],
    ["bananas", 5],
    ["oranges", 8]
]);

// Iterate over Map entries
console.log("\n--- Using for...of ---");
for (const [fruit, count] of inventory) {
    console.log(`${fruit}: ${count}`);
}

// Using .forEach()
console.log("\n--- Using .forEach() ---");
inventory.forEach((count, fruit) => {
    console.log(`${fruit}: ${count}`);
});

// Get all keys/values/entries
console.log("\nKeys:", [...inventory.keys()]);
console.log("Values:", [...inventory.values()]);
console.log("Entries:", [...inventory.entries()]);

// Iterating Set
const colors = new Set<string>(["red", "green", "blue"]);
console.log("\n--- Set iteration ---");
for (const color of colors) {
    console.log(color);
}


// =============================================================================
// PART 4: MAP VS OBJECT, WEAKMAP/WEAKSET
// =============================================================================

// Map vs Object - when to use each:

// Use Map when:
// - Keys are unknown until runtime
// - Keys are not strings/symbols
// - You need to maintain insertion order
// - You need easy size tracking
// - Frequent additions/removals

// Use Object when:
// - Keys are known/static (like config)
// - Working with JSON
// - Simple structure with string keys

// Map with non-string keys
const objectKey = { id: 1 };
const mapWithObjectKey = new Map<object, string>();
mapWithObjectKey.set(objectKey, "value for object key");
console.log("\nObject key works:", mapWithObjectKey.get(objectKey));

// WeakMap - keys must be objects, garbage collected when no other refs
const weakCache = new WeakMap<object, any>();
let cacheObj = { data: "important" };
weakCache.set(cacheObj, "cached value");
console.log("WeakMap has key:", weakCache.has(cacheObj)); // true

// If cacheObj is set to null, WeakMap entry can be garbage collected
cacheObj = null as any;
// Entry may be removed by garbage collector (no way to check directly)

// WeakSet - similar to WeakMap but for Sets
const weakSet = new WeakSet<object>();
let weakObj = { id: 1 };
weakSet.add(weakObj);
// When weakObj is no longer referenced, it can be garbage collected


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a function 'countOccurrences' that takes a string array
// and returns a Map<string, number> with word counts.

// TODO 2: Create a function 'findCommonElements' that takes two number arrays
// and returns a Set<number> with elements present in BOTH arrays.

// TODO 3: Create a Map<number, string> to store student IDs and names.
// Add 3 students, then write a function to find a student by partial name match.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Shopping Cart with Map and Set
 *
 * Build a type-safe shopping cart system:
 *
 * 1. Create a 'Product' interface with id, name, price
 * 2. Create a 'ShoppingCart' class using:
 *    - Map<string, { product: Product; quantity: number }> to store items
 *    - Set<string> to track applied discount codes
 * 3. Methods needed:
 *    - addItem(product, quantity)
 *    - removeItem(productId)
 *    - updateQuantity(productId, quantity)
 *    - applyDiscount(code: string) - only if not already applied
 *    - getTotal() - sum of (price * quantity) for all items
 *    - getItemCount() - total number of items (sum of quantities)
 *    - getUniqueItemCount() - number of different products
 * 4. Test by adding products, applying discounts, and calculating totals
 */

interface Product {
    id: string;
    name: string;
    price: number;
}

export class ShoppingCart {
    // TODO: Implement using Map and Set
}

export function runChallenge() {
    // TODO: Create products, test ShoppingCart
    console.log("Challenge incomplete - implement ShoppingCart!");
}

// Run: bun run curriculum/stage-05-data-structures/01-maps-and-sets/lesson.ts
