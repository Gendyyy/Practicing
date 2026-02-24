/**
 * =============================================================================
 * LESSON 01: DECORATORS
 * =============================================================================
 *
 * Decorators are special functions that can modify classes, methods, properties,
 * or parameters. They use the @syntax and enable powerful metaprogramming.
 *
 * Run this file: bun run curriculum/stage-07-advanced-patterns/01-decorators/lesson.ts
 */

// =============================================================================
// PART 1: CLASS DECORATORS
// =============================================================================

// A class decorator receives the class constructor
function logged(constructor: Function) {
    console.log(`Class ${constructor.name} was defined`);
}

// Apply with @ syntax
@logged
class Person {
    constructor(public name: string) {}
}

// Decorator factory - returns the actual decorator
function timestamped<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdAt = new Date();
    };
}

@timestamped
class Task {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}

const task = new Task("Learn decorators") as Task & { createdAt: Date };
console.log(`Task "${task.title}" created at:`, task.createdAt);


// =============================================================================
// PART 2: METHOD DECORATORS
// =============================================================================

// Method decorators receive: target, propertyKey, descriptor
function measure(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${(end - start).toFixed(2)}ms`);
        return result;
    };

    return descriptor;
}

// Decorator with parameters (factory)
function throttle(ms: number) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;
        let lastTime = 0;

        descriptor.value = function (...args: any[]) {
            const now = Date.now();
            if (now - lastTime >= ms) {
                lastTime = now;
                return original.apply(this, args);
            }
            console.log(`${propertyKey} throttled`);
        };

        return descriptor;
    };
}

class Calculator {
    @measure
    heavyCalculation(n: number): number {
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += Math.sqrt(i);
        }
        return sum;
    }

    @throttle(100)
    onScroll(): void {
        console.log("Scroll event handled");
    }
}

const calc = new Calculator();
calc.heavyCalculation(1000000);
calc.onScroll();
calc.onScroll(); // Throttled
setTimeout(() => calc.onScroll(), 150); // Allowed


// =============================================================================
// PART 3: PROPERTY DECORATORS
// =============================================================================

// Property decorators receive: target, propertyKey
const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(formatMetadataKey, formatString, target, propertyKey);
    };
}

function getFormat(target: any, propertyKey: string): string {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey) || "{}";
}

// Default value decorator - sets a default if undefined
function defaultValue<T>(defaultVal: T) {
    return function (target: any, propertyKey: string) {
        let value = defaultVal;

        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newVal) => {
                value = newVal === undefined ? defaultVal : newVal;
            },
            enumerable: true,
            configurable: true
        });
    };
}

// Log access decorator - tracks property access
function logAccess(target: any, propertyKey: string) {
    let value = (target as any)[propertyKey];

    Object.defineProperty(target, propertyKey, {
        get: () => {
            console.log(`[GET] ${propertyKey}: ${value}`);
            return value;
        },
        set: (newVal) => {
            console.log(`[SET] ${propertyKey}: ${value} -> ${newVal}`);
            value = newVal;
        },
        enumerable: true,
        configurable: true
    });
}

class Product {
    id: string = crypto.randomUUID();

    @defaultValue("Unknown Product")
    name: string;

    @defaultValue(0)
    price: number;

    @logAccess
    stockCount: number = 100;

    getInfo(): string {
        return `${this.name} - $${this.price}`;
    }
}

const product = new Product();
console.log("Product ID:", product.id);
console.log("Product Info:", product.getInfo());

// Access the logged property
product.stockCount = 50;
console.log("Current stock:", product.stockCount);


// =============================================================================
// PART 4: PARAMETER DECORATORS
// =============================================================================

// Parameter decorators receive: target, propertyKey, parameterIndex
// They're rarely used alone - usually combined with method decorators

// Store validation metadata on the method itself
const validationKey = Symbol("validation");

function required(target: any, propertyKey: string, parameterIndex: number) {
    const existing = target[validationKey] || {};
    const methodValidations = existing[propertyKey] || [];
    methodValidations.push({ index: parameterIndex, type: "required" });
    existing[propertyKey] = methodValidations;
    target[validationKey] = existing;
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const validations = target[validationKey]?.[propertyKey] || [];

    descriptor.value = function (...args: any[]) {
        for (const validation of validations) {
            if (validation.type === "required") {
                if (args[validation.index] === undefined || args[validation.index] === null) {
                    throw new Error(`Missing required argument at index ${validation.index} in ${propertyKey}`);
                }
            }
        }
        return method.apply(this, args);
    };

    return descriptor;
}

class UserService {
    @validate
    createUser(@required name: string, @required email: string, age?: number): any {
        return { id: 1, name, email, age };
    }
}

const userService = new UserService();
try {
    userService.createUser("Alice", "alice@example.com");
    console.log("User created successfully");
} catch (e: any) {
    console.log("Validation error:", e.message);
}

try {
    userService.createUser("Bob", null as any); // Will throw
} catch (e: any) {
    console.log("Validation error (expected):", e.message);
}


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a @cache decorator that caches method results based on arguments.
// The cache key should be a combination of method name and JSON.stringify(args).

// TODO 2: Create a @deprecated decorator that logs a warning when a method is called,
// indicating that the method is deprecated and suggesting an alternative.

// TODO 3: Create a @bound decorator that automatically binds the method to the instance,
// so `this` is always correct even when passed as a callback.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Validation Framework with Decorators
 *
 * Build a validation system using decorators:
 *
 * 1. Create property validators:
 *    - @isString - validates property is a string
 *    - @isNumber - validates property is a number
 *    - @minLength(n) - validates string has minimum length
 *    - @range(min, max) - validates number is within range
 *
 * 2. Create a @validate class decorator that:
 *    - Scans all properties for validation decorators
 *    - Adds a validate() method to the class
 *    - Returns validation errors or null if valid
 *
 * 3. Test with a User class:
 *    - @isString @minLength(2) name: string
 *    - @isNumber @range(0, 150) age: number
 *    - Call validate() and check results
 */

type Validator = (value: any) => string | null;
const validatorsKey = Symbol("validators");

export function isString(target: any, propertyKey: string) {
    // TODO: Register string validator
}

export function isNumber(target: any, propertyKey: string) {
    // TODO: Register number validator
}

export function minLength(min: number) {
    return function (target: any, propertyKey: string) {
        // TODO: Register minLength validator
    };
}

export function range(min: number, max: number) {
    return function (target: any, propertyKey: string) {
        // TODO: Register range validator
    };
}

export function validateClass<T extends { new (...args: any[]): {} }>(constructor: T) {
    // TODO: Add validate() method to the class
    return constructor;
}

@validateClass
export class ValidatedUser {
    name: string = "";
    age: number = 0;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

export function runChallenge() {
    // TODO: Test validation framework
    const user1 = new ValidatedUser("Alice", 30);
    // const errors1 = (user1 as any).validate();
    // console.log("Valid user errors:", errors1); // Should be null

    const user2 = new ValidatedUser("A", 200);
    // const errors2 = (user2 as any).validate();
    // console.log("Invalid user errors:", errors2); // Should show errors

    console.log("Challenge incomplete - implement validation decorators!");
}

// Uncomment to test:
// runChallenge();

// Run: bun run curriculum/stage-07-advanced-patterns/01-decorators/lesson.ts
