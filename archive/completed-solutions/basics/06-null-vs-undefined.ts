/**
 * -----------------------------------------------------------------------------
 * 06 - NULL VS UNDEFINED
 * -----------------------------------------------------------------------------
 */

// 1. Undefined: "I don't know what this is yet" or "It's missing"
let uninitialized: string | undefined;
console.log("Value:", uninitialized); // undefined

interface Profile {
    username: string;
    bio?: string; // Optional (might be undefined)
}

const p1: Profile = { username: "coder1" };
console.log("Bio:", p1.bio); // undefined


// 2. Null: "I am explicitly saying this is empty"
let emptyValue: string | null = null;
console.log("Value:", emptyValue); // null

// 3. The 'Double Equals' Trick
// In JS/TS, null == undefined is TRUE.
// But null === undefined is FALSE.
// Pro-tip: 'if (val == null)' checks for BOTH null and undefined at once.

function check(val: string | null | undefined) {
    if (val == null) {
        console.log("Value is either null or undefined!");
    }
}

// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Create a function 'findUserById' that:
//    - Returns 'undefined' if the ID is negative (invalid input).
//    - Returns 'null' if the ID is valid but the user isn't found in the "database".
//    - Returns a User object if found.

interface User {
    id: number;
    name: string;
}

const db: User[] = [{ id: 1, name: "Alice" }];

export function findUserById(id: number): User | null | undefined {
    // TODO: Implement logic
    return undefined;
}
