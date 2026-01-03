import "reflect-metadata";
import { container, inject, injectable, singleton } from "tsyringe";

/**
 * TSyringe Dependency Injection Guide
 * 
 * 1. Basics:
 *    - @injectable(): Marks a class as available for injection.
 *    - @singleton(): Marks a class as a singleton (only one instance created).
 *    - container.resolve(Class): Gets an instance of a class from the container.
 * 
 * 2. Why use it?
 *    - Decoupling logic: Services don't need to know how to create their dependencies.
 *    - Testability: Easily swap real implementations with mocks during testing.
 *    - Lifecycle management: The container handles object creation and lifetime.
 */

// --- Simple Example ---

@injectable()
class Logger {
    log(message: string) {
        console.log(`[LOG]: ${message}`);
    }
}

@injectable()
class UserService {
    // TSyringe automatically injects Logger because of the @injectable decorator
    constructor(private logger: Logger) { }

    createUser(name: string) {
        this.logger.log(`Creating user: ${name}`);
    }
}

// Instead of: const service = new UserService(new Logger());
// We do:
const userService = container.resolve(UserService);
userService.createUser("Ahmed");

// --- Singleton Example ---

@singleton()
class DatabaseConnection {
    private id = Math.random();
    query(sql: string) {
        console.log(`DB [${this.id}] executing: ${sql}`);
    }
}

@injectable()
class Repository {
    constructor(private db: DatabaseConnection) { }
    save() { this.db.query("INSERT..."); }
}

const repo1 = container.resolve(Repository);
const repo2 = container.resolve(Repository);
// Both repo1 and repo2 share the SAME DatabaseConnection instance
repo1.save();
repo2.save();

// --- Interface/Token Injection ---

interface IEmailService {
    send(to: string, msg: string): void;
}

@injectable()
class SendGridService implements IEmailService {
    send(to: string, msg: string) {
        console.log(`Sending email to ${to} via SendGrid: ${msg}`);
    }
}

// Register a token
container.register("IEmailService", { useClass: SendGridService });

@injectable()
class NotificationManager {
    constructor(
        @inject("IEmailService") private emailService: IEmailService
    ) { }

    notify(user: string) {
        this.emailService.send(user, "Welcome!");
    }
}

const manager = container.resolve(NotificationManager);
manager.notify("ahmed@example.com");
