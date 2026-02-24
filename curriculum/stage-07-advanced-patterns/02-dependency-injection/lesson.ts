/**
 * =============================================================================
 * LESSON 02: DEPENDENCY INJECTION
 * =============================================================================
 *
 * Dependency Injection (DI) is a design pattern where objects receive their
 * dependencies from external sources rather than creating them internally.
 * This makes code more testable, modular, and maintainable.
 *
 * Run this file: bun run curriculum/stage-07-advanced-patterns/02-dependency-injection/lesson.ts
 */

// =============================================================================
// PART 1: MANUAL DEPENDENCY INJECTION
// =============================================================================

// Without DI - tight coupling
class TightCoupledDatabase {
    connect() {
        console.log("Connecting to production database...");
    }
}

class TightCoupledUserService {
    private db = new TightCoupledDatabase(); // Hard-coded dependency

    getUser(id: number) {
        this.db.connect();
        return { id, name: "User " + id };
    }
}

// With DI - loose coupling via interfaces
interface Database {
    connect(): void;
    query(sql: string): any[];
}

class PostgresDatabase implements Database {
    connect() {
        console.log("Connecting to PostgreSQL...");
    }
    query(sql: string): any[] {
        console.log(`Executing: ${sql}`);
        return [];
    }
}

class MockDatabase implements Database {
    connect() {
        console.log("Using mock database");
    }
    query(sql: string): any[] {
        return [{ id: 1, name: "Mock User" }];
    }
}

class UserService {
    constructor(private db: Database) {} // Dependency injected

    getUser(id: number) {
        this.db.connect();
        return this.db.query(`SELECT * FROM users WHERE id = ${id}`)[0];
    }
}

// Inject different implementations
const prodService = new UserService(new PostgresDatabase());
const testService = new UserService(new MockDatabase());

console.log("Production service:");
prodService.getUser(1);

console.log("\nTest service:");
const user = testService.getUser(1);
console.log("Got user:", user);


// =============================================================================
// PART 2: BUILDING A SIMPLE DI CONTAINER
// =============================================================================

// Token for identifying services
class InjectionToken<T> {
    constructor(public readonly name: string) {}
}

// Simple DI container
class Container {
    private services = new Map<InjectionToken<any> | Function, any>();
    private factories = new Map<InjectionToken<any> | Function, () => any>();

    // Register a singleton instance
    register<T>(token: InjectionToken<T>, instance: T): this {
        this.services.set(token, instance);
        return this;
    }

    // Register a factory function
    registerFactory<T>(token: InjectionToken<T>, factory: () => T): this {
        this.factories.set(token, factory);
        return this;
    }

    // Resolve a service
    resolve<T>(token: InjectionToken<T>): T {
        // Return existing instance
        if (this.services.has(token)) {
            return this.services.get(token);
        }

        // Create from factory
        if (this.factories.has(token)) {
            const instance = this.factories.get(token)!();
            this.services.set(token, instance); // Cache as singleton
            return instance;
        }

        throw new Error(`Service ${token.name} not registered`);
    }
}

// Define tokens
const DATABASE_TOKEN = new InjectionToken<Database>("Database");
const LOGGER_TOKEN = new InjectionToken<Logger>("Logger");

interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string) {
        console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    }
}

// Use the container
const container = new Container();

container
    .registerFactory(DATABASE_TOKEN, () => new PostgresDatabase())
    .register(LOGGER_TOKEN, new ConsoleLogger());

const db = container.resolve(DATABASE_TOKEN);
const logger = container.resolve(LOGGER_TOKEN);

logger.log("Database connected");


// =============================================================================
// PART 3: CONSTRUCTOR INJECTION PATTERN
// =============================================================================

// Using decorators for cleaner DI (simplified version)
const INJECT_KEY = Symbol("inject");

function Inject(token: InjectionToken<any>) {
    return function (target: any, propertyKey: string | undefined, parameterIndex: number) {
        const existingTokens = Reflect.getMetadata(INJECT_KEY, target) || [];
        existingTokens[parameterIndex] = token;
        Reflect.defineMetadata(INJECT_KEY, existingTokens, target);
    };
}

// Auto-resolving container
class AutoContainer extends Container {
    // Build instance with auto-injected dependencies
    create<T>(constructor: new (...args: any[]) => T): T {
        const paramTypes = Reflect.getMetadata("design:paramtypes", constructor) || [];
        const injectTokens = Reflect.getMetadata(INJECT_KEY, constructor) || [];

        const args = paramTypes.map((type: any, index: number) => {
            // Use explicit token if @Inject was used, otherwise use type
            const token = injectTokens[index] || type;
            return this.resolve(token);
        });

        return new constructor(...args);
    }
}

// Service classes
class EmailService {
    sendEmail(to: string, subject: string): void {
        console.log(`Sending email to ${to}: ${subject}`);
    }
}

class NotificationService {
    constructor(
        private emailService: EmailService,
        private logger: Logger
    ) {}

    notifyUser(userId: number, message: string): void {
        this.logger.log(`Notifying user ${userId}: ${message}`);
        this.emailService.sendEmail(`user${userId}@example.com`, "Notification",);
    }
}

// Manual injection (no decorators needed)
const EMAIL_TOKEN = new InjectionToken<EmailService>("EmailService");

const notificationContainer = new Container();
notificationContainer.register(LOGGER_TOKEN, new ConsoleLogger());
notificationContainer.register(EMAIL_TOKEN, new EmailService());

const notificationService = new NotificationService(
    notificationContainer.resolve(EMAIL_TOKEN),
    notificationContainer.resolve(LOGGER_TOKEN)
);
notificationService.notifyUser(42, "Welcome!");


// =============================================================================
// PART 4: WHEN TO USE DI
// =============================================================================

// ✅ Use DI when:
// 1. You need to swap implementations (testing, different environments)
// 2. You have shared resources (database, cache, logger)
// 3. You want to reduce coupling between modules
// 4. You need lifecycle management (singleton, transient, scoped)

// ❌ Avoid DI when:
// 1. Simple utilities with no external dependencies
// 2. Value objects or DTOs
// 3. It adds complexity without benefit

// Example: Good DI use case
interface Cache {
    get(key: string): any;
    set(key: string, value: any): void;
}

class RedisCache implements Cache {
    get(key: string) { return null; }
    set(key: string, value: any) { console.log(`Redis: ${key} = ${value}`); }
}

class MemoryCache implements Cache {
    private store = new Map();
    get(key: string) { return this.store.get(key); }
    set(key: string, value: any) { this.store.set(key, value); }
}

class ProductService {
    constructor(private cache: Cache) {}

    getProduct(id: number) {
        const cached = this.cache.get(`product:${id}`);
        if (cached) return cached;

        const product = { id, name: `Product ${id}` };
        this.cache.set(`product:${id}`, product);
        return product;
    }
}

// Same service, different cache implementations
const redisService = new ProductService(new RedisCache());
const memoryService = new ProductService(new MemoryCache());


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create an interface 'PaymentGateway' with a 'process(amount): Promise<void>'
// method. Implement 'StripeGateway' and 'PayPalGateway'. Create a 'CheckoutService'
// that receives the gateway via constructor injection.

// TODO 2: Create a simple container that can register and resolve services by string
// name instead of tokens. Add a 'singleton' option that caches the first instance.

// TODO 3: Create a 'HttpClient' interface and implement it with 'FetchHttpClient'.
// Create a 'UserRepository' that depends on HttpClient. Show how you can swap
// the implementation for testing.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Modular Service Architecture
 *
 * Build a service layer with DI for an e-commerce application:
 *
 * 1. Define interfaces:
 *    - IInventoryService: checkStock(productId), reserve(productId, qty)
 *    - IPaymentService: charge(amount, token), refund(transactionId)
 *    - IOrderRepository: save(order), findById(id)
 *    - IEmailService: sendOrderConfirmation(email, order)
 *
 * 2. Create concrete implementations:
 *    - MockInventoryService (in-memory stock tracking)
 *    - StripePaymentService (mock Stripe integration)
 *    - InMemoryOrderRepository
 *    - ConsoleEmailService (logs instead of sending)
 *
 * 3. Create OrderService that depends on ALL four interfaces:
 *    - createOrder(userId, items, paymentToken)
 *      * Check inventory for all items
 *      * Calculate total
 *      * Charge payment
 *      * Save order
 *      * Send confirmation
 *      * Return order
 *
 * 4. Create a Container that wires everything together
 *
 * 5. Write a test that swaps PaymentService with a Mock that always fails,
 *    verifying the order is NOT created when payment fails
 */

export interface IInventoryService {
    checkStock(productId: string): number;
    reserve(productId: string, quantity: number): boolean;
    release(productId: string, quantity: number): void;
}

export interface IPaymentService {
    charge(amount: number, token: string): Promise<{ success: boolean; transactionId: string }>;
    refund(transactionId: string): Promise<boolean>;
}

export interface IOrderRepository {
    save(order: any): void;
    findById(id: string): any | null;
}

export interface IEmailService {
    sendOrderConfirmation(email: string, order: any): void;
}

// TODO: Implement services
export class MockInventoryService implements IInventoryService {
    // TODO: Track stock in memory
    checkStock(productId: string): number { return 0; }
    reserve(productId: string, quantity: number): boolean { return false; }
    release(productId: string, quantity: number): void {}
}

export class StripePaymentService implements IPaymentService {
    async charge(amount: number, token: string): Promise<{ success: boolean; transactionId: string }> {
        return { success: true, transactionId: "txn_" + Date.now() };
    }
    async refund(transactionId: string): Promise<boolean> {
        return true;
    }
}

export class FailingPaymentService implements IPaymentService {
    async charge(amount: number, token: string): Promise<{ success: boolean; transactionId: string }> {
        return { success: false, transactionId: "" };
    }
    async refund(transactionId: string): Promise<boolean> {
        return false;
    }
}

export class InMemoryOrderRepository implements IOrderRepository {
    private orders = new Map<string, any>();
    save(order: any): void {
        this.orders.set(order.id, order);
    }
    findById(id: string): any | null {
        return this.orders.get(id) || null;
    }
}

export class ConsoleEmailService implements IEmailService {
    sendOrderConfirmation(email: string, order: any): void {
        console.log(`[EMAIL] Confirmation sent to ${email} for order ${order.id}`);
    }
}

export class OrderService {
    constructor(
        private inventory: IInventoryService,
        private payment: IPaymentService,
        private orders: IOrderRepository,
        private email: IEmailService
    ) {}

    async createOrder(
        userId: string,
        email: string,
        items: { productId: string; quantity: number; price: number }[],
        paymentToken: string
    ): Promise<{ success: boolean; order?: any; error?: string }> {
        // TODO: Implement order creation logic
        return { success: false, error: "Not implemented" };
    }
}

export class EcommerceContainer {
    private services = new Map<string, any>();

    register<T>(name: string, implementation: T): this {
        this.services.set(name, implementation);
        return this;
    }

    resolve<T>(name: string): T {
        const service = this.services.get(name);
        if (!service) throw new Error(`Service ${name} not found`);
        return service;
    }

    createOrderService(): OrderService {
        return new OrderService(
            this.resolve<IInventoryService>("inventory"),
            this.resolve<IPaymentService>("payment"),
            this.resolve<IOrderRepository>("orders"),
            this.resolve<IEmailService>("email")
        );
    }
}

export async function runChallenge() {
    // Setup with working payment
    const container = new EcommerceContainer();
    container
        .register("inventory", new MockInventoryService())
        .register("payment", new StripePaymentService())
        .register("orders", new InMemoryOrderRepository())
        .register("email", new ConsoleEmailService());

    const orderService = container.createOrderService();

    console.log("=== Test 1: Successful order ===");
    const result1 = await orderService.createOrder(
        "user-1",
        "customer@example.com",
        [{ productId: "prod-1", quantity: 2, price: 25 }],
        "tok_visa"
    );
    console.log("Result:", result1);

    // Setup with failing payment
    container.register("payment", new FailingPaymentService());
    const failingService = container.createOrderService();

    console.log("\n=== Test 2: Failed payment ===");
    const result2 = await failingService.createOrder(
        "user-2",
        "customer2@example.com",
        [{ productId: "prod-1", quantity: 1, price: 100 }],
        "tok_declined"
    );
    console.log("Result:", result2);
}

// Uncomment to test:
// runChallenge().catch(console.error);

// Run: bun run curriculum/stage-07-advanced-patterns/02-dependency-injection/lesson.ts
