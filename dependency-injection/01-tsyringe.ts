/**
 * -----------------------------------------------------------------------------
 * 01 - DEPENDENCY INJECTION with TSYRINGE
 * -----------------------------------------------------------------------------
 * 
 * TSyringe is a Microsoft library for DI. It uses decorators.
 * 
 * SETUP:
 * 1. "emitDecoratorMetadata": true  (in tsconfig)
 * 2. "experimentalDecorators": true (in tsconfig)
 * 3. import "reflect-metadata" at the top of entry file
 */

import "reflect-metadata";
import { container, injectable, singleton, inject } from "tsyringe";

// -----------------------------------------------------------------------------
// PART 1: THE SERVICE (Dependency)
// -----------------------------------------------------------------------------

@singleton() // Created ONCE and reused
class Database {
    constructor() {
        console.log("Database Connected!");
    }

    public getData() {
        return ["User A", "User B"];
    }
}

// -----------------------------------------------------------------------------
// PART 2: THE CONSUMER
// -----------------------------------------------------------------------------

@injectable()
class UserService {
    // TSyringe auto-injects based on Type!
    // No manual 'new Database()' needed.
    constructor(private db: Database) { }

    public printUsers() {
        console.log("Users:", this.db.getData());
    }
}


// -----------------------------------------------------------------------------
// PART 3: RESOLUTION
// -----------------------------------------------------------------------------

export function demoTsyringe() {
    // We ask the container for an instance
    const service = container.resolve(UserService);
    service.printUsers();
}

// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Create a class 'Logger' with a method 'log(msg)'.
// 2. Inject usage of Logger into 'Database' (yes, nested injection!).
// 3. Resolve Database and verify it logs when created.

export function runChallenge() {
    // TODO: Write classes here
    // const db = container.resolve(Database);
}
