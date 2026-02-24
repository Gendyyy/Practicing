/**
 * -----------------------------------------------------------------------------
 * REAL-WORLD TYPE SYSTEM MASTERY
 * -----------------------------------------------------------------------------
 * 
 * Learn when to use type, interface, and class in real-world scenarios.
 * Each lesson includes examples followed by hands-on exercises.
 */

// =============================================================================
// LESSON 1: WHEN TO USE TYPE FOR DATA SHAPES
// =============================================================================
// Use `type` when you're defining pure data structures - things that hold
// values but have no behavior. Think: API responses, DTOs, configs, state.
//
// WHY types?
// - Work with utility types (Partial, Readonly, Pick, Omit)
// - Support unions (A | B) and intersections (A & B)
// - Perfect for "shape-only" definitions

// Example: API response shape
type User = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
};

// Example: Using utility types
type PartialUser = Partial<User>;
type UserUpdate = Pick<User, 'name' | 'email'>;

// Example: Union type
type Status = 'loading' | 'success' | 'error';

// =============================================================================
// EXERCISE 1
// =============================================================================
// You're building a blog app. The API sends posts with this structure:
// { id: number, title: string, content: string, author: string, published: boolean }
//
// TASKS:
// 1. Create a type called `Post` for this structure
type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    published: boolean;
}

const post1 : Post= {
    id: 1,
    title: "string",
    content: "string",
    author: "string",
    published: true
}

// 2. Create a type called `DraftPost` where only 'title' and 'content' are required
type DraftPost = {
    id?: number;
    title: string;
    content1: string;
    author?: string;
    published?: boolean;
}
// 3. Create a union type `PostStatus` that can be 'draft', 'published', or 'archived'
type PostStatus = "draft" | "published"| "archived"
// Your code here:


// =============================================================================
// LESSON 2: WHEN TO USE INTERFACE FOR CONTRACTS
// =============================================================================
// Use `interface` when you're defining a contract that classes must implement.
// Think: service contracts, plugin interfaces, component props that get extended.
//
// WHY interfaces?
// - Classes can `implement` them
// - Support `extends` for inheritance
// - Better for "is-a" relationships
// - Declaration merging (augmenting existing types)

// Example: Service contract
interface UserRepository {
    findById(id: number): Promise<User | null>;
    save(user: User): Promise<void>;
    delete(id: number): Promise<void>;
}

// Example: Multiple implementations
class DatabaseUserRepository implements UserRepository {
    async findById(id: number): Promise<User | null> {
        return null;
    }
    
    async save(user: User): Promise<void> {
    }
    
    async delete(id: number): Promise<void> {
    }
}

class MockUserRepository implements UserRepository {
    private users: User[] = [];
    
    async findById(id: number): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }
    
    async save(user: User): Promise<void> {
        this.users.push(user);
    }
    
    async delete(id: number): Promise<void> {
        this.users = this.users.filter(u => u.id !== id);
    }
}

// Example: Extending interfaces
interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

// =============================================================================
// EXERCISE 2
// =============================================================================
// You're building a payment system. You need:
// 1. A `PaymentProcessor` interface with methods: `process(amount: number)` and `refund(transactionId: string)`
// 2. A `StripePaymentProcessor` class that implements PaymentProcessor
// 3. A `PayPalPaymentProcessor` class that implements PaymentProcessor
//
// Both processors should log to console when processing/refunding.

// Your code here:


// =============================================================================
// LESSON 3: WHEN TO USE CLASS FOR STATE + BEHAVIOR
// =============================================================================
// Use `class` when you have both state AND behavior that operate on that state.
// Think: domain entities, services, anything with business logic and invariants.
//
// WHY classes?
// - Encapsulation (private/protected fields)
// - Constructors and initialization
// - Methods that maintain invariants
// - Inheritance with method overriding

// Example: Domain entity with business rules
class BankAccount {
    private balance: number;
    private readonly accountNumber: string;
    
    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative");
        }
        this.balance = initialBalance;
    }
    
    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount;
    }
    
    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
    }
    
    getBalance(): number {
        return this.balance;
    }
    
    getAccountNumber(): string {
        return this.accountNumber;
    }
}

// Example: Inheritance
class SavingsAccount extends BankAccount {
    private interestRate: number;
    
    constructor(accountNumber: string, initialBalance: number, interestRate: number) {
        super(accountNumber, initialBalance);
        this.interestRate = interestRate;
    }
    
    applyInterest(): void {
        const interest = this.getBalance() * (this.interestRate / 100);
        this.deposit(interest);
    }
}

// =============================================================================
// EXERCISE 3
// =============================================================================
// Create a `ShoppingCart` class with:
// - Private field: `items` (array of {productId: number, quantity: number, price: number})
// - Method: `addItem(productId, quantity, price)` - adds item or updates quantity
// - Method: `removeItem(productId)` - removes item
// - Method: `getTotal()` - returns total price
// - Method: `getItemCount()` - returns total number of items
// - Business rule: quantity cannot be negative

// Your code here:


// =============================================================================
// LESSON 4: COMBINING INTERFACE + CLASS (DEPENDENCY INJECTION)
// =============================================================================
// Best of both worlds: Interface defines the contract, class provides the
// implementation. This is the foundation of dependency injection.

// Interface defines what we need
interface Logger {
    log(message: string): void;
    error(message: string): void;
}

// Class provides the implementation
class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
    
    error(message: string): void {
        console.error(`[ERROR] ${message}`);
    }
}

class FileLogger implements Logger {
    private filename: string;
    
    constructor(filename: string) {
        this.filename = filename;
    }
    
    log(message: string): void {
        console.log(`[FILE:${this.filename}] ${message}`);
    }
    
    error(message: string): void {
        console.error(`[FILE:${this.filename}] ERROR: ${message}`);
    }
}

// Service depends on the interface, not concrete implementation
class UserService {
    constructor(private logger: Logger) {}
    
    createUser(name: string): void {
        this.logger.log(`Creating user: ${name}`);
    }
}

// =============================================================================
// EXERCISE 4
// =============================================================================
// Create a notification system:
// 1. Interface `NotificationService` with method `send(message: string, recipient: string)`
// 2. Class `EmailNotificationService` that implements it
// 3. Class `SMSNotificationService` that implements it
// 4. Class `NotificationManager` that takes a NotificationService in constructor
//    and has method `notifyAll(message: string, recipients: string[])`

// Your code here:


// =============================================================================
// LESSON 5: TYPE FOR DISCRIMINATED UNIONS
// =============================================================================
// Discriminated unions are a powerful pattern for handling different states.
// Each variant has a common field (discriminator) that identifies which type it is.

type ApiResponse<T> = 
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: { code: number; message: string } };

function handleResponse<T>(response: ApiResponse<T>): void {
    if (response.status === 'loading') {
        console.log('Loading...');
    } else if (response.status === 'success') {
        console.log('Success:', response.data);
    } else {
        console.log('Error:', response.error.message);
    }
}

// =============================================================================
// EXERCISE 5
// =============================================================================
// Create a discriminated union for form validation results:
// - `{ valid: true; value: T }` for valid data
// - `{ valid: false; errors: string[] }` for invalid data
//
// Then create a function `validateEmail(email: string)` that returns this union type.
// It should return valid if email contains '@', otherwise return errors.

// Your code here:


// =============================================================================
// LESSON 6: UTILITY TYPES IN ACTION
// =============================================================================
// TypeScript's built-in utility types transform existing types.
// They ONLY work with `type`, not `interface`.

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
}

// Partial - make all fields optional
type ProductUpdate = Partial<Product>;

// Pick - select specific fields
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

// Omit - remove specific fields
type ProductCreate = Omit<Product, 'id'>;

// Readonly - make all fields readonly
type ReadonlyProduct = Readonly<Product>;

// =============================================================================
// EXERCISE 6
// =============================================================================
// Given this interface:
// interface User {
//     id: number;
//     username: string;
//     email: string;
//     password: string;
//     createdAt: Date;
//     updatedAt: Date;
// }
//
// Create these types using utility types:
// 1. `UserCreate` - all fields except id, createdAt, updatedAt
// 2. `UserProfile` - only username and email (for public display)
// 3. `UserUpdate` - all fields optional (for updates)
// 4. `SafeUser` - same as User but without password field

// Your code here:


// =============================================================================
// CHALLENGE: BUILD A COMPLETE TYPE SYSTEM
// =============================================================================
// Put it all together! Build a task management system with:
//
// 1. A `Task` type (data shape) with: id, title, description, status, priority, dueDate
// 2. A discriminated union `TaskStatus` that can be: 'todo', 'in-progress', 'done', 'blocked'
// 3. A `TaskRepository` interface with CRUD operations
// 4. A `InMemoryTaskRepository` class that implements TaskRepository
// 5. A `TaskService` class that:
//    - Takes a TaskRepository in constructor
//    - Has business logic (e.g., can't mark blocked task as done)
//    - Uses a Logger interface for logging
// 6. Use utility types where appropriate

// Your code here:


export {};
