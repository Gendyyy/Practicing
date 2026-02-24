/**
 * -----------------------------------------------------------------------------
 * DECORATOR CREATION MASTERY
 * -----------------------------------------------------------------------------
 * 
 * Decorators are a way to add both annotations and a meta-programming syntax 
 * for class declarations and members.
 * 
 * NOTE: Ensure "experimentalDecorators": true is enabled in tsconfig.json.
 */

// =============================================================================
// LESSON 1: CLASS DECORATORS
// =============================================================================
// A Class Decorator is declared just before a class declaration.
// It is applied to the constructor of the class and can be used to observe, 
// modify, or replace a class definition.
//
// Signature: (constructor: Function) => void | constructor
//
// Example: A decorator that freezes a class and its prototype.

function Frozen(constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}

@Frozen
class Ice {
    melt() {
        console.log("Melting...");
    }
}

// Attempting to modify the prototype will fail in strict mode
// (Ice.prototype as any).newMethod = () => {}; // Error!

// =============================================================================
// EXERCISE 1: THE @LOGGABLE DECORATOR
// =============================================================================
// Create a class decorator `@Loggable` that logs the name of the class
// when it is instantiated.
// 
// HINT: You need to return a new constructor that extends the original one.

// Your code here:


// =============================================================================
// LESSON 2: METHOD DECORATORS
// =============================================================================
// A Method Decorator is declared just before a method declaration.
// It can be used to observe, modify, or replace a method definition.
//
// Signature: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void | PropertyDescriptor
//
// Example: A @Log decorator that logs method entry and exit.

function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result of ${propertyKey}:`, result);
        return result;
    };

    return descriptor;
}

class Calculator {
    @Log
    add(a: number, b: number) {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3); // Logs entry, result, and exit

// =============================================================================
// EXERCISE 2: THE @DEPRECATED DECORATOR
// =============================================================================
// Create a method decorator `@Deprecated` that logs a warning message 
// "Warning: [methodName] is deprecated" whenever the method is called.

// Your code here:


// =============================================================================
// LESSON 3: DECORATOR FACTORIES
// =============================================================================
// A Decorator Factory is a function that returns the expression that will 
// be called by the decorator at runtime. This allows you to pass arguments.
//
// Example: A @RoleRequired decorator factory.

function RoleRequired(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const user = (this as any).user;
            if (!user || user.role !== role) {
                throw new Error(`Unauthorized: ${role} role required.`);
            }
            return originalMethod.apply(this, args);
        };
    };
}

class AdminPanel {
    user = { name: "Bob", role: "user" };

    @RoleRequired("admin")
    deleteEverything() {
        console.log("BOOM!");
    }
}

// =============================================================================
// EXERCISE 3: THE @TIMEOUT DECORATOR FACTORY
// =============================================================================
// Create a decorator factory `@Delay(ms: number)` that delays the execution 
// of a method by the specified number of milliseconds using setTimeout.
// Note: The decorated method might need to return a Promise if it's async.

// Your code here:


// =============================================================================
// LESSON 4: PROPERTY DECORATORS
// =============================================================================
// A Property Decorator is declared just before a property declaration.
//
// Signature: (target: any, propertyKey: string) => void
//
// Note: Property decorators can't easily modify the property value directly 
// because they run when the class is defined, not when an instance is created.
// They are often used to record metadata.

function Emoji() {
    return function (target: any, key: string) {
        let val = (target as any)[key];

        const getter = () => val;
        const setter = (next: string) => {
            val = `🍦 ${next} 🍦`;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

class IceCream {
    @Emoji()
    flavor: string = "Vanilla";
}

// =============================================================================
// EXERCISE 4: THE @READONLY PROPERTY DECORATOR
// =============================================================================
// Create a property decorator `@ReadOnly` that makes a property... well, readonly.
// It should prevent the property from being changed after its initial assignment.

// Your code here:


// =============================================================================
// CHALLENGE: THE @VALIDATE DECORATOR
// =============================================================================
// Create a system where you can validate method arguments using decorators.
// 1. Create a parameter decorator `@Required` that marks a parameter as required.
// 2. Create a method decorator `@Validate` that checks if all parameters 
//    marked with `@Required` are present (not null or undefined).
//
// HINT: Use a metadata storage (like a simple object or Map) to keep track 
// of which parameters are required for which method.

// Your code here:


export {};
