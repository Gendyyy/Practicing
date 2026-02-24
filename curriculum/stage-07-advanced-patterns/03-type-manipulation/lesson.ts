/**
 * =============================================================================
 * LESSON 03: TYPE MANIPULATION
 * =============================================================================
 *
 * TypeScript provides powerful tools for creating new types from existing ones.
 * This includes conditional types, mapped types, and template literal types.
 *
 * Run this file: bun run curriculum/stage-07-advanced-patterns/03-type-manipulation/lesson.ts
 */

// =============================================================================
// PART 1: CONDITIONAL TYPES
// =============================================================================

// Conditional types: T extends U ? X : Y
// Like a ternary operator for types

type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Distributive conditional types
// When T is a union, the conditional distributes over each member
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>;
// Result: string[] | number[] (not (string | number)[])

// Non-distributive (wrap in tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type CombinedArray = ToArrayNonDist<string | number>;
// Result: (string | number)[]

// Practical: Extract types by condition
type ExtractByType<T, U> = T extends U ? T : never;
type OnlyStrings = ExtractByType<string | number | boolean, string>; // string

// Exclude types
type ExcludeType<T, U> = T extends U ? never : T;
type NoStrings = ExcludeType<string | number | boolean, string>; // number | boolean

// Built-in: Extract<T, U> and Exclude<T, U>
// Extract keeps types that are assignable to U
// Exclude removes types that are assignable to U


// =============================================================================
// PART 2: MAPPED TYPES
// =============================================================================

// Create new types by transforming properties of existing types

type User = {
    name: string;
    age: number;
    email: string;
};

// Make all properties optional
type PartialUser = {
    [K in keyof User]?: User[K];
};

// Make all properties readonly
type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};

// Generic mapped type
type MakeOptional<T> = {
    [K in keyof T]?: T[K];
};

type MakeReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

type MakeNullable<T> = {
    [K in keyof T]: T[K] | null;
};

// Remove readonly
type MakeMutable<T> = {
    -readonly [K in keyof T]: T[K];
};

// Remove optional
type MakeRequired<T> = {
    [K in keyof T]-?: T[K];
};

// Remap keys
// Convert all keys to snake_case versions
type APIUser = {
    userName: string;
    userAge: number;
    userEmail: string;
};

type SnakeCase<T> = {
    [K in keyof T as K extends string ? SnakeCaseTransform<K> : K]: T[K];
};

type SnakeCaseTransform<S extends string> =
    S extends `${infer First}${infer Rest}`
        ? `${Lowercase<First>}${SnakeCaseRest<Rest>}`
        : S;

type SnakeCaseRest<S extends string> =
    S extends `${infer First}${infer Rest}`
        ? First extends Uppercase<First>
            ? `_${Lowercase<First>}${SnakeCaseRest<Rest>}`
            : `${First}${SnakeCaseRest<Rest>}`
        : S;

type SnakeUser = SnakeCase<APIUser>;
// { user_name: string; user_age: number; user_email: string; }


// =============================================================================
// PART 3: TEMPLATE LITERAL TYPES
// =============================================================================

// Create string literal types using template syntax
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">;     // "onClick"
type HoverEvent = EventName<"hover">;     // "onHover"

// Combining with unions
type Events = "click" | "hover" | "focus";
type EventHandlers = `on${Capitalize<Events>}`;
// "onClick" | "onHover" | "onFocus"

// CSS property types
type CSSUnit = "px" | "em" | "rem" | "%";
type CSSValue = `${number}${CSSUnit}`;

const validValue: CSSValue = "16px";
// const invalidValue: CSSValue = "16"; // Error!

// Route parameters
type Route = `/users/${string}` | `/users/${string}/posts` | `/posts`;

const userRoute: Route = `/users/123`;
const userPostsRoute: Route = `/users/456/posts`;

// Extract route parameters
type ExtractParams<T extends string> =
    T extends `${infer Start}/${infer Param}/${infer Rest}`
        ? Param extends `:${infer Name}`
            ? { [K in Name]: string } & ExtractParams<`/${Rest}`>
            : ExtractParams<`/${Rest}`>
        : T extends `${infer Start}/${infer Param}`
            ? Param extends `:${infer Name}`
                ? { [K in Name]: string }
                : {}
            : {};

// Usage example - would need recursive type to fully flatten


// =============================================================================
// PART 4: INFER KEYWORD
// =============================================================================

// Infer extracts types from within other types

// Extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
    return { id: 1, name: "Alice" };
}

type UserReturn = ReturnType<typeof getUser>; // { id: number; name: string; }

// Extract parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function updateUser(id: number, name: string, active: boolean) {
    return { id, name, active };
}

type UpdateParams = Parameters<typeof updateUser>; // [number, string, boolean]

// Extract first element type
type FirstElement<T> = T extends [infer First, ...any[]] ? First : never;
type First = FirstElement<[string, number, boolean]>; // string

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;
type Num = ElementType<number[]>; // number

// Extract promise value type
type Awaited<T> = T extends Promise<infer V> ? V : T;
type PromiseValue = Awaited<Promise<string>>; // string

// Flatten nested arrays
type Flatten<T> = T extends (infer E)[] ? Flatten<E> : T;
type DeepFlatten = Flatten<number[][][][]>; // number

// Get object property type
type PropertyType<T, K extends keyof T> = T[K];
type UserNameType = PropertyType<User, "name">; // string


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a DeepPartial<T> type that makes ALL nested properties optional.
// Hint: Use recursion with mapped types.

// TODO 2: Create a type Path<T> that represents all possible dot-notation paths
// through an object. Example: Path<{a: {b: {c: string}}}> = "a" | "a.b" | "a.b.c"

// TODO 3: Create a type that converts an object's keys from camelCase to kebab-case.
// Example: { myProperty: string } becomes { "my-property": string }


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Type-Safe API Client Generator
 *
 * Build types that automatically generate a type-safe API client from an endpoint definition.
 *
 * 1. Define endpoint types:
 *    type Endpoint = {
 *      path: string;           // e.g., "/users/:id"
 *      method: "GET" | "POST" | "PUT" | "DELETE";
 *      params?: Record<string, string>;  // URL params
 *      body?: any;             // Request body type
 *      response: any;          // Response type
 *    };
 *
 * 2. Create utility types:
 *    - ExtractPathParams<T> - Extracts ":id" style params from a path
 *      Example: "/users/:id/posts/:postId" => { id: string; postId: string }
 *
 *    - CreateEndpointFunction<T> - Creates function signature for an endpoint
 *      Should include params (if any), body (if any), and return Promise<response>
 *
 * 3. Test with these endpoints:
 *    - getUser: GET /users/:id -> returns User
 *    - createUser: POST /users with body CreateUserDTO -> returns User
 *    - updateUser: PUT /users/:id with body UpdateUserDTO -> returns User
 *    - deleteUser: DELETE /users/:id -> returns void
 *
 * 4. The resulting client should have full type safety:
 *    client.getUser({ id: "123" }) returns Promise<User>
 *    client.createUser({}, { name: "Alice", email: "alice@example.com" }) returns Promise<User>
 */

// Step 1: Parse path params
type ExtractPathParams<Path extends string> =
    Path extends `${infer Start}/:${infer Param}/${infer Rest}`
        ? { [K in Param]: string } & ExtractPathParams<`/${Rest}`>
        : Path extends `${infer Start}/:${infer Param}`
            ? { [K in Param]: string }
            : {};

// Test path extraction
type UserParams = ExtractPathParams<"/users/:id">;              // { id: string }
type PostParams = ExtractPathParams<"/users/:id/posts/:postId">; // { id: string; postId: string }

// Step 2: Flatten intersection type
type FlattenIntersection<T> = {
    [K in keyof T]: T[K]
};

// Step 3: Create endpoint function type
type EndpointFunction<
    Path extends string,
    Method extends string,
    Body,
    Response
> = keyof ExtractPathParams<Path> extends never
    ? Body extends undefined
        ? () => Promise<Response>
        : (body: Body) => Promise<Response>
    : Body extends undefined
        ? (params: FlattenIntersection<ExtractPathParams<Path>>) => Promise<Response>
        : (
            params: FlattenIntersection<ExtractPathParams<Path>>,
            body: Body
        ) => Promise<Response>;

// Step 4: Define your endpoints
interface User {
    id: string;
    name: string;
    email: string;
}

interface CreateUserDTO {
    name: string;
    email: string;
}

interface UpdateUserDTO {
    name?: string;
    email?: string;
}

type Endpoints = {
    getUser: {
        path: "/users/:id";
        method: "GET";
        response: User;
    };
    createUser: {
        path: "/users";
        method: "POST";
        body: CreateUserDTO;
        response: User;
    };
    updateUser: {
        path: "/users/:id";
        method: "PUT";
        body: UpdateUserDTO;
        response: User;
    };
    deleteUser: {
        path: "/users/:id";
        method: "DELETE";
        response: void;
    };
    getUserPosts: {
        path: "/users/:id/posts/:postId";
        method: "GET";
        response: { id: string; title: string };
    };
};

// Step 5: Generate client type from endpoints
type APIClient<Endpoints extends Record<string, any>> = {
    [K in keyof Endpoints]: EndpointFunction<
        Endpoints[K]["path"],
        Endpoints[K]["method"],
        Endpoints[K]["body"],
        Endpoints[K]["response"]
    >;
};

type MyAPIClient = APIClient<Endpoints>;

// Test the generated types
export function runChallenge() {
    // This is a type-checking challenge - the code below demonstrates
    // what the types should enforce

    const mockClient: MyAPIClient = {
        getUser: async ({ id }) => ({ id, name: "Alice", email: "alice@example.com" }),
        createUser: async (_params, body) => ({ id: "123", ...body }),
        updateUser: async ({ id }, body) => ({ id, name: "Updated", email: "updated@example.com", ...body }),
        deleteUser: async ({ id }) => { console.log(`Deleted ${id}`); },
        getUserPosts: async ({ id, postId }) => ({ id: postId, title: `Post by ${id}` })
    };

    console.log("Type-safe API client structure:");
    console.log("- getUser(params: { id: string }) => Promise<User>");
    console.log("- createUser(params: {}, body: CreateUserDTO) => Promise<User>");
    console.log("- updateUser(params: { id: string }, body: UpdateUserDTO) => Promise<User>");
    console.log("- deleteUser(params: { id: string }) => Promise<void>");
    console.log("- getUserPosts(params: { id: string, postId: string }) => Promise<{ id: string; title: string }>");

    // These would all have full type checking:
    // mockClient.getUser({ id: "123" }); // ✓ Valid
    // mockClient.createUser({}, { name: "Bob", email: "bob@example.com" }); // ✓ Valid
    // mockClient.updateUser({ id: "123" }, { name: "New Name" }); // ✓ Valid
    // mockClient.deleteUser({ id: "123" }); // ✓ Valid

    return mockClient;
}

// Uncomment to test:
// runChallenge();

// Run: bun run curriculum/stage-07-advanced-patterns/03-type-manipulation/lesson.ts
