/**
 * -----------------------------------------------------------------------------
 * 03 - COMPLEX COLLECTIONS (MAPS & SETS)
 * -----------------------------------------------------------------------------
 * 
 * Native Maps and Sets are powerful, but nesting them requires careful thought.
 * They are better than Objects when keys are dynamic or not strings.
 */

// -----------------------------------------------------------------------------
// SCENARIO 1: The "Group By" Pattern (Map<string, Array>)
// -----------------------------------------------------------------------------
// We want to group users by their Role.
// Key = Role (string), Value = List of Users (Array)

interface User {
    id: number;
    name: string;
    role: "admin" | "editor" | "viewer";
}

const users: User[] = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "viewer" },
    { id: 3, name: "Charlie", role: "admin" },
    { id: 4, name: "Dave", role: "editor" },
];

// The container
const usersByRole = new Map<string, User[]>();

// Populating logic
for (const u of users) {
    // 1. Check if the bucket (array) exists for this role
    if (!usersByRole.has(u.role)) {
        usersByRole.set(u.role, []); // Create empty bucket
    }

    // 2. Get the bucket and push (We use ! because we just set it above)
    usersByRole.get(u.role)!.push(u);
}

console.log("Admins:", usersByRole.get("admin"));


// -----------------------------------------------------------------------------
// SCENARIO 2: Matrix / Grid Logic (Map<number, Map<number, Content>>)
// -----------------------------------------------------------------------------
// Good for sparse usage (like a game board where mostly nothing exists).
// Map 1 Key: X coordinate -> Value: Map 2
// Map 2 Key: Y coordinate -> Value: Tile content

type Grid = Map<number, Map<number, string>>;

const gameBoard: Grid = new Map();

function setTile(x: number, y: number, content: string) {
    // Ensure the X-row exists
    if (!gameBoard.has(x)) {
        gameBoard.set(x, new Map());
    }

    // Set the Y-cell
    gameBoard.get(x)!.set(y, content);
}

function getTile(x: number, y: number): string {
    // Safe navigation with Map: .get()?.get()
    return gameBoard.get(x)?.get(y) ?? "empty";
}

setTile(5, 5, "Treasure Chest");
setTile(10, 2, "Enemy");

console.log("5,5 is:", getTile(5, 5));
console.log("0,0 is:", getTile(0, 0)); // "empty"


// -----------------------------------------------------------------------------
// SCENARIO 3: NESTED SETS (Map<string, Set<string>>)
// -----------------------------------------------------------------------------
// Unique relationships. E.g. "Which tags does a Category have?"
// A category can have many unique tags.

const categoryTags = new Map<string, Set<string>>();

function addTag(category: string, tag: string) {
    if (!categoryTags.has(category)) {
        categoryTags.set(category, new Set());
    }
    categoryTags.get(category)!.add(tag);
}

addTag("Programming", "TypeScript");
addTag("Programming", "JavaScript");
addTag("Programming", "TypeScript"); // Duplicate ignored by Set!

console.log("Programming tags:", categoryTags.get("Programming"));


// -----------------------------------------------------------------------------
// ITERATING NESTED COLLECTIONS
// -----------------------------------------------------------------------------
// "Unpacking" works in loops too!

for (const [category, tagsSet] of categoryTags) {
    console.log(`Category: ${category} has ${tagsSet.size} unique tags.`);
    // Nested loop for the Set
    for (const tag of tagsSet) {
        console.log(` - ${tag}`);
    }
}

// -----------------------------------------------------------------------------
// MINI CHALLENGE: ADVANCED MAPPING
// -----------------------------------------------------------------------------
// Task: Transform this deeply nested array of users into a simple map 
// where Key = User ID, Value = Email.

const userDatabase = [
    {
        group: "Admins",
        members: [
            { id: 1, profile: { contact: { email: "admin@corp.com" } } }
        ]
    },
    {
        group: "Employees",
        members: [
            { id: 2, profile: { contact: { email: "bob@corp.com" } } },
            { id: 3, profile: { contact: { email: "alice@corp.com" } } }
        ]
    }
];

export function createEmailMap(db: typeof userDatabase): Map<number, string> {
    const emailMap = new Map<number, string>();

    // TODO: Loop through groups, then members, and populate values.
    // Use deep destructuring inside the inner loop variable if you dare!

    return emailMap;
}
