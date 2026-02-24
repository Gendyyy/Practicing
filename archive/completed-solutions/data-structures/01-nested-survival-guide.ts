/**
 * -----------------------------------------------------------------------------
 * 01 - NESTED DATA SURVIVAL GUIDE
 * -----------------------------------------------------------------------------
 * 
 * DESIGN PHILOSOPHY:
 * When structures get deep, the biggest enemy is losing track of types.
 * We must use Interfaces rigidly to keep our sanity.
 */

// -----------------------------------------------------------------------------
// PART 1: The "Chaotic Response" Scenario
// -----------------------------------------------------------------------------
// Imagine an API response that gives you a company hierarchy.
// It mixes Arrays, Objects, and optional fields.
type geo = { lat: number; lng: number };
export interface Employee {
    id: number;
    name: string;
    skills: string[]; // Simple array nesting
    contact: {
        email: string;
        phone?: string; // Optional nested field
        address: {
            city: string;
            geo: geo;
        };
    };
}

export interface Department {
    deptId: string;
    head: Employee; // Object nesting
    staff: Employee[]; // Array of Objects nesting
    metadata?: {
        budget: number;
        lastAudit: Date;
    };
}

export interface Company {
    name: string;
    departments: Department[];
}

// -----------------------------------------------------------------------------
// DATA SAMPLE
// -----------------------------------------------------------------------------

const techCorp: Company = {
    name: "TechNova",
    departments: [
        {
            deptId: "ENG-01",
            head: {
                id: 1,
                name: "Alice",
                skills: ["Leadership", "Rust", "Go"],
                contact: {
                    email: "alice@technova.com",
                    address: {
                        city: "Seattle",
                        geo: { lat: 47.6, lng: -122.3 }
                    }
                }
            },
            staff: [
                {
                    id: 2,
                    name: "Bob",
                    skills: ["TypeScript", "React"],
                    contact: {
                        email: "bob@technova.com",
                        address: {
                            city: "Austin",
                            geo: { lat: 30.2, lng: -97.7 }
                        }
                    }
                }
            ]
        }
    ]
};

// -----------------------------------------------------------------------------
// ACCESS PATTERNS
// -----------------------------------------------------------------------------

// BAD WAY (Risk of crash if 'departments[0]' doesn't exist):
// const city = techCorp.departments[0].head.contact.address.city; 

// GOOD WAY (Optional Chaining ?. ):
// This gracefully returns undefined if any link in the chain is broken.
console.log("Head City:", techCorp.departments?.[0]?.head?.contact?.address?.city);


// -----------------------------------------------------------------------------
// PRACTICE 1: DRILLING DOWN
// -----------------------------------------------------------------------------

function getGeoLocation(company: Company, deptIndex: number, staffIndex: number): geo | null | undefined {
    // We want the lat/lng of a specific staff member.
    // Notice how we protect every step.
    const dept = company.departments[deptIndex];
    if (!dept) return null;

    const person = dept.staff[staffIndex];
    if (!person) return null;

    return person.contact?.address?.geo;
}

console.log("Bob's Location:", getGeoLocation(techCorp, 0, 0));


// -----------------------------------------------------------------------------
// PRACTICE 2: FLAT MAPPING (The "Un-nesting" Strategy)
// -----------------------------------------------------------------------------
// Sometimes data is TOO nested. We want to flatten it to work with it easier.
// Let's get a simple list of ALL emails in the company, from heads and staff.

function getAllEmails(company: Company): string[] {
    const emails: string[] = [];

    for (const dept of company.departments) {
        // Push Head's email
        emails.push(dept.head.contact.email);

        // Push Staff emails
        // map returns array of emails, spread (...) spreads them into our list
        emails.push(...dept.staff.map(s => s.contact.email));
    }

    return emails;
}

console.log("All Emails:", getAllEmails(techCorp));


// -----------------------------------------------------------------------------
// MINI CHALLENGE: DEEP CONFIG
// -----------------------------------------------------------------------------
// 1. Define the Interfaces (Book, Shelf, Section, Library) for the object below.
// 2. Write the function 'findBookIndices' to safely traverse it.

const libraryData: Library = {
    name: "City Library",
    sections: [
        {
            name: "Fiction",
            shelves: [
                { id: "A1", books: [{ title: "The Hobbit", author: "Tolkien" }] },
                { id: "A2", books: [] }
            ]
        },
        {
            name: "Science",
            // shelves might be undefined or empty in real life
            shelves: []
        }
    ]
};

// TODO: YOUR CODE HERE
// interface Book ...
interface Book {
    title: string;
    author: string;
}
// interface Shelf ...
interface Shelf {
    id: string;
    books?: Book[];

}
// interface Section ...
interface Section {
    name: string;
    shelves: Shelf[];
}
interface Library {
    name: string;
    sections: Section[];
}
export function findBookLocation(lib: Library, title: string) {
    // Return a string like "Fiction > A1" if found, or "Not Found"
    for (const section of lib.sections) {
        for (const shelf of section.shelves) {
            if (shelf.books) {
                for (const book of shelf.books) {
                    if(book.title === title){
                        return `${section.name} > ${shelf.id}`
                    }
                }
            }
        }
    }
    // Hint: Use nested for..of loops
}

console.log(findBookLocation(libraryData, "The Hobbit"))
