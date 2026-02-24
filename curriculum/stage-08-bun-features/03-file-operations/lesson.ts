/**
 * =============================================================================
 * LESSON 03: FILE OPERATIONS
 * =============================================================================
 *
 * Bun provides fast, type-safe APIs for file system operations.
 * Bun.file() and Bun.write() are significantly faster than Node's fs module.
 *
 * Run this file: bun run curriculum/stage-08-bun-features/03-file-operations/lesson.ts
 */

// =============================================================================
// PART 1: BUN.FILE() - READING FILES
// =============================================================================

import { file } from "bun";

// Bun.file() returns a BunFile object - lazy, doesn't read until needed
const myFile = Bun.file("/tmp/test.txt");

// Check if file exists
const exists = await myFile.exists();
console.log("File exists:", exists);

// Create test file for demo
await Bun.write("/tmp/demo.txt", "Hello from Bun!");

// Reading file content
const demoFile = Bun.file("/tmp/demo.txt");

// As text
const text = await demoFile.text();
console.log("File content:", text);

// As JSON (automatically parses!)
await Bun.write("/tmp/data.json", JSON.stringify({ name: "Alice", age: 30 }));
const jsonFile = Bun.file("/tmp/data.json");
const data = await jsonFile.json();
console.log("JSON data:", data);

// As ArrayBuffer (binary data)
const buffer = await demoFile.arrayBuffer();
console.log("ArrayBuffer size:", buffer.byteLength);

// Note: BunFile doesn't have blob() method - use arrayBuffer or stream instead
// To create a Blob from file content:
const fileContent = await demoFile.arrayBuffer();
const blob = new Blob([fileContent], { type: demoFile.type });
console.log("Blob type:", blob.type, "size:", blob.size);

// Stream reading (memory efficient for large files)
const stream = demoFile.stream();
for await (const chunk of stream) {
    console.log("Stream chunk:", new TextDecoder().decode(chunk));
}


// =============================================================================
// PART 2: BUN.WRITE() - WRITING FILES
// =============================================================================

// Bun.write() is the universal write API

// Write string
await Bun.write("/tmp/message.txt", "Hello World!");

// Write JSON (automatically stringifies!)
const user = { id: 1, name: "Bob", hobbies: ["coding", "gaming"] };
await Bun.write("/tmp/user.json", user);

// Write from Response
const response = new Response("Response body content");
await Bun.write("/tmp/response.txt", response);

// Write from Blob
const blob2 = new Blob(["Blob content"], { type: "text/plain" });
await Bun.write("/tmp/blob.txt", blob2);

// Write from ArrayBuffer
const encoder = new TextEncoder();
const encoded = encoder.encode("ArrayBuffer content");
await Bun.write("/tmp/buffer.txt", encoded);

// Write binary data (Uint8Array)
const binary = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
await Bun.write("/tmp/binary.bin", binary);

console.log("All files written successfully!");


// =============================================================================
// PART 3: FILE METADATA
// =============================================================================

const statsFile = Bun.file("/tmp/demo.txt");

// File metadata (returns a File, compatible with Web API)
console.log("\nFile metadata:");
console.log("- Name:", statsFile.name);
console.log("- Size:", statsFile.size, "bytes");
console.log("- Type:", statsFile.type);
console.log("- Last modified:", new Date(statsFile.lastModified));

// Check if file is readable
const isReadable = statsFile.stream !== undefined;
console.log("- Is readable:", isReadable);


// =============================================================================
// PART 4: GLOB - FINDING FILES
// =============================================================================

// Bun supports glob patterns for finding files
import { Glob } from "bun";

// Create some test files
await Bun.write("/tmp/test1.log", "log 1");
await Bun.write("/tmp/test2.log", "log 2");
await Bun.write("/tmp/app.log", "app log");
await Bun.write("/tmp/data.txt", "data");

// Find all .log files
const glob = new Glob("*.log");
console.log("\nLog files in /tmp:");
for await (const file of glob.scan("/tmp")) {
    console.log(" -", file);
}

// Find all files
const allFiles = new Glob("*");
console.log("\nAll files in /tmp:");
const files = [];
for await (const f of allFiles.scan("/tmp")) {
    files.push(f);
}
console.log("Found", files.length, "files");


// =============================================================================
// PART 5: FILE UTILITIES
// =============================================================================

// Reading directory
import { readdir, stat, mkdir, rmdir, unlink } from "fs/promises";

async function listDirectory(path: string): Promise<void> {
    try {
        const entries = await readdir(path, { withFileTypes: true });
        console.log(`\nContents of ${path}:`);
        for (const entry of entries) {
            const type = entry.isDirectory() ? "[DIR]" : "[FILE]";
            console.log(` ${type} ${entry.name}`);
        }
    } catch (error) {
        console.error(`Error reading ${path}:`, error);
    }
}

await listDirectory("/tmp");

// Copying files (using Bun APIs)
async function copyFile(source: string, dest: string): Promise<void> {
    const content = await Bun.file(source).arrayBuffer();
    await Bun.write(dest, content);
}

await copyFile("/tmp/demo.txt", "/tmp/demo-copy.txt");
console.log("\nFile copied!");


// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a function 'readLines' that reads a file and returns an array
// of lines. Use the .text() method and split by newline.

// TODO 2: Create a function 'appendToFile' that appends content to an existing
// file. Read the existing content first, then write back with new content added.

// TODO 3: Create a function 'mergeJSONFiles' that takes multiple JSON file paths
// and merges them into a single object, writing to an output file.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: File-based Key-Value Store
 *
 * Build a simple database using files:
 *
 * 1. Create a 'FileStore' class that:
 *    - Stores data in JSON files (one per key in a directory)
 *    - Provides methods: set(key, value), get(key), delete(key), has(key), keys()
 *    - Each key maps to a file: {storeDir}/{key}.json
 *
 * 2. Add TTL (time-to-live) support:
 *    - set(key, value, ttlMs?) - optional expiration
 *    - Expired entries return null on get()
 *    - Add cleanup() method to remove expired files
 *
 * 3. Add batch operations:
 *    - mget(keys: string[]): Promise<Map<string, any>>
 *    - mset(entries: Record<string, any>): Promise<void>
 *    - clear(): Remove all files in store directory
 *
 * 4. Add export/import:
 *    - exportToFile(path: string): Write all data as single JSON
 *    - importFromFile(path: string): Load data from exported file
 *
 * 5. Performance: Use Bun.write and Bun.file for all operations
 */

interface StoredValue {
    data: any;
    expiresAt?: number;
}

export class FileStore {
    private dir: string;

    constructor(directory: string = "./store") {
        this.dir = directory;
        this.ensureDirectory();
    }

    private async ensureDirectory(): Promise<void> {
        try {
            await stat(this.dir);
        } catch {
            await mkdir(this.dir, { recursive: true });
        }
    }

    private getFilePath(key: string): string {
        // Sanitize key for filesystem
        const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
        return `${this.dir}/${safeKey}.json`;
    }

    async set(key: string, value: any, ttlMs?: number): Promise<void> {
        // TODO: Implement set with optional TTL
        const stored: StoredValue = {
            data: value,
            expiresAt: ttlMs ? Date.now() + ttlMs : undefined
        };

        const filePath = this.getFilePath(key);
        await Bun.write(filePath, stored);
    }

    async get(key: string): Promise<any | null> {
        // TODO: Implement get with TTL check
        // Return null if expired or not found
        const filePath = this.getFilePath(key);
        const file = Bun.file(filePath);

        if (!(await file.exists())) {
            return null;
        }

        try {
            const stored: StoredValue = await file.json();

            if (stored.expiresAt && Date.now() > stored.expiresAt) {
                await this.delete(key);
                return null;
            }

            return stored.data;
        } catch {
            return null;
        }
    }

    async delete(key: string): Promise<boolean> {
        // TODO: Implement delete
        try {
            const filePath = this.getFilePath(key);
            await unlink(filePath);
            return true;
        } catch {
            return false;
        }
    }

    async has(key: string): Promise<boolean> {
        // TODO: Implement has (check if key exists and not expired)
        const value = await this.get(key);
        return value !== null;
    }

    async keys(): Promise<string[]> {
        // TODO: Return all valid (non-expired) keys
        try {
            const entries = await readdir(this.dir);
            const keys: string[] = [];

            for (const entry of entries) {
                if (entry.endsWith(".json")) {
                    const key = entry.slice(0, -5); // Remove .json
                    if (await this.has(key)) {
                        keys.push(key);
                    }
                }
            }

            return keys;
        } catch {
            return [];
        }
    }

    async mget(keys: string[]): Promise<Map<string, any>> {
        // TODO: Batch get multiple keys
        const results = new Map<string, any>();

        for (const key of keys) {
            const value = await this.get(key);
            if (value !== null) {
                results.set(key, value);
            }
        }

        return results;
    }

    async mset(entries: Record<string, any>): Promise<void> {
        // TODO: Batch set multiple entries
        await Promise.all(
            Object.entries(entries).map(([key, value]) => this.set(key, value))
        );
    }

    async clear(): Promise<void> {
        // TODO: Delete all files in store directory
        try {
            const entries = await readdir(this.dir);
            await Promise.all(
                entries.map(entry => unlink(`${this.dir}/${entry}`))
            );
        } catch {
            // Directory might not exist
        }
    }

    async cleanup(): Promise<number> {
        // TODO: Remove all expired entries, return count removed
        let removed = 0;
        const keys = await this.keys();

        for (const key of keys) {
            const filePath = this.getFilePath(key);
            const file = Bun.file(filePath);

            try {
                const stored: StoredValue = await file.json();
                if (stored.expiresAt && Date.now() > stored.expiresAt) {
                    await this.delete(key);
                    removed++;
                }
            } catch {
                // Skip invalid files
            }
        }

        return removed;
    }

    async exportToFile(path: string): Promise<void> {
        // TODO: Export all data to single JSON file
        const allData: Record<string, any> = {};
        const keys = await this.keys();

        for (const key of keys) {
            const value = await this.get(key);
            if (value !== null) {
                allData[key] = value;
            }
        }

        await Bun.write(path, allData);
    }

    async importFromFile(path: string): Promise<void> {
        // TODO: Import data from exported file
        try {
            const file = Bun.file(path);
            const data: Record<string, any> = await file.json();
            await this.mset(data);
        } catch (error) {
            throw new Error(`Failed to import: ${error}`);
        }
    }
}

export async function runChallenge() {
    const store = new FileStore("/tmp/filestore-demo");
    await store.clear();

    console.log("=== FileStore Demo ===\n");

    // Set some values
    await store.set("user:1", { name: "Alice", age: 30 });
    await store.set("user:2", { name: "Bob", age: 25 }, 1000); // 1 second TTL

    console.log("Set user:1 and user:2 (with TTL)");

    // Get values
    const user1 = await store.get("user:1");
    console.log("Got user:1:", user1);

    // Check keys
    const keys = await store.keys();
    console.log("Keys:", keys);

    // Wait for TTL to expire
    console.log("\nWaiting for TTL...");
    await new Promise(resolve => setTimeout(resolve, 1100));

    const user2AfterTTL = await store.get("user:2");
    console.log("user:2 after TTL:", user2AfterTTL);

    // Cleanup
    const removed = await store.cleanup();
    console.log("Cleaned up entries:", removed);

    // Batch operations
    await store.mset({
        "config:theme": "dark",
        "config:lang": "en",
        "config:region": "US"
    });

    const configs = await store.mget(["config:theme", "config:lang"]);
    console.log("\nBatch get:", Object.fromEntries(configs));

    // Export/Import
    await store.exportToFile("/tmp/store-export.json");
    console.log("\nExported to /tmp/store-export.json");

    const exportContent = await Bun.file("/tmp/store-export.json").text();
    console.log("Export content:", exportContent);

    // Cleanup
    await store.clear();
    console.log("\nStore cleared!");
}

// Uncomment to test:
// runChallenge().catch(console.error);

// Run: bun run curriculum/stage-08-bun-features/03-file-operations/lesson.ts
