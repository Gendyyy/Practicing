import { createContainer, asClass, asValue, InjectionMode } from "awilix";

/**
 * Awilix Dependency Injection Guide
 * 
 * 1. Key Differences from TSyringe:
 *    - No Decorators: Awilix doesn't require @injectable or @inject. 
 *    - Manual Registration: You register everything in one place.
 *    - Injection Modes: 
 *      - PROXY (Default): Pass an object with dependencies to the constructor.
 *      - CLASSIC: Match constructor parameter names to registration names.
 *      - VALUE: Register simple values (configs, strings).
 * 
 * 2. Why use it?
 *    - Decoupled from classes: Your classes don't need to import Awilix.
 *    - Centralized: See all your dependencies and their lifetimes in one file.
 */

// --- 1. Define your classes (POJO - Plain Old JavaScript Objects) ---
// Note: These classes have NO knowledge of Awilix!

class Logger {
    log(message: string) {
        console.log(`[AWILIX LOG]: ${message}`);
    }
}

class UserService {
    // If using PROXY mode (Default), the constructor receives an object
    // Notice how 'config' is just another key in the object!
    constructor({ logger, config }: { logger: Logger, config: any }) {
        this.logger = logger;
        this.config = config;
    }
    private logger: Logger;
    private config: any;

    createUser(name: string) {
        this.logger.log(`Creating user: ${name} (Env: ${this.config.env})`);
    }
}

// --- 2. Setup the Container ---

const container = createContainer({
    injectionMode: InjectionMode.PROXY
});

// --- 3. Register everything ---

container.register({
    // Register as singleton (one instance shared)
    logger: asClass(Logger).singleton(),

    // Register as transient (new instance every time)
    userService: asClass(UserService).transient(),

    // Register values
    config: asValue({ apiKey: "12345", env: "dev" })
});

// --- 4. Resolve and Use ---

const userService = container.resolve<UserService>("userService");
userService.createUser("Ahmed");

// --- 5. Lifecycle Example ---

class Database {
    id = Math.random();
    constructor() { console.log("DB Initialized"); }
}

container.register({
    db: asClass(Database).singleton()
});

const db1 = container.resolve<Database>("db");
const db2 = container.resolve<Database>("db");
console.log(`Shared DB ID check: ${db1.id === db2.id}`); // true

/**
 * PRO TIP: Interfaces with Awilix
 * 
 * Since Awilix relies on names (keys in the registration object), 
 * the "Interface problem" from TSyringe goes away.
 * You just register your implementation under the name of the "service".
 */

interface IEmailService {
    send(msg: string): void;
}

class SendGridService implements IEmailService {
    send(msg: string) { console.log(`Email sent: ${msg}`); }
}

container.register({
    emailService: asClass(SendGridService).singleton()
});

// The UserService would simply expect { emailService } in its constructor
