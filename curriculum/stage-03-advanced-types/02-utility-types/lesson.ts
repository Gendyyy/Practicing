/**
 * =============================================================================
 * LESSON 02: UTILITY TYPES
 * =============================================================================
 * 
 * TypeScript provides built-in utility types to transform existing types.
 * These are incredibly useful for creating variations of types!
 * 
 * Run this file: bun run curriculum/stage-03-advanced-types/02-utility-types/lesson.ts
 */

// =============================================================================
// BASE INTERFACE (We'll transform this)
// =============================================================================

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    bio?: string;
    avatar?: string;
}

const fullUser: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30,
    bio: "Software developer",
    avatar: "alice.jpg"
};


// =============================================================================
// PART 1: PARTIAL<T> - Make All Properties Optional
// =============================================================================

// Partial<T> makes every property optional
// Perfect for update functions where you only send changed fields
type UserUpdate = Partial<User>;

const updateData: UserUpdate = {
    name: "Alice Smith"  // Only updating name, rest is optional
};

console.log("Update data:", updateData);


// =============================================================================
// PART 2: REQUIRED<T> - Make All Properties Required
// =============================================================================

// Required<T> removes optionals (all properties become required)
// bio and avatar are now required!
type CompleteUser = Required<User>;

// This would error - missing bio and avatar:
// const incomplete: CompleteUser = { id: 1, name: "Bob", email: "bob@test.com", age: 25 };


// =============================================================================
// PART 3: PICK<T, K> - Select Specific Properties
// =============================================================================

// Pick<T, K> keeps only the keys you specify
type PublicProfile = Pick<User, "name" | "bio" | "avatar">;

const publicView: PublicProfile = {
    name: "Alice",
    bio: "Developer",
    avatar: "alice.jpg"
    // id, email, age are excluded!
};

console.log("Public profile:", publicView);


// =============================================================================
// PART 4: OMIT<T, K> - Remove Specific Properties
// =============================================================================

// Omit<T, K> removes the keys you specify (opposite of Pick)
type UserWithoutEmail = Omit<User, "email">;

const noEmail: UserWithoutEmail = {
    id: 1,
    name: "Bob",
    age: 25
    // email is omitted!
};


// =============================================================================
// PART 5: READONLY<T> - Make Everything Immutable
// =============================================================================

type ImmutableUser = Readonly<User>;

const frozenUser: ImmutableUser = {
    id: 1,
    name: "Charlie",
    email: "charlie@test.com",
    age: 28
};

// frozenUser.name = "Charles";  // Error! Readonly property


// =============================================================================
// PART 6: RECORD<K, T> - Create Dictionary/Map Types
// =============================================================================

// Record<K, T> creates an object type with keys K and values T
type UserDictionary = Record<number, User>;

const users: UserDictionary = {
    1: { id: 1, name: "Alice", email: "alice@test.com", age: 30 },
    2: { id: 2, name: "Bob", email: "bob@test.com", age: 25 }
};

console.log("User 1:", users[1]);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Using Partial, create a type for updating just the email of a User
// type EmailUpdate = ...

// TODO 2: Using Pick, create a type with only id and name
// type UserIdName = ...

// TODO 3: Using Omit, create a type without the id field (for creating new users)
// type NewUser = ...


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: API Response Types
 * 
 * Given a base Product interface, create utility type combinations for:
 * 1. ProductSummary - id, name, price only (use Pick)
 * 2. ProductUpdate - all fields optional (use Partial)
 * 3. ProductCreation - everything except id (use Omit)
 * 4. ProductCatalog - Record<number, Product> for storing by ID
 * 
 * Then create sample data for each type.
 */

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean;
}

export function runChallenge() {
    // TODO: Create ProductSummary type
    
    // TODO: Create ProductUpdate type
    
    // TODO: Create ProductCreation type
    
    // TODO: Create ProductCatalog type and populate with sample data
    
    console.log("Challenge incomplete - implement utility types!");
}

// Run: bun run curriculum/stage-03-advanced-types/02-utility-types/lesson.ts
