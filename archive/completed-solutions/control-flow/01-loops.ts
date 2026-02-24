/**
 * -----------------------------------------------------------------------------
 * 01 - LOOPS & CONTROL FLOW
 * -----------------------------------------------------------------------------
 * 
 * Mastering loops is key to handling data efficiency.
 */

// -----------------------------------------------------------------------------
// PART 1: THE CLASSICS
// -----------------------------------------------------------------------------

export function demoClassicLoops() {
    // 1. Standard For Loop (Good for index access)
    for (let i = 0; i < 3; i++) {
        console.log(`Index: ${i}`);
    }

    // 2. While Loop (Good when end condition is unknown)
    let n = 0;
    while (n < 3) {
        console.log(`While: ${n}`);
        n++;
    }
}


// -----------------------------------------------------------------------------
// PART 2: FOR..OF (The Modern Standard)
// -----------------------------------------------------------------------------
// Best for Arrays. It yields VALUES.

const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
    console.log(fruit); // "apple", "banana"...
}


// -----------------------------------------------------------------------------
// PART 3: FOR..IN (The Dictionary Looper)
// -----------------------------------------------------------------------------
// Best for Objects. It yields KEYS.

const user = { name: "Alice", age: 25 };

for (const key in user) {
    // We must type assert if accessing dynamically in strict mode
    console.log(`${key}: ${user[key as keyof typeof user]}`);
}


// -----------------------------------------------------------------------------
// PART 4: ARRAY METHODS (Functional Looping)
// -----------------------------------------------------------------------------

// .forEach() - just run side effects
fruits.forEach((f, idx) => console.log(`${idx}: ${f}`));

// .map() - transform data
const upperFruits = fruits.map(f => f.toUpperCase()); // ["APPLE", ...]


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Given an object 'scores = { math: 90, science: 80, history: 85 }'
// 2. Use a loop to calculate the average score.

export function runChallenge() {
    const scores = { math: 90, science: 80, history: 85 };
    // TODO: Write loop here to sum and average
}
