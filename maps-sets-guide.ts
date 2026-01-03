/**
 * 🗺️ Maps and 🎨 Sets in TypeScript
 * 
 * Maps and Sets are powerful built-in data structures in JavaScript/TypeScript.
 * They offer unique capabilities compared to plain Objects and Arrays.
 */

// ============================================================================
// 🗺️ MAPS (Hash Maps)
// ============================================================================
/**
 * A Map is a collection of keyed data items, similar to an Object.
 * But the main difference is that Map allows keys of ANY type (objects, functions, primitives).
 */

console.log("--- 🗺️ MAPS DEMO ---");

// 1. Creation
// You can create an empty map or initialize it with an array of [key, value] pairs.
const userMap = new Map<number, string>();

// 2. Adding / Updating values (.set)
userMap.set(1, "Alice");
userMap.set(2, "Bob");
userMap.set(3, "Charlie");

// 3. Retrieving values (.get)
console.log("User 1:", userMap.get(1)); // Alice
console.log("User 5:", userMap.get(5)); // undefined (doesn't exist)

// 4. Checking existence (.has)
console.log("Has user 2?", userMap.has(2)); // true
console.log("Has user 4?", userMap.has(4)); // false

// 5. Getting the size (.size)
console.log("Map size:", userMap.size); // 3

// 6. Deleting values (.delete)
userMap.delete(2);
console.log("Size after deleting Bob:", userMap.size); // 2

// 7. Map Keys can be anything!
const objKey = { id: 100 };
const complexMap = new Map<any, any>();
complexMap.set(objKey, "Stored using an object as a key!");
complexMap.set(true, "Stored using a boolean!");
console.log("Object key lookup:", complexMap.get(objKey));

// 8. Iterating over Maps
console.log("\nIterating over userMap:");
for (const [id, name] of userMap) {
    console.log(`ID: ${id}, Name: ${name}`);
}

// Or using .forEach
userMap.forEach((name, id) => {
    console.log(`Foreach - ${id}: ${name}`);
});


// ============================================================================
// 🎨 SETS
// ============================================================================
/**
 * A Set is a special type collection – “set of values” (without keys), 
 * where each value may occur only ONCE.
 */

console.log("\n--- 🎨 SETS DEMO ---");

// 1. Creation
const tags = new Set<string>(["typescript", "javascript", "coding"]);

// 2. Adding values (.add)
tags.add("web");
tags.add("typescript"); // This will be ignored because it already exists!

// 3. Checking existence (.has)
console.log("Has 'web'?", tags.has("web")); // true
console.log("Has 'python'?", tags.has("python")); // false

// 4. Size property
console.log("Number of unique tags:", tags.size); // 4

// 5. Deleting values (.delete)
tags.delete("coding");

// 6. Iterating over Sets
console.log("\nIterating over tags:");
for (const tag of tags) {
    console.log("-", tag);
}

// 7. Converting between Array and Set (Very common trick!)
const demoNumbers = [1, 2, 2, 3, 4, 4, 4, 5];
const uniqueNumbersSet = new Set(demoNumbers);
const uniqueNumbersArray = Array.from(uniqueNumbersSet); // or [...uniqueNumbersSet]

console.log("\nOriginal array:", demoNumbers);
console.log("Unique array:", uniqueNumbersArray);


// ============================================================================
// 🚀 SUMMARY: WHEN TO USE WHICH?
// ============================================================================
/**
 * 1. POJO (Plain Old JavaScript Objects): 
 *    - Use when you have a small, fixed set of keys (like a config or a record).
 *    - Best for JSON serialization.
 * 
 * 2. MAP:
 *    - Use when keys are unknown until runtime.
 *    - Use when keys are not strings (e.g. objects, numbers).
 *    - Better performance for frequent additions/removals.
 * 
 * 3. SET:
 *    - Use when you need a collection of UNIQUE items.
 *    - Much faster than Array.includes() for large collections.
 */

console.log("\n--- 🏁 DEMO COMPLETE ---");
