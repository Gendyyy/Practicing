/**
 * =============================================================================
 * LESSON 03: NESTED OBJECTS
 * =============================================================================
 *
 * Working with deeply nested objects requires special TypeScript features:
 * optional chaining, nullish coalescing, and recursive types.
 *
 * Run this file: bun run curriculum/stage-05-data-structures/03-nested-objects/lesson.ts
 */

// =============================================================================
// PART 1: TYPING DEEP OBJECTS
// =============================================================================

// Recursive interface for tree-like structures
interface Category {
    id: string;
    name: string;
    subcategories?: Category[]; // Optional and self-referential
}

const electronics: Category = {
    id: "elec",
    name: "Electronics",
    subcategories: [
        {
            id: "comp",
            name: "Computers",
            subcategories: [
                { id: "laptop", name: "Laptops" },
                { id: "desktop", name: "Desktops" }
            ]
        },
        { id: "phone", name: "Phones" }
    ]
};

// Deeply nested user type
interface Company {
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    departments: {
        name: string;
        manager?: {
            name: string;
            contact: {
                email: string;
                phone?: string;
            };
        };
    }[];
}

const techCorp: Company = {
    name: "TechCorp",
    address: {
        street: "123 Innovation Dr",
        city: "San Francisco",
        country: "USA"
    },
    departments: [
        {
            name: "Engineering",
            manager: {
                name: "Alice Johnson",
                contact: {
                    email: "alice@techcorp.com",
                    phone: "+1-555-0100"
                }
            }
        },
        {
            name: "Marketing"
            // No manager defined
        }
    ]
};


// =============================================================================
// PART 2: OPTIONAL CHAINING (?.)
// =============================================================================

// Old way - verbose null checks
const emailOld = techCorp.departments[0]?.manager?.contact?.email;

// Optional chaining - safely access nested properties
// Returns undefined if any part of the chain is null/undefined
const managerEmail = techCorp.departments[0]?.manager?.contact?.email;
console.log("Manager email:", managerEmail); // alice@techcorp.com

// Works with arrays too
const secondManager = techCorp.departments[1]?.manager?.name;
console.log("Second manager:", secondManager); // undefined (no error!)

// Safe method calls with optional chaining
const sendEmail = (address: string) => console.log(`Sending to ${address}`);
// Only calls sendEmail if managerEmail exists
managerEmail && sendEmail(managerEmail);

// Combining with bracket notation
const deptIndex = 0;
const dynamicAccess = techCorp.departments[deptIndex]?.["manager"]?.["name"];
console.log("Dynamic access:", dynamicAccess); // Alice Johnson


// =============================================================================
// PART 3: NULLISH COALESCING (??)
// =============================================================================

// ?? returns right side ONLY if left side is null or undefined
// (unlike || which returns right side for ANY falsy value)

const config = {
    timeout: 0,        // Falsy but valid!
    retries: null,     // Null - should use default
    debug: false,      // Falsy but valid!
    name: undefined    // Undefined - should use default
};

// Wrong way with ||
const timeoutWrong = config.timeout || 5000;  // 5000! (0 is falsy)
const debugWrong = config.debug || true;      // true! (false is falsy)

// Right way with ??
const timeoutRight = config.timeout ?? 5000;  // 0 (kept because not null/undefined)
const retriesRight = config.retries ?? 3;     // 3 (null triggers default)
const debugRight = config.debug ?? true;      // false (kept because not null/undefined)
const nameRight = config.name ?? "default";   // "default" (undefined triggers default)

console.log(`timeout: ${timeoutRight}, retries: ${retriesRight}, debug: ${debugRight}, name: ${nameRight}`);

// Combined with optional chaining
const userPhone = techCorp.departments[0]?.manager?.contact?.phone ?? "No phone";
console.log("Phone:", userPhone); // +1-555-0100

const missingPhone = techCorp.departments[1]?.manager?.contact?.phone ?? "No phone";
console.log("Missing phone:", missingPhone); // No phone


// =============================================================================
// PART 4: TYPE GUARDS FOR NESTED PROPERTIES
// =============================================================================

// Type guards help narrow types in nested structures
interface ApiResponse {
    success: boolean;
    data?: {
        user?: {
            id: number;
            name: string;
        };
    };
    error?: {
        code: string;
        message: string;
    };
}

function handleResponse(response: ApiResponse): string {
    // Type guard: check success flag
    if (!response.success) {
        // TypeScript knows error exists here (would need proper type narrowing in real code)
        return `Error: ${response.error?.message ?? "Unknown error"}`;
    }

    // Use optional chaining + nullish coalescing
    const userName = response.data?.user?.name ?? "Anonymous";
    return `Welcome, ${userName}!`;
}

const successResponse: ApiResponse = {
    success: true,
    data: { user: { id: 1, name: "Alice" } }
};

const errorResponse: ApiResponse = {
    success: false,
    error: { code: "AUTH_001", message: "Invalid credentials" }
};

console.log(handleResponse(successResponse)); // Welcome, Alice!
console.log(handleResponse(errorResponse));   // Error: Invalid credentials

// Custom type guard for nested objects
function hasManager(dept: Company["departments"][0]): dept is typeof dept & { manager: NonNullable<typeof dept.manager> } {
    return dept.manager !== undefined;
}

// Using the type guard
for (const dept of techCorp.departments) {
    if (hasManager(dept)) {
        // TypeScript knows manager exists here
        console.log(`${dept.name} is managed by ${dept.manager.name}`);
    } else {
        console.log(`${dept.name} has no manager`);
    }
}


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Given a nested user object with optional profile, safely get the
// avatar URL using optional chaining, with a default fallback using ??

// TODO 2: Create a type guard function 'hasCoordinates' that checks if a
// Company has coordinates in its address, narrowing the type properly.

// TODO 3: Write a function 'getDepartmentManagerEmail' that safely retrieves
// a manager's email from a company and department name, returning a default
// if anything is missing.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Deep Object Navigator
 *
 * You're building a configuration manager that handles deeply nested settings.
 *
 * 1. Create a 'ConfigManager' class that stores a nested configuration object:
 *    {
 *      app: { name: string; version: string; debug?: boolean };
 *      database: {
 *        primary: { host: string; port: number };
 *        replica?: { host: string; port: number };
 *      };
 *      features: {
 *        [key: string]: {
 *          enabled: boolean;
 *          settings?: Record<string, any>;
 *        };
 *      };
 *    }
 *
 * 2. Implement these methods using optional chaining and nullish coalescing:
 *    - get<T>(path: string, defaultValue?: T): T - gets value at dot-notation path
 *      Example: get("database.primary.host") returns the host
 *    - getFeature(name: string): { enabled: boolean; settings: Record<string, any> }
 *      Returns feature with defaults: { enabled: false, settings: {} }
 *    - isDebugMode(): boolean - returns debug flag, defaults to false
 *    - getDatabaseHost(useReplica = false): string - returns primary or replica host
 *
 * 3. Handle all edge cases: missing paths, null values, undefined parents
 */

interface AppConfig {
    app: {
        name: string;
        version: string;
        debug?: boolean;
    };
    database: {
        primary: { host: string; port: number };
        replica?: { host: string; port: number };
    };
    features: {
        [key: string]: {
            enabled: boolean;
            settings?: Record<string, any>;
        };
    };
}

export class ConfigManager {
    private config: AppConfig;

    constructor(config: AppConfig) {
        this.config = config;
    }

    // TODO: Implement get method with dot-notation path support
    get<T>(path: string, defaultValue?: T): T | undefined {
        // Parse "database.primary.host" and navigate safely
        return undefined;
    }

    // TODO: Implement getFeature with defaults
    getFeature(name: string): { enabled: boolean; settings: Record<string, any> } {
        return { enabled: false, settings: {} };
    }

    // TODO: Implement isDebugMode
    isDebugMode(): boolean {
        return false;
    }

    // TODO: Implement getDatabaseHost with replica support
    getDatabaseHost(useReplica = false): string {
        return "";
    }
}

export function runChallenge() {
    const config: AppConfig = {
        app: { name: "MyApp", version: "1.0.0" },
        database: {
            primary: { host: "db-primary.example.com", port: 5432 },
            replica: { host: "db-replica.example.com", port: 5432 }
        },
        features: {
            auth: { enabled: true, settings: { provider: "oauth" } },
            billing: { enabled: false }
        }
    };

    const manager = new ConfigManager(config);

    console.log("Primary host:", manager.getDatabaseHost());
    console.log("Replica host:", manager.getDatabaseHost(true));
    console.log("Auth feature:", manager.getFeature("auth"));
    console.log("Missing feature:", manager.getFeature("unknown"));
    console.log("Debug mode:", manager.isDebugMode());
    console.log("Path get:", manager.get("app.name"));
}

// Run: bun run curriculum/stage-05-data-structures/03-nested-objects/lesson.ts
