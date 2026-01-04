/**
 * -----------------------------------------------------------------------------
 * 04 - CLASSES
 * -----------------------------------------------------------------------------
 * 
 * TS classes add visibility modifiers (public, private, protected) 
 * and better constructor syntax.
 */

// -----------------------------------------------------------------------------
// PART 1: VISIBILITY MODIFIERS
// -----------------------------------------------------------------------------

class BankAccount {
    public owner: string;           // Accessible everywhere
    private balance: number;        // Accessible ONLY inside this class
    protected accountType: string;  // Accessible in this class AND children

    constructor(owner: string, balance: number) {
        this.owner = owner;
        this.balance = balance;
        this.accountType = "Generic";
    }

    public getBalance(): number {
        return this.balance;
    }

    // A private method
    private logTransaction() {
        console.log("Logged");
    }
}

// -----------------------------------------------------------------------------
// PART 2: PARAMETER PROPERTIES (Shortcut)
// -----------------------------------------------------------------------------
// Instead of declaring properties and setting them in constructor, 
// do it all in the constructor arguments!

class User {
    // This automatically creates 'this.name' and 'this.email'
    constructor(
        public name: string,
        private email: string
    ) { }
}


// -----------------------------------------------------------------------------
// PART 3: INHERITANCE
// -----------------------------------------------------------------------------

class SavingsAccount extends BankAccount {
    constructor(owner: string, initialBalance: number) {
        super(owner, initialBalance);
        this.accountType = "Savings";
        // this.balance; // Error! 'balance' is private in parent
    }
}


// -----------------------------------------------------------------------------
// MINI CHALLENGE
// -----------------------------------------------------------------------------
// 1. Create a class 'Animal' with a protected property 'stamina' (number).
// 2. Create a subclass 'Dog'.
// 3. Add a method 'bark' to Dog that decreases stamina by 1.

export function runChallenge() {
    // TODO: Write classes here
}
