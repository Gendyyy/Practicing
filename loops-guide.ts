// ============================================
// TYPESCRIPT LOOPS GUIDE
// ============================================

/**
 * In TypeScript/JavaScript, loops allow you to execute a block of code 
 * multiple times. Here are the most common patterns you'll use.
 */

console.log("🚀 STARTING LOOPS GUIDE\n");

// --------------------------------------------
// 1. THE CLASSIC FOR-LOOP
// --------------------------------------------
// Best for: When you know exactly how many times to run, 
// or when you need the index number (0, 1, 2...).
console.log("1. Classic For-Loop:");
for (let i = 0; i < 5; i++) {
    // 1. Start: let i = 0
    // 2. Condition: i < 5
    // 3. Increment: i++
    console.log(`   Iteration: ${i}`);
}

// --------------------------------------------
// 2. FOR...OF LOOP (Arrays)
// --------------------------------------------
// Best for: Iterating through values in an array. 
// It's clean and readable.
console.log("\n2. For...of (Values):");
const fruits = ["🍎 Apple", "🍌 Banana", "🍒 Cherry"];
for (const fruit of fruits) {
    console.log(`   Enjoying a ${fruit}`);
}

// --------------------------------------------
// 3. FOR...IN LOOP (Objects)
// --------------------------------------------
// Best for: Iterating through keys/properties of an object.
console.log("\n3. For...in (Object Keys):");
const user = { name: "Ahmed", age: 25, role: "Developer" };
for (const key in user) {
    // key is "name", then "age", then "role"
    const value = user[key as keyof typeof user];
    console.log(`   ${key}: ${value}`);
}

// --------------------------------------------
// 4. WHILE LOOP
// --------------------------------------------
// Best for: Running until a condition becomes false. 
// You might not know how many loops you'll need.
console.log("\n4. While Loop:");
let energy = 3;
while (energy > 0) {
    console.log(`   Working... Energy left: ${energy}`);
    energy--; // Don't forget to change the condition, or you'll get an infinite loop!
}

// --------------------------------------------
// 5. ARRAY.FOREACH()
// --------------------------------------------
// Best for: A functional approach to arrays. 
// Very common in modern TypeScript.
console.log("\n5. .forEach():");
const colors = ["Red", "Green", "Blue"];
colors.forEach((color, index) => {
    console.log(`   Color ${index + 1} is ${color}`);
});

// --------------------------------------------
// 6. BREAK AND CONTINUE
// --------------------------------------------
// 'break': Exits the loop immediately.
// 'continue': Skips the current iteration and goes to the next one.
console.log("\n6. Break and Continue:");
for (let i = 1; i <= 5; i++) {
    if (i === 2) continue; // Skip 2
    if (i === 4) break;    // Stop at 4
    console.log(`   Count: ${i}`); // Will print 1, then 3
}

console.log("\n✅ GUIDE COMPLETE. Now you're ready for the exercises!");
