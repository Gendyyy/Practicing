/**
 * -----------------------------------------------------------------------------
 * 02 - DEPENDENCY INJECTION with AWILIX
 * -----------------------------------------------------------------------------
 * 
 * Awilix is a classic JS/TS DI container. It does NOT require decorators.
 * It uses a "container" object where you register things manually.
 */

import { createContainer, asClass, asValue, AwilixContainer } from "awilix";

// -----------------------------------------------------------------------------
// PART 1: THE CLASSES
// -----------------------------------------------------------------------------
// Note: Pure classes! No decorators needed.

class Config {
    // Just a simple value holder
    get dbUrl() { return "postgres://localhost:5432"; }
}

class Database {
    // Awilix injects an OBJECT with matching names
    // If registered as 'config', this constructor gets { config: ... }
    constructor(private opts: { config: Config }) { }

    connect() {
        console.log("Connecting to", this.opts.config.dbUrl);
    }
}

class App {
    constructor(private opts: { database: Database }) { }

    start() {
        console.log("App starting...");
        this.opts.database.connect();
    }
}

// -----------------------------------------------------------------------------
// PART 2: WIRING IT UP
// -----------------------------------------------------------------------------

export function demoAwilix() {
    // 1. Create Container
    const container = createContainer();

    // 2. Register Dependencies
    // camelCase names match the constructor arguments above!
    container.register({
        config: asClass(Config).singleton(),
        database: asClass(Database).singleton(),
        app: asClass(App).singleton()
    });

    // 3. Resolve Root
    const app = container.resolve<App>("app");
    app.start();
}


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Register a simple value 'version' using 'asValue("1.0.0")'.
// 2. Inject it into 'App'.
// 3. Log the version in App.start().

export function runChallenge() {
    // TODO: Copy the setup above and modify it
}
