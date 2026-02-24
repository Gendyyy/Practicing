/**
 * -----------------------------------------------------------------------------
 * REAL-WORLD TYPE SYSTEM MASTERY
 * -----------------------------------------------------------------------------
 * 
 * This is NOT about syntax. It's about DECISIONS.
 * In real codebases, you constantly choose between:
 * - interface vs type
 * - class vs interface vs type
 * - when to combine them
 * 
 * Each scenario below presents a REAL problem. Your job: decide what to create.
 */

// =============================================================================
// SCENARIO 1: API RESPONSE SHAPE
// =============================================================================
// Problem: You're building a frontend app. The backend sends user data like this:
// { id: 1, name: "Alice", email: "alice@example.com", role: "admin" }
// 
// DECISION: What do you create to represent this?
// Options:
// A) interface User { ... }
// B) type User = { ... }
// C) class User { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
// 
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 2: COMPONENT PROPS
// =============================================================================
// Problem: You're building a React Button component. It accepts:
// - label: string
// - onClick: () => void
// - variant?: 'primary' | 'secondary' | 'danger'
// - disabled?: boolean
//
// DECISION: What do you create for the props?
// Options:
// A) interface ButtonProps { ... }
// B) type ButtonProps = { ... }
// C) class ButtonProps { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 3: DOMAIN ENTITY WITH BEHAVIOR
// =============================================================================
// Problem: You're building a banking system. A BankAccount needs:
// - Properties: balance, owner, accountNumber
// - Methods: deposit(), withdraw(), getBalance()
// - Business rules: Can't withdraw more than balance, can't have negative balance
//
// DECISION: What do you create?
// Options:
// A) interface BankAccount { ... }
// B) type BankAccount = { ... }
// C) class BankAccount { ... }
// D) interface BankAccount { ... } + class RealBankAccount implements BankAccount
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 4: CONFIGURATION OBJECT
// =============================================================================
// Problem: Your app needs configuration that can be partial:
// { apiUrl: string, timeout?: number, retries?: number, debug?: boolean }
// Users should be able to provide just some fields, others have defaults.
//
// DECISION: What do you create?
// Options:
// A) interface Config { ... }
// B) type Config = { ... }
// C) class Config { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 5: SERVICE CONTRACT (DEPENDENCY INJECTION)
// =============================================================================
// Problem: You're using dependency injection. You have:
// - A UserService that needs to save users
// - Multiple implementations: DatabaseUserRepository, ApiUserRepository, MockUserRepository
// - The UserService shouldn't care WHICH implementation it uses
//
// DECISION: What do you create to define the contract?
// Options:
// A) interface UserRepository { ... }
// B) type UserRepository = { ... }
// C) class UserRepository { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 6: UNION TYPE FOR DISCRIMINATED UNIONS
// =============================================================================
// Problem: You're handling different API responses:
// - Success: { status: 'success', data: User }
// - Error: { status: 'error', error: { code: number, message: string } }
// - Loading: { status: 'loading' }
//
// DECISION: What do you create?
// Options:
// A) interface ApiResponse { ... }
// B) type ApiResponse = { ... }
// C) class ApiResponse { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 7: EXTENDING SHAPES
// =============================================================================
// Problem: You have:
// - Base user: { id: number, name: string, email: string }
// - Admin user extends base: { id, name, email, permissions: string[] }
// - Guest user extends base: { id, name, email, temporary: true }
//
// DECISION: What do you create?
// Options:
// A) interface User { ... } + interface Admin extends User { ... }
// B) type User = { ... } + type Admin = User & { ... }
// C) class User { ... } + class Admin extends User { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 8: MAPPED TYPE (UTILITY TYPE)
// =============================================================================
// Problem: You have a type with all required fields:
// { name: string, age: number, email: string }
// You need to create a version where ALL fields are optional:
// { name?: string, age?: number, email?: string }
//
// DECISION: What do you create?
// Options:
// A) interface PartialUser { ... }
// B) type PartialUser = Partial<User>
// C) class PartialUser { ... }
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 9: IMMUTABLE DATA TRANSFER OBJECT
// =============================================================================
// Problem: You're sending data between services. The data should:
// - Never be modified after creation
// - Have a specific shape
// - Be easy to serialize/deserialize
//
// DECISION: What do you create?
// Options:
// A) interface OrderDTO { ... }
// B) type OrderDTO = Readonly<{ ... }>
// C) class OrderDTO { ... } with private setters
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// SCENARIO 10: MIXIN PATTERN (COMPOSING BEHAVIOR)
// =============================================================================
// Problem: You have multiple classes that need:
// - Timestampable: createdAt, updatedAt
// - Identifiable: id, generateId()
// - Serializable: toJSON(), fromJSON()
// Different classes need different combinations of these behaviors.
//
// DECISION: What do you create?
// Options:
// A) interfaces for each, classes implement multiple
// B) type mixins using intersection types
// C) class mixins using factory functions
//
// YOUR ANSWER: ___________
// WHY? _____________________________________________________________
//
// IMPLEMENT YOUR CHOICE:
// TODO: Write the appropriate definition below

// Your code here:


// =============================================================================
// ANSWER KEY & EXPLANATIONS
// =============================================================================
// After completing the scenarios above, compare with these answers:

/*
SCENARIO 1: API RESPONSE SHAPE
ANSWER: type User = { ... }
WHY: API responses are simple data shapes. No behavior, no inheritance needed.
     Types are slightly more flexible for utility types (Partial, Readonly, etc.)
     
SCENARIO 2: COMPONENT PROPS
ANSWER: interface ButtonProps { ... }
WHY: Props are often extended (e.g., interface MyButtonProps extends ButtonProps)
     Interfaces have better IDE support for extending in React ecosystem.
     
SCENARIO 3: DOMAIN ENTITY WITH BEHAVIOR
ANSWER: class BankAccount { ... } (or D: interface + class for DI)
WHY: Encapsulation! Private fields, invariants, methods that operate on state.
     Classes are for things that HAVE behavior and maintain internal state.
     
SCENARIO 4: CONFIGURATION OBJECT
ANSWER: type Config = { ... } (with Partial utility type)
WHY: Configs are often combined with utility types like Partial<Config>.
     Types work better with utility type transformations.
     
SCENARIO 5: SERVICE CONTRACT
ANSWER: interface UserRepository { ... }
WHY: Interfaces define contracts that multiple implementations can fulfill.
     Perfect for dependency injection and polymorphism.
     
SCENARIO 6: UNION TYPE
ANSWER: type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse
WHY: Union types are a type feature! Types handle unions, intersections, conditionals.
     Interfaces can't represent unions directly.
     
SCENARIO 7: EXTENDING SHAPES
ANSWER: interface User { ... } + interface Admin extends User { ... }
WHY: Both work, but interface extends is more declarative and clearer.
     Use extends when you mean "is-a" relationship.
     
SCENARIO 8: MAPPED TYPE
ANSWER: type PartialUser = Partial<User>
WHY: Utility types (Partial, Required, Readonly, Pick, Omit) only work with types.
     This is where types shine over interfaces.
     
SCENARIO 9: IMMUTABLE DTO
ANSWER: type OrderDTO = Readonly<{ ... }>
WHY: DTOs are data shapes. Readonly utility type makes it immutable.
     No need for class overhead if there's no behavior.
     
SCENARIO 10: MIXIN PATTERN
ANSWER: type mixins or class mixins (depends on complexity)
WHY: Mixins compose behavior. For simple composition, type intersections work.
     For complex behavior with initialization, class mixins are better.
*/

// =============================================================================
// QUICK REFERENCE: WHEN TO USE WHAT
// =============================================================================
/*
📦 USE TYPE WHEN:
- Defining simple data shapes (API responses, DTOs, configs)
- Using utility types (Partial, Readonly, Pick, Omit, Record, etc.)
- Creating union types (A | B)
- Creating intersection types (A & B)
- Creating conditional types
- Working with mapped types

🎯 USE INTERFACE WHEN:
- Defining contracts for classes to implement
- Extending other interfaces (is-a relationships)
- Defining component props that get extended often
- Working with libraries that expect interfaces (some DI frameworks)
- You want declaration merging (augmenting existing types)

🏗️ USE CLASS WHEN:
- You have STATE + BEHAVIOR together
- You need encapsulation (private/protected fields)
- You need inheritance with method overriding
- You need constructors and lifecycle management
- Building domain entities, services, or complex objects

🔀 COMBINE THEM WHEN:
- interface for contract, class for implementation (DI pattern)
- type for data shapes, class for business logic (Entity pattern)
- interface for public API, type for internal representations
*/

export {};
