/**
 * =============================================================================
 * LESSON 03: ERROR HANDLING
 * =============================================================================
 *
 * TypeScript provides powerful tools for handling errors in a type-safe way,
 * including custom error classes and the Result pattern.
 *
 * Run this file: bun run curriculum/stage-06-async/03-error-handling/lesson.ts
 */

// =============================================================================
// PART 1: TRY/CATCH WITH TYPESCRIPT
// =============================================================================

// In TypeScript, catch variables are 'unknown' by default (strict mode)
async function riskyOperation(): Promise<string> {
    throw new Error("Something went wrong");
}

async function basicErrorHandling() {
    try {
        await riskyOperation();
    } catch (error) {
        // 'error' is 'unknown', so we need type guards

        // Method 1: instanceof check
        if (error instanceof Error) {
            console.log("Error message:", error.message);
            console.log("Stack trace:", error.stack);
        }

        // Method 2: Type assertion (use carefully!)
        // const err = error as Error;

        // Method 3: Check for specific error type
        if (error instanceof NetworkError) {
            console.log("Network issue, retry might help");
        }
    }
}

// Re-throwing with additional context
async function fetchWithContext(url: string) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        // Wrap with more context
        if (error instanceof Error) {
            throw new Error(`Failed to fetch ${url}: ${error.message}`);
        }
        throw error;
    }
}

// =============================================================================
// PART 2: CUSTOM ERROR CLASSES
// =============================================================================

// Extend Error for domain-specific errors
class AppError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly statusCode: number = 500
    ) {
        super(message);
        this.name = this.constructor.name;

        // Maintains proper stack trace in V8
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class NetworkError extends AppError {
    constructor(message: string = "Network request failed") {
        super(message, "NETWORK_ERROR", 503);
    }
}

class ValidationError extends AppError {
    constructor(
        message: string = "Validation failed",
        public readonly fields: Record<string, string>
    ) {
        super(message, "VALIDATION_ERROR", 400);
    }
}

class NotFoundError extends AppError {
    constructor(resource: string, id: string) {
        super(`${resource} with id '${id}' not found`, "NOT_FOUND", 404);
    }
}

// Using custom errors
function validateUser(data: unknown): { name: string; age: number } {
    const errors: Record<string, string> = {};

    if (!data || typeof data !== "object") {
        throw new ValidationError("Invalid data format", { root: "Expected object" });
    }

    const { name, age } = data as Record<string, unknown>;

    if (!name || typeof name !== "string") {
        errors.name = "Name is required and must be a string";
    }

    if (typeof age !== "number" || age < 0) {
        errors.age = "Age must be a positive number";
    }

    if (Object.keys(errors).length > 0) {
        throw new ValidationError("Validation failed", errors);
    }

    return { name: name as string, age: age as number };
}

// Error type guards
function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}

function handleError(error: unknown): string {
    if (isAppError(error)) {
        return `[${error.code}] ${error.message}`;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Unknown error occurred";
}

// =============================================================================
// PART 3: RESULT TYPES PATTERN
// =============================================================================

// Instead of throwing, return a Result type
// This makes errors part of the type signature

type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

// Helper to create successful results
function ok<T>(data: T): Result<T, never> {
    return { success: true, data };
}

// Helper to create error results
function err<E>(error: E): Result<never, E> {
    return { success: false, error };
}

// Function that returns Result instead of throwing
function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return err("Cannot divide by zero");
    }
    return ok(a / b);
}

// Using Result types
const result1 = divide(10, 2);
if (result1.success) {
    console.log("Result:", result1.data); // 5
} else {
    console.log("Error:", result1.error);
}

const result2 = divide(10, 0);
if (!result2.success) {
    console.log("Division failed:", result2.error); // Cannot divide by zero
}

// Async Result pattern
async function fetchUserSafe(id: number): Promise<Result<{ id: number; name: string }, string>> {
    try {
        // Simulate API call
        if (id < 0) {
            return err("Invalid user ID");
        }
        if (id === 999) {
            return err("User not found");
        }
        return ok({ id, name: `User ${id}` });
    } catch {
        return err("Network error");
    }
}

// Chaining Results
function processUserData(user: { id: number; name: string }): Result<string, string> {
    if (user.name.length < 3) {
        return err("Name too short");
    }
    return ok(user.name.toUpperCase());
}

// =============================================================================
// PART 4: TYPE-SAFE ERROR HANDLING
// =============================================================================

// Combining multiple error types
type UserError =
    | { type: "NOT_FOUND"; userId: number }
    | { type: "VALIDATION_FAILED"; fields: string[] }
    | { type: "UNAUTHORIZED"; reason: string };

function getUser(id: number): Result<{ id: number; name: string }, UserError> {
    if (id === 0) {
        return err({ type: "VALIDATION_FAILED", fields: ["id"] });
    }
    if (id === 999) {
        return err({ type: "NOT_FOUND", userId: id });
    }
    return ok({ id, name: "Alice" });
}

// Exhaustive error handling
function handleUserError(error: UserError): string {
    switch (error.type) {
        case "NOT_FOUND":
            return `User ${error.userId} not found`;
        case "VALIDATION_FAILED":
            return `Invalid fields: ${error.fields.join(", ")}`;
        case "UNAUTHORIZED":
            return `Access denied: ${error.reason}`;
        default:
            // TypeScript ensures all cases are handled
            const _exhaustive: never = error;
            return _exhaustive;
    }
}

// Higher-order function for safe execution
function safe<T, Args extends any[]>(
    fn: (...args: Args) => T
): (...args: Args) => Result<T, string> {
    return (...args) => {
        try {
            return ok(fn(...args));
        } catch (error) {
            if (error instanceof Error) {
                return err(error.message);
            }
            return err(String(error));
        }
    };
}

// Usage
const safeParse = safe(JSON.parse);
const jsonResult = safeParse('{"valid": true}');
const invalidResult = safeParse("not valid json");

console.log("Valid JSON:", jsonResult.success ? jsonResult.data : "parse error");
console.log("Invalid JSON:", invalidResult.success ? "parsed" : invalidResult.error);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a custom error class 'DatabaseError' with properties:
// - table: string, operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE"
// Test by throwing and catching it.

// TODO 2: Write a function 'parseNumberSafe' that returns Result<number, string>.
// It should try to parse a string to number, returning an error if invalid.

// TODO 3: Create an async function 'fetchDataSafe' that returns Result.
// It should handle network errors, timeouts, and parsing errors distinctly.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Type-Safe API Client
 *
 * Build a type-safe API client using the Result pattern.
 *
 * 1. Create ApiError types:
 *    - NetworkError { type: "NETWORK"; message: string }
 *    - HttpError { type: "HTTP"; status: number; message: string }
 *    - ParseError { type: "PARSE"; message: string; raw: string }
 *
 * 2. Create an 'ApiClient' class with:
 *    - baseUrl: string
 *    - request<T>(method, endpoint, body?): Promise<Result<T, ApiError>>
 *
 * 3. The request method should:
 *    - Make the HTTP request
 *    - Handle network failures as NetworkError
 *    - Handle non-2xx status as HttpError
 *    - Handle JSON parse failures as ParseError
 *    - Return typed Result on success
 *
 * 4. Add helper methods:
 *    - get<T>(endpoint): Promise<Result<T, ApiError>>
 *    - post<T>(endpoint, body): Promise<Result<T, ApiError>>
 *
 * 5. Test with mock responses
 */

type ApiError =
    | { type: "NETWORK"; message: string }
    | { type: "HTTP"; status: number; message: string }
    | { type: "PARSE"; message: string; raw: string };

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
    }

    async request<T>(
        method: string,
        endpoint: string,
        body?: unknown
    ): Promise<Result<T, ApiError>> {
        // TODO: Implement type-safe request with proper error handling
        return err({ type: "NETWORK", message: "Not implemented" });
    }

    async get<T>(endpoint: string): Promise<Result<T, ApiError>> {
        return this.request<T>("GET", endpoint);
    }

    async post<T>(endpoint: string, body: unknown): Promise<Result<T, ApiError>> {
        return this.request<T>("POST", endpoint, body);
    }
}

// Mock fetch for testing
let mockResponse: { ok: boolean; status: number; json: () => Promise<any> } | null = null;
let shouldNetworkFail = false;

export function setMockResponse(response: typeof mockResponse) {
    mockResponse = response;
}

export function setNetworkFail(fail: boolean) {
    shouldNetworkFail = fail;
}

// Override global fetch for testing
globalThis.fetch = async (url: string, init?: RequestInit) => {
    if (shouldNetworkFail) {
        throw new Error("Network error");
    }
    if (mockResponse) {
        return mockResponse as Response;
    }
    return new Response(JSON.stringify({ success: true }));
};

export async function runChallenge() {
    const client = new ApiClient("https://api.example.com");

    console.log("Test 1: Successful request");
    setMockResponse({
        ok: true,
        status: 200,
        json: async () => ({ id: 1, name: "Test" })
    });
    const successResult = await client.get("/users/1");
    console.log("Result:", successResult);

    console.log("\nTest 2: HTTP error");
    setMockResponse({
        ok: false,
        status: 404,
        json: async () => ({ error: "Not found" })
    });
    const errorResult = await client.get("/users/999");
    console.log("Result:", errorResult);

    console.log("\nTest 3: Network error");
    setNetworkFail(true);
    const networkResult = await client.get("/users/1");
    console.log("Result:", networkResult);
    setNetworkFail(false);

    console.log("\nTest 4: Parse error");
    setMockResponse({
        ok: true,
        status: 200,
        json: async () => { throw new Error("Invalid JSON"); }
    });
    const parseResult = await client.get("/users/1");
    console.log("Result:", parseResult);
}

// Uncomment to test:
// runChallenge().catch(console.error);

// Run: bun run curriculum/stage-06-async/03-error-handling/lesson.ts
