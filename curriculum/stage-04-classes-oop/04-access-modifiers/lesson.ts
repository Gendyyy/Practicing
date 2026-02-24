/**
 * =============================================================================
 * LESSON 04: ACCESS MODIFIERS
 * =============================================================================
 *
 * TypeScript provides access modifiers to control visibility of class members.
 * public (default), private, and protected - plus readonly and static.
 *
 * Run this file: bun run curriculum/stage-04-classes-oop/04-access-modifiers/lesson.ts
 */

// =============================================================================
// PART 1: PUBLIC, PRIVATE, PROTECTED
// =============================================================================

class BankAccount {
    // public (default) - accessible everywhere
    public owner: string;

    // private - only accessible within this class
    private balance: number;

    // protected - accessible in this class and subclasses
    protected accountNumber: string;

    constructor(owner: string, initialBalance: number, accountNumber: string) {
        this.owner = owner;
        this.balance = initialBalance;
        this.accountNumber = accountNumber;
    }

    // public method - accessible everywhere
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            this.logTransaction("deposit", amount);
        }
    }

    // public method
    public withdraw(amount: number): boolean {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            this.logTransaction("withdrawal", amount);
            return true;
        }
        return false;
    }

    // public getter for private property
    public getBalance(): number {
        return this.balance;
    }

    // private method - internal use only
    private logTransaction(type: string, amount: number): void {
        console.log(`${type}: $${amount} from ${this.accountNumber}`);
    }
}

const account = new BankAccount("Alice", 1000, "ACC-12345");
account.deposit(500);
console.log(`Balance: $${account.getBalance()}`); // Balance: $1500
// account.balance = 999999; // Error: private
// account.logTransaction(); // Error: private


// =============================================================================
// PART 2: READONLY PROPERTIES
// =============================================================================

class User {
    // readonly can only be set in constructor or at declaration
    readonly id: string;
    readonly createdAt: Date;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.createdAt = new Date();
    }

    // Cannot modify readonly after construction:
    // this.id = "new-id"; // Error!
}

const user = new User("user-001", "Bob");
console.log(`User ${user.name} created at ${user.createdAt}`);
// user.id = "hacked"; // Error: Cannot assign to 'id'

// Readonly with constructor shorthand
class Config {
    constructor(
        public readonly apiKey: string,
        public readonly maxRetries: number,
        public readonly timeoutMs: number = 5000
    ) {}
}

const config = new Config("secret-key-123", 3);
console.log(`Timeout: ${config.timeoutMs}ms`);
// config.apiKey = "new-key"; // Error: readonly


// =============================================================================
// PART 3: GETTERS AND SETTERS
// =============================================================================

class Temperature {
    private _celsius: number = 0;

    // Getter - computed property
    get celsius(): number {
        return this._celsius;
    }

    // Setter - with validation logic
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("Temperature below absolute zero!");
        }
        this._celsius = value;
    }

    // Getter for Fahrenheit (computed from celsius)
    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }

    // Setter for Fahrenheit (converts and stores as celsius)
    set fahrenheit(value: number) {
        this.celsius = (value - 32) * 5/9;
    }

    // Read-only computed property (no setter)
    get kelvin(): number {
        return this._celsius + 273.15;
    }
}

const temp = new Temperature();
temp.celsius = 25;           // Using setter
console.log(temp.fahrenheit); // 77 (computed)
temp.fahrenheit = 100;        // Using setter
console.log(temp.celsius);    // 37.77... (converted)
console.log(temp.kelvin);     // 310.92... (read-only)

// Validation example: Person with controlled age
class Person {
    private _age: number = 0;

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value < 0 || value > 150) {
            throw new Error("Invalid age");
        }
        this._age = value;
    }
}


// =============================================================================
// PART 4: STATIC MEMBERS
// =============================================================================

// Static members belong to the CLASS, not instances
class MathUtils {
    // Static property
    static readonly PI: number = 3.14159;

    // Static method
    static circleArea(radius: number): number {
        return this.PI * radius * radius;
    }

    static circleCircumference(radius: number): number {
        return 2 * this.PI * radius;
    }

    // Static factory method
    static createRandomPoint(): { x: number; y: number } {
        return {
            x: Math.random() * 100,
            y: Math.random() * 100
        };
    }
}

// Use static members directly on the class
console.log(MathUtils.PI);                        // 3.14159
console.log(MathUtils.circleArea(5));            // 78.539...
const point = MathUtils.createRandomPoint();

// Common pattern: Singleton via static
class DatabaseConnection {
    private static instance: DatabaseConnection | null = null;

    private constructor() {
        console.log("Creating new database connection...");
    }

    static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    query(sql: string): unknown[] {
        console.log(`Executing: ${sql}`);
        return [];
    }
}

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true - same instance


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a 'SecureNote' class with:
//   - private content (string)
//   - public readonly createdAt (Date)
//   - getter for content that returns "***" if locked, actual content if unlocked
//   - setter for content that only works when unlocked
//   - lock() and unlock(password: string) methods

// TODO 2: Create a 'Circle' class with:
//   - private _radius
//   - public getter/setter for radius (setter validates > 0)
//   - public readonly getter for diameter
//   - static method createUnitCircle() that returns Circle with radius 1

// TODO 3: Create a 'Counter' class with:
//   - private static totalCounters: number (tracks how many instances created)
//   - public readonly id: number (assign from totalCounters in constructor)
//   - private count
//   - increment(), decrement(), getCount() methods


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Secure Vault System
 *
 * Create a secure vault for storing sensitive data:
 *
 * 1. 'VaultItem' class:
 *    - private encryptedData: string
 *    - public readonly id: string
 *    - public readonly label: string
 *    - constructor takes label and plain text, stores encrypted
 *    - static encrypt(data: string): string - simple Caesar cipher (+1 char code)
 *    - static decrypt(data: string): string - reverse the cipher
 *    - getContent(masterKey: string): string | null - returns decrypted if key matches
 *
 * 2. 'Vault' class (Singleton):
 *    - private items: Map<string, VaultItem>
 *    - private masterKey: string
 *    - static getInstance(): Vault
 *    - addItem(label: string, content: string): string (returns id)
 *    - getItem(id: string, key: string): string | null
 *    - removeItem(id: string, key: string): boolean
 *    - listItems(): { id: string, label: string }[] (no sensitive data)
 *
 * 3. Test by:
 *    - Adding items with different content
 *    - Retrieving with correct/incorrect keys
 *    - Listing items (should not expose content)
 *    - Removing items
 */

export class VaultItem {
    // TODO: Implement VaultItem
}

export class Vault {
    // TODO: Implement Vault singleton
}

export function runChallenge() {
    // TODO: Test the vault system
    console.log("Challenge incomplete - implement Vault system!");
}

// Run: bun run curriculum/stage-04-classes-oop/04-access-modifiers/lesson.ts
