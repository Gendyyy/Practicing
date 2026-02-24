/**
 * =============================================================================
 * LESSON 04: DISCRIMINATED UNIONS
 * =============================================================================
 * 
 * Discriminated unions use a common "kind" or "type" property to distinguish
 * between different object types. This is a powerful TypeScript pattern!
 * 
 * Run this file: bun run curriculum/stage-03-advanced-types/04-discriminated-unions/lesson.ts
 */

// =============================================================================
// PART 1: BASIC DISCRIMINATED UNION
// =============================================================================

// Each type has a 'kind' property that acts as the discriminator
type Circle = {
    kind: "circle";
    radius: number;
};

type Square = {
    kind: "square";
    side: number;
};

type Triangle = {
    kind: "triangle";
    base: number;
    height: number;
};

// Union of all shapes
type Shape = Circle | Square | Triangle;

// TypeScript narrows based on the 'kind' property!
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            // TypeScript knows shape is Circle here
            return Math.PI * shape.radius ** 2;
        case "square":
            // TypeScript knows shape is Square here
            return shape.side ** 2;
        case "triangle":
            // TypeScript knows shape is Triangle here
            return (shape.base * shape.height) / 2;
        default:
            // Exhaustiveness check - ensures all cases handled
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}

console.log("Circle area:", getArea({ kind: "circle", radius: 5 }));
console.log("Square area:", getArea({ kind: "square", side: 4 }));
console.log("Triangle area:", getArea({ kind: "triangle", base: 6, height: 3 }));


// =============================================================================
// PART 2: REAL-WORLD EXAMPLE - HTTP RESPONSES
// =============================================================================

type SuccessResponse = {
    kind: "success";
    data: unknown;
    timestamp: Date;
};

type ErrorResponse = {
    kind: "error";
    error: string;
    code: number;
};

type LoadingResponse = {
    kind: "loading";
    message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

function handleResponse(response: ApiResponse): string {
    switch (response.kind) {
        case "success":
            return `Success! Data received at ${response.timestamp}`;
        case "error":
            return `Error ${response.code}: ${response.error}`;
        case "loading":
            return `Loading... ${response.message}`;
        default:
            return "Unknown response type";
    }
}

console.log(handleResponse({ kind: "success", data: {}, timestamp: new Date() }));
console.log(handleResponse({ kind: "error", error: "Not found", code: 404 }));


// =============================================================================
// PART 3: PAYMENT METHODS EXAMPLE
// =============================================================================

type CreditCard = {
    kind: "credit";
    cardNumber: string;
    expiryDate: string;
    cvv: string;
};

type PayPal = {
    kind: "paypal";
    email: string;
};

type BankTransfer = {
    kind: "bank";
    accountNumber: string;
    routingNumber: string;
};

type PaymentMethod = CreditCard | PayPal | BankTransfer;

function processPayment(method: PaymentMethod): string {
    switch (method.kind) {
        case "credit":
            return `Processing credit card ending in ${method.cardNumber.slice(-4)}`;
        case "paypal":
            return `Processing PayPal payment for ${method.email}`;
        case "bank":
            return `Processing bank transfer from account ${method.accountNumber}`;
        default:
            const _exhaustive: never = method;
            return _exhaustive;
    }
}


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create discriminated union for different notification types
// (email, sms, push) with different properties

// TODO 2: Create a function that handles each notification type differently

// TODO 3: Create a discriminated union for UI components (button, input, label)


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Task Management System
 * 
 * Create a discriminated union for different task types:
 * 
 * 1. TodoTask: { kind: "todo", title: string, completed: boolean }
 * 2. TimedTask: { kind: "timed", title: string, deadline: Date, duration: number }
 * 3. RecurringTask: { kind: "recurring", title: string, frequency: "daily" | "weekly" | "monthly" }
 * 
 * Create type Task = TodoTask | TimedTask | RecurringTask
 * 
 * Then create functions:
 * - getTaskSummary(task: Task): string - returns different summary for each type
 * - isOverdue(task: Task): boolean - checks if timed task is overdue
 * - getNextOccurrence(task: RecurringTask): Date - calculates next occurrence
 */

export function runChallenge() {
    // TODO: Define TodoTask type
    
    // TODO: Define TimedTask type
    
    // TODO: Define RecurringTask type
    
    // TODO: Create Task union type
    
    // TODO: Implement getTaskSummary
    
    // TODO: Implement isOverdue
    
    // TODO: Implement getNextOccurrence
    
    console.log("Challenge incomplete - implement discriminated unions!");
}

// Run: bun run curriculum/stage-03-advanced-types/04-discriminated-unions/lesson.ts
