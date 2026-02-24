/**
 * =============================================================================
 * LESSON 02: BUN:SQLITE
 * =============================================================================
 *
 * bun:sqlite is a high-performance SQLite3 driver built into Bun.
 * It's based on the fastest SQLite bindings available.
 *
 * Run this file: bun run curriculum/stage-08-bun-features/02-bun-sqlite/lesson.ts
 */

// =============================================================================
// PART 1: DATABASE BASICS
// =============================================================================

import { Database } from "bun:sqlite";

// Create or open a database (in-memory or file-based)
// const db = new Database(":memory:"); // In-memory database
const db = new Database("/tmp/lesson.db"); // File-based database

// Enable WAL mode for better concurrent performance
db.exec("PRAGMA journal_mode = WAL;");

// Create a table
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Database and table created");


// =============================================================================
// PART 2: INSERTING DATA
// =============================================================================

// Simple insert with template literal (NOT for production - SQL injection risk!)
// db.run(`INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 30)`);

// Safe insert with prepared statements (ALWAYS use this!)
const insertUser = db.prepare(`
    INSERT INTO users (name, email, age) VALUES (?, ?, ?)
`);

// Run once
insertUser.run("Alice", "alice@example.com", 30);
insertUser.run("Bob", "bob@example.com", 25);

// Batch insert (much faster!)
const insertMany = db.prepare(`
    INSERT INTO users (name, email, age) VALUES (?, ?, ?)
`);

const users = [
    ["Charlie", "charlie@example.com", 35],
    ["Diana", "diana@example.com", 28],
    ["Eve", "eve@example.com", 32]
];

// Transaction for batch inserts
db.transaction(() => {
    for (const user of users) {
        insertMany.run(user[0], user[1], user[2]);
    }
})();

console.log("Users inserted");


// =============================================================================
// PART 3: QUERYING DATA
// =============================================================================

// Query all users
const allUsers = db.query("SELECT * FROM users").all();
console.log("\nAll users:");
console.log(allUsers);

// Query with parameters
const getUserByEmail = db.prepare("SELECT * FROM users WHERE email = ?");
const user = getUserByEmail.get("alice@example.com") as {
    id: number;
    name: string;
    email: string;
    age: number;
    created_at: string;
};
console.log("\nFound user:", user);

// Query with multiple results
const getUsersOverAge = db.prepare("SELECT * FROM users WHERE age > ?");
const olderUsers = getUsersOverAge.all(28) as typeof allUsers;
console.log("\nUsers over 28:", olderUsers.map(u => `${u.name} (${u.age})`));

// Get single value
const count = db.query("SELECT COUNT(*) as count FROM users").get() as { count: number };
console.log("\nTotal users:", count.count);


// =============================================================================
// PART 4: UPDATING AND DELETING
// =============================================================================

// Update
const updateUser = db.prepare(`
    UPDATE users SET age = ? WHERE email = ?
`);
const updateResult = updateUser.run(31, "alice@example.com");
console.log("\nUpdated rows:", updateResult.changes);

// Delete
const deleteUser = db.prepare("DELETE FROM users WHERE email = ?");
const deleteResult = deleteUser.run("eve@example.com");
console.log("Deleted rows:", deleteResult.changes);

// Check remaining users
const remaining = db.query("SELECT name FROM users").all() as { name: string }[];
console.log("Remaining users:", remaining.map(u => u.name));


// =============================================================================
// TYPE SAFETY WITH SQLITE
// =============================================================================

// Define TypeScript interfaces for your tables
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    created_at: string;
}

interface CreateUserInput {
    name: string;
    email: string;
    age: number;
}

// Type-safe repository pattern
class UserRepository {
    private db: Database;
    private insertStmt;
    private selectByIdStmt;
    private selectAllStmt;
    private updateStmt;
    private deleteStmt;

    constructor(db: Database) {
        this.db = db;
        this.insertStmt = db.prepare(`
            INSERT INTO users (name, email, age) VALUES (?, ?, ?)
            RETURNING *
        `);
        this.selectByIdStmt = db.prepare("SELECT * FROM users WHERE id = ?");
        this.selectAllStmt = db.prepare("SELECT * FROM users ORDER BY created_at DESC");
        this.updateStmt = db.prepare(`
            UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?
            RETURNING *
        `);
        this.deleteStmt = db.prepare("DELETE FROM users WHERE id = ?");
    }

    create(input: CreateUserInput): User {
        return this.insertStmt.get(input.name, input.email, input.age) as User;
    }

    findById(id: number): User | null {
        return this.selectByIdStmt.get(id) as User | null;
    }

    findAll(): User[] {
        return this.selectAllStmt.all() as User[];
    }

    update(id: number, input: Partial<CreateUserInput>): User | null {
        const existing = this.findById(id);
        if (!existing) return null;

        return this.updateStmt.get(
            input.name ?? existing.name,
            input.email ?? existing.email,
            input.age ?? existing.age,
            id
        ) as User;
    }

    delete(id: number): boolean {
        const result = this.deleteStmt.run(id);
        return result.changes > 0;
    }
}

// Usage
const userRepo = new UserRepository(db);

console.log("\n--- Repository Pattern Demo ---");
const newUser = userRepo.create({
    name: "Frank",
    email: "frank@example.com",
    age: 40
});
console.log("Created user:", newUser);

const found = userRepo.findById(newUser.id);
console.log("Found by ID:", found);


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a "posts" table with: id, title, content, user_id (foreign key),
// created_at. Insert some posts and query them with a JOIN to get user names.

// TODO 2: Write a function that takes a user ID and returns all their posts
// along with the user info in a single query using JOIN.

// TODO 3: Create an index on the posts.user_id column and explain why it helps
// with query performance.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: URL Shortener with SQLite
 *
 * Build a complete URL shortening service:
 *
 * 1. Database schema:
 *    - urls: id (INTEGER PK), code (TEXT UNIQUE), url (TEXT), clicks (INTEGER), created_at
 *    - url_logs: id, url_id, ip_address, accessed_at (for analytics)
 *
 * 2. Repository class with methods:
 *    - createShortUrl(originalUrl: string, customCode?: string): Promise<{ code: string }>
 *      * Generate random 6-char code if customCode not provided (base62: a-zA-Z0-9)
 *      * Check for collisions
 *    - getOriginalUrl(code: string): Promise<string | null>
 *      * Increment click count
 *      * Log access
 *    - getUrlStats(code: string): Promise<{ url: string; clicks: number; recentAccesses: Date[] }>
 *    - deleteUrl(code: string): Promise<boolean>
 *
 * 3. Bun.serve integration (commented out, just show the setup)
 *    - POST /api/shorten - Create short URL
 *    - GET /:code - Redirect to original URL
 *    - GET /api/stats/:code - Get URL statistics
 *
 * 4. Helper method to generate random codes
 */

export class UrlShortenerRepository {
    private db: Database;
    private insertUrlStmt;
    private getUrlStmt;
    private incrementClicksStmt;
    private logAccessStmt;
    private getStatsStmt;
    private deleteStmt;

    constructor(dbPath: string = ":memory:") {
        this.db = new Database(dbPath);
        this.initSchema();
        this.initStatements();
    }

    private initSchema(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS urls (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT UNIQUE NOT NULL,
                url TEXT NOT NULL,
                clicks INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS url_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url_id INTEGER NOT NULL,
                ip_address TEXT,
                accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (url_id) REFERENCES urls(id)
            )
        `);
    }

    private initStatements(): void {
        // TODO: Prepare statements for CRUD operations
        this.insertUrlStmt = this.db.prepare(`
            INSERT INTO urls (code, url) VALUES (?, ?)
            ON CONFLICT(code) DO UPDATE SET url = excluded.url
            RETURNING *
        `);

        this.getUrlStmt = this.db.prepare("SELECT * FROM urls WHERE code = ?");
        this.incrementClicksStmt = this.db.prepare(`
            UPDATE urls SET clicks = clicks + 1 WHERE code = ?
        `);
        this.logAccessStmt = this.db.prepare(`
            INSERT INTO url_logs (url_id, ip_address) VALUES (?, ?)
        `);
        this.getStatsStmt = this.db.prepare(`
            SELECT u.*, COUNT(l.id) as total_accesses,
                   MAX(l.accessed_at) as last_accessed
            FROM urls u
            LEFT JOIN url_logs l ON u.id = l.url_id
            WHERE u.code = ?
            GROUP BY u.id
        `);
        this.deleteStmt = this.db.prepare("DELETE FROM urls WHERE code = ?");
    }

    private generateCode(length: number = 6): string {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async createShortUrl(originalUrl: string, customCode?: string): Promise<{ code: string }> {
        // TODO: Implement URL shortening logic
        // 1. Validate URL format
        // 2. Use custom code or generate random one
        // 3. Handle collisions for random codes
        // 4. Insert and return code

        const code = customCode || this.generateCode();

        try {
            this.insertUrlStmt.get(code, originalUrl);
            return { code };
        } catch (error) {
            if (!customCode) {
                // Retry with new code on collision
                return this.createShortUrl(originalUrl);
            }
            throw new Error("Code already exists");
        }
    }

    async getOriginalUrl(code: string, ipAddress?: string): Promise<string | null> {
        // TODO: Implement URL retrieval with click tracking
        // 1. Get URL by code
        // 2. Increment click count
        // 3. Log access if ipAddress provided
        // 4. Return original URL

        const url = this.getUrlStmt.get(code) as { id: number; url: string } | undefined;
        if (!url) return null;

        this.incrementClicksStmt.run(code);
        if (ipAddress) {
            this.logAccessStmt.run(url.id, ipAddress);
        }

        return url.url;
    }

    async getUrlStats(code: string): Promise<{
        url: string;
        clicks: number;
        recentAccesses: Date[];
    } | null> {
        // TODO: Return URL statistics
        return null;
    }

    async deleteUrl(code: string): Promise<boolean> {
        // TODO: Delete URL and return success status
        const result = this.deleteStmt.run(code);
        return result.changes > 0;
    }

    close(): void {
        this.db.close();
    }
}

export async function runChallenge() {
    const shortener = new UrlShortenerRepository(":memory:");

    console.log("=== URL Shortener Demo ===\n");

    // Create short URLs
    const url1 = await shortener.createShortUrl("https://example.com/very/long/path");
    console.log("Created short URL:", url1.code);

    const url2 = await shortener.createShortUrl("https://google.com", "goog");
    console.log("Created custom URL:", url2.code);

    // Access URL (simulating redirects)
    const original1 = await shortener.getOriginalUrl(url1.code, "192.168.1.1");
    console.log("\nOriginal URL:", original1);

    const original2 = await shortener.getOriginalUrl(url1.code, "192.168.1.2");
    console.log("Accessed again:", original2);

    // Try invalid code
    const invalid = await shortener.getOriginalUrl("invalid");
    console.log("Invalid code result:", invalid);

    shortener.close();
}

// Uncomment to test:
// runChallenge().catch(console.error);

// Cleanup
db.close();

// Run: bun run curriculum/stage-08-bun-features/02-bun-sqlite/lesson.ts
