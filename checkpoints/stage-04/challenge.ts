/**
 * =============================================================================
 * CHECKPOINT: STAGE 04 - Library Management System
 * =============================================================================
 *
 * This challenge combines: Classes, Inheritance, Abstract Classes, Access Modifiers
 *
 * Run this file: bun run checkpoints/stage-04/challenge.ts
 */

// =============================================================================
// INTERFACES
// =============================================================================

interface ILibraryItem {
    readonly id: string;
    title: string;
    isAvailable: boolean;
    checkout(memberId: string): void;
    returnItem(): void;
}

interface IMember {
    readonly id: string;
    name: string;
    email: string;
    borrowedItems: string[];
    canBorrow(): boolean;
}

// =============================================================================
// ABSTRACT BASE CLASSES
// =============================================================================

/**
 * Abstract base class for all library items
 * Demonstrates: Abstract classes, protected members, readonly properties
 */
abstract class LibraryItem implements ILibraryItem {
    readonly id: string;
    title: string;
    protected _isAvailable: boolean = true;
    protected _currentHolder: string | null = null;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    get isAvailable(): boolean {
        return this._isAvailable;
    }

    abstract get maxLoanDays(): number;
    abstract get lateFeePerDay(): number;

    checkout(memberId: string): void {
        if (!this._isAvailable) {
            throw new Error(`${this.title} is not available for checkout`);
        }
        this._isAvailable = false;
        this._currentHolder = memberId;
    }

    returnItem(): void {
        this._isAvailable = true;
        this._currentHolder = null;
    }

    getCurrentHolder(): string | null {
        return this._currentHolder;
    }
}

/**
 * Abstract base class for library members
 * Demonstrates: Abstract methods, protected access
 */
abstract class MemberBase implements IMember {
    readonly id: string;
    name: string;
    email: string;
    protected _borrowedItems: string[] = [];
    protected _maxItems: number;

    constructor(id: string, name: string, email: string, maxItems: number = 5) {
        this.id = id;
        this.name = name;
        this.email = email;
        this._maxItems = maxItems;
    }

    get borrowedItems(): string[] {
        return [...this._borrowedItems]; // Return copy to prevent external modification
    }

    get maxItems(): number {
        return this._maxItems;
    }

    canBorrow(): boolean {
        return this._borrowedItems.length < this._maxItems;
    }

    borrowItem(itemId: string): void {
        if (!this.canBorrow()) {
            throw new Error(`${this.name} has reached the maximum borrow limit`);
        }
        this._borrowedItems.push(itemId);
    }

    returnItem(itemId: string): void {
        const index = this._borrowedItems.indexOf(itemId);
        if (index > -1) {
            this._borrowedItems.splice(index, 1);
        }
    }
}

// =============================================================================
// CONCRETE CLASSES - LIBRARY ITEMS
// =============================================================================

/**
 * TASK 1: Create Book class
 *
 * Extends LibraryItem with:
 * - author property (public)
 * - isbn property (readonly)
 * - maxLoanDays = 14
 * - lateFeePerDay = 0.25
 */
export class Book extends LibraryItem {
    // TODO: Implement the Book class
    // Add author (string) and isbn (string) properties
    // Set maxLoanDays to 14 and lateFeePerDay to 0.25

    get maxLoanDays(): number {
        return 14;
    }

    get lateFeePerDay(): number {
        return 0.25;
    }
}

/**
 * TASK 2: Create DVD class
 *
 * Extends LibraryItem with:
 * - director property (public)
 * - durationMinutes property (public)
 * - maxLoanDays = 7
 * - lateFeePerDay = 1.00
 */
export class DVD extends LibraryItem {
    // TODO: Implement the DVD class
    // Add director (string) and durationMinutes (number) properties
    // Set maxLoanDays to 7 and lateFeePerDay to 1.00

    get maxLoanDays(): number {
        return 7;
    }

    get lateFeePerDay(): number {
        return 1.0;
    }
}

/**
 * TASK 3: Create Magazine class
 *
 * Extends LibraryItem with:
 * - issueNumber property (public)
 * - publisher property (public)
 * - maxLoanDays = 7
 * - lateFeePerDay = 0.50
 * - Magazines cannot be renewed (add a canRenew property set to false)
 */
export class Magazine extends LibraryItem {
    // TODO: Implement the Magazine class
    // Add issueNumber (number) and publisher (string) properties
    // Add canRenew (boolean, readonly) set to false
    // Set maxLoanDays to 7 and lateFeePerDay to 0.50

    get maxLoanDays(): number {
        return 7;
    }

    get lateFeePerDay(): number {
        return 0.50;
    }
}

// =============================================================================
// CONCRETE CLASSES - MEMBERS
// =============================================================================

/**
 * TASK 4: Create RegularMember class
 *
 * Extends MemberBase with:
 * - maxItems = 5 (default)
 * - membershipDate property (public, Date)
 */
export class RegularMember extends MemberBase {
    // TODO: Implement the RegularMember class
    // Add membershipDate (Date) property
    // Use default maxItems of 5

    constructor(id: string, name: string, email: string, membershipDate: Date = new Date()) {
        super(id, name, email, 5);
        // TODO: Set membershipDate
    }
}

/**
 * TASK 5: Create PremiumMember class
 *
 * Extends MemberBase with:
 * - maxItems = 10
 * - canAccessDigitalLibrary property (public, boolean)
 * - Override canBorrow to always return true (premium members have no limits)
 */
export class PremiumMember extends MemberBase {
    // TODO: Implement the PremiumMember class
    // Add canAccessDigitalLibrary (boolean) property
    // Set maxItems to 10
    // Override canBorrow() to always return true

    constructor(
        id: string,
        name: string,
        email: string,
        public canAccessDigitalLibrary: boolean = true
    ) {
        super(id, name, email, 10);
    }
}

/**
 * TASK 6: Create StaffMember class
 *
 * Extends MemberBase with:
 * - maxItems = 20
 * - department property (public)
 * - staffId property (readonly)
 */
export class StaffMember extends MemberBase {
    // TODO: Implement the StaffMember class
    // Add department (string) property
    // Add staffId (string, readonly) property
    // Set maxItems to 20
}

// =============================================================================
// LIBRARY SERVICE CLASS
// =============================================================================

/**
 * TASK 7: Create Library class
 *
 * The main service that manages items and members
 *
 * Properties:
 * - private items: Map<string, LibraryItem>
 * - private members: Map<string, IMember>
 *
 * Methods to implement:
 * - addItem(item: LibraryItem): void
 * - removeItem(id: string): boolean
 * - getItem(id: string): LibraryItem | undefined
 * - registerMember(member: IMember): void
 * - getMember(id: string): IMember | undefined
 * - checkoutItem(itemId: string, memberId: string): void
 * - returnItem(itemId: string): void
 * - getAvailableItems(): LibraryItem[]
 * - getItemsByType<T extends LibraryItem>(type: new (...args: any[]) => T): T[]
 */
export class Library {
    // TODO: Implement the Library class
    // Use Map<string, LibraryItem> for items
    // Use Map<string, IMember> for members
    // Implement all the methods listed above

    constructor(public name: string) {
        // Initialize maps
    }

    addItem(item: LibraryItem): void {
        // TODO
    }

    removeItem(id: string): boolean {
        // TODO
        return false;
    }

    getItem(id: string): LibraryItem | undefined {
        // TODO
        return undefined;
    }

    registerMember(member: IMember): void {
        // TODO
    }

    getMember(id: string): IMember | undefined {
        // TODO
        return undefined;
    }

    checkoutItem(itemId: string, memberId: string): void {
        // TODO:
        // 1. Get item and member
        // 2. Check if both exist
        // 3. Check if member can borrow
        // 4. Checkout item
        // 5. Add item to member's borrowed list
    }

    returnItem(itemId: string): void {
        // TODO:
        // 1. Get item
        // 2. Get current holder (member)
        // 3. Return the item
        // 4. Remove from member's borrowed list
    }

    getAvailableItems(): LibraryItem[] {
        // TODO: Return all items where isAvailable is true
        return [];
    }

    // This method uses generics to filter items by type
    getItemsByType<T extends LibraryItem>(type: new (...args: any[]) => T): T[] {
        // TODO: Return all items that are instances of the given type
        return [];
    }
}

// =============================================================================
// BONUS: GENERIC REPOSITORY
// =============================================================================

/**
 * BONUS TASK: Create a generic Repository class
 *
 * A reusable class for managing any type of entity with an id
 *
 * @typeParam T - The entity type (must have an id property)
 */
export class Repository<T extends { id: string }> {
    // TODO: Implement a generic repository
    // Methods: add, remove, get, getAll, find(predicate), update(id, updates)

    private items: Map<string, T> = new Map();

    add(item: T): void {
        // TODO
    }

    remove(id: string): boolean {
        // TODO
        return false;
    }

    get(id: string): T | undefined {
        // TODO
        return undefined;
    }

    getAll(): T[] {
        // TODO
        return [];
    }

    find(predicate: (item: T) => boolean): T[] {
        // TODO
        return [];
    }

    update(id: string, updates: Partial<Omit<T, 'id'>>): T | undefined {
        // TODO: Update item with given id using spread operator
        return undefined;
    }
}

// =============================================================================
// TEST YOUR SOLUTION
// =============================================================================

function runTests() {
    console.log("=".repeat(60));
    console.log("LIBRARY MANAGEMENT SYSTEM - TESTS");
    console.log("=".repeat(60));

    // Create library
    const library = new Library("City Central Library");
    console.log(`\n📚 Library: ${library.name}`);

    // Create items
    const book = new Book("B001", "TypeScript Handbook", "author-123", "isbn-456");
    const dvd = new DVD("D001", "Inception", "director-789", 148);
    const magazine = new Magazine("M001", "Tech Weekly", 42, "Tech Publisher");

    console.log("\n📖 Created items:");
    console.log(`   Book: ${book.title} by ${book.author}`);
    console.log(`   DVD: ${dvd.title} directed by ${dvd.director}`);
    console.log(`   Magazine: ${magazine.title} #${magazine.issueNumber}`);

    // Add items to library
    library.addItem(book);
    library.addItem(dvd);
    library.addItem(magazine);

    console.log(`\n✅ Items added to library`);

    // Create members
    const regular = new RegularMember("M001", "John Doe", "john@email.com");
    const premium = new PremiumMember("M002", "Jane Smith", "jane@email.com", true);

    console.log("\n👤 Created members:");
    console.log(`   Regular: ${regular.name} (max: ${regular.maxItems})`);
    console.log(`   Premium: ${premium.name} (max: ${premium.maxItems})`);

    // Register members
    library.registerMember(regular);
    library.registerMember(premium);

    // Test checkout
    console.log("\n" + "-".repeat(60));
    console.log("\n🔄 Testing checkout...");
    library.checkoutItem("B001", "M001");
    console.log(`   Book checked out by ${regular.name}`);
    console.log(`   Available: ${book.isAvailable}`);

    // Test return
    console.log("\n🔄 Testing return...");
    library.returnItem("B001");
    console.log(`   Book returned`);
    console.log(`   Available: ${book.isAvailable}`);

    // Test available items
    console.log("\n📋 Available items:");
    const available = library.getAvailableItems();
    console.log(`   Count: ${available.length}`);

    // Test filter by type
    console.log("\n📚 Books only:");
    const books = library.getItemsByType(Book);
    console.log(`   Count: ${books.length}`);

    console.log("\n" + "=".repeat(60));
    console.log("Complete the TODOs to make all tests pass!");
    console.log("=".repeat(60));
}

// Run tests
runTests();
