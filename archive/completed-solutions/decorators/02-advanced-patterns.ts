import "reflect-metadata";

/**
 * -----------------------------------------------------------------------------
 * ADVANCED DECORATOR PATTERNS
 * -----------------------------------------------------------------------------
 * 
 * Deep dive into Decorator Composition and Metadata Reflection.
 */

// =============================================================================
// LESSON 1: DECORATOR COMPOSITION
// =============================================================================
// When multiple decorators apply to a single declaration, their evaluation 
// is similar to function composition in mathematics.
// (f ∘ g)(x) is equivalent to f(g(x)).
// 
// 1. Evaluated top-to-bottom (factories).
// 2. Called bottom-to-top (results).

function First() {
    console.log("First(): evaluation");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("First(): execution");
    };
}

function Second() {
    console.log("Second(): evaluation");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("Second(): execution");
    };
}

class Example {
    @First()
    @Second()
    method() {}
}

// Expected output:
// First(): evaluation
// Second(): evaluation
// Second(): execution
// First(): execution


// =============================================================================
// LESSON 2: METADATA REFLECTION
// =============================================================================
// The `reflect-metadata` library adds a polyfill for an experimental 
// metadata API. This is powerful for building frameworks (like NestJS or Inversify).
//
// Example: Storing route information on class methods.

const ROUTE_METADATA_KEY = Symbol("route");

interface RouteDefinition {
    path: string;
    method: "get" | "post" | "put" | "delete";
}

function Get(path: string): MethodDecorator {
    return (target, propertyKey) => {
        const route: RouteDefinition = { path, method: "get" };
        Reflect.defineMetadata(ROUTE_METADATA_KEY, route, target, propertyKey);
    };
}

class UserController {
    @Get("/users")
    findAll() {
        return ["Alice", "Bob"];
    }
}

// How to read it:
const controller = new UserController();
const metadata = Reflect.getMetadata(ROUTE_METADATA_KEY, controller, "findAll");
console.log("Route Metadata:", metadata);


// =============================================================================
// CHALLENGE: AUTO-BIND DECORATOR
// =============================================================================
// Create a method decorator `@AutoBind` that automatically binds a method 
// to the instance of the class, so that `this` is always correct even when 
// the method is passed as a callback.
//
// HINT: Use the getter pattern in the property descriptor.

export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}

class Printer {
    message = "Hello World!";

    @AutoBind
    print() {
        console.log(this.message);
    }
}

const p = new Printer();
const printFn = p.print;
printFn(); // Should print "Hello World!" instead of undefined/error

export {};
