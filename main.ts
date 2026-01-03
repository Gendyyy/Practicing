// ============================================
// TYPESCRIPT PRACTICAL EXERCISES
// Start here for hands-on learning!
// ============================================

// ============================================
// EXERCISE 1: Types & Variables
// ============================================
console.log("\n📚 EXERCISE 1: Types & Variables\n");

// TODO: Fix the type errors below
// Uncomment each line and fix the issue

// 1a. Fix this type mismatch
let myNumber: number = 42;

// 1b. Add correct type annotation
let myName: string = "Ahmed";

// 1c. Create an array of numbers
let scores: number[] = [85, 90, 78, 92];

// 1d. Create a tuple for a book [title, pages, published]
let book: [string, number, number] = ["TypeScript Guide", 350, 2023];

console.log("✅ Complete Exercise 1 by uncommenting and fixing the code above!\n");

// ============================================
// EXERCISE 2: Interfaces & Objects
// ============================================
console.log("\n📚 EXERCISE 2: Interfaces & Objects\n");

// TODO: Create an interface for a Student
// Requirements:
// - name: string
// - age: number
// - grades: array of numbers
// - gpa: optional number
// - id: readonly number

interface Student {
  // Your code here
  name: string;
  age: number;
  grades: number[];
  gpa?: number;
  readonly id: number;
}

// TODO: Create a student object using the interface
// const student1: Student = {
const student1: Student = {
  name: "Ahmed",
  age: 25,
  grades: [85, 90, 78, 92],
  gpa: 3.8,
  id: 12345,
};
console.log(student1);
console.log("✅ Create a Student interface and a student object!\n");

// ============================================
// EXERCISE 3: Functions
// ============================================
console.log("\n📚 EXERCISE 3: Functions\n");

// TODO: Implement these functions

// 3a. A function that adds two numbers
function add(a: number, b: number): number {
  return a + b;
}

// 3b. A function that greets a person (with optional title)
function greet(name: string, title?: string): string {
  return title ? `hello ${title} ${name}` : `hello ${name}`;
}

console.log(greet("Ahmed"));
console.log(greet("Ahmed", "Dr."));

// 3c. A function that finds the maximum number in an array
function findMax(numbers: number[]): number {
  return Math.max(...numbers);
}

console.log(`Max of [1, 5, 3, 9, 2] is ${findMax([1, 5, 3, 9, 2])}`);

// 3d. Arrow function that doubles a number
const double = (n: number): number => {
  return n * 2;
};

console.log(double(7));

// Test your functions
// console.log("5 + 3 =", add(5, 3));
// console.log(greet("Ahmed"));
// console.log(greet("Ahmed", "Dr."));
// console.log("Max of [1, 5, 3, 9, 2] =", findMax([1, 5, 3, 9, 2]));
// console.log("Double 7 =", double(7));

console.log("✅ Implement all functions above!\n");

// ============================================
// EXERCISE 4: Classes & Inheritance
// ============================================
console.log("\n📚 EXERCISE 4: Classes & Inheritance\n");

// TODO: Create a Vehicle class
// Properties: brand (string), year (number)
// Methods: start(), stop()
// Add a getter for info
class Vehicle {
  brand: string;
  year: number;
  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }
  start(): void {
  }
  stop(): void {
  }
  get info(): string {
    return `Vehicle: ${this.brand} ${this.year}`;
  }
}
// TODO: Create a Car class that extends Vehicle
// Additional properties: model (string), fuelType (string)
// Override start() to include engine info
// Add method: honk()
class Car extends Vehicle {
  model: string;
  fuelType: string;
  constructor(brand: string, year: number, model: string, fuelType: string) {
    super(brand, year);
    this.model = model;
    this.fuelType = fuelType;
  }
  override start(): void {
    console.log(`Car started: ${this.brand} ${this.model}`);
  }
  override stop(): void {
    console.log(`Car stopped: ${this.brand} ${this.model}`);
  }
  honk(): void {
    console.log(`Car honked: ${this.brand} ${this.model}`);
  }
}

console.log("✅ Create Vehicle and Car classes!\n");

// ============================================
// EXERCISE 5: Generics
// ============================================
console.log("\n📚 EXERCISE 5: Generics\n");

// TODO: Implement a generic Stack class
// Requirements:
// - private items: T[] (array)
// - push(item: T): void
// - pop(): T | undefined
// - peek(): T | undefined
// - isEmpty(): boolean
// - size(): number
class Stack<T> {
  private items: T[] = [];
  push(item: T) {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  size(): number {
    return this.items.length
  }
}
// Example usage:
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.peek()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"

console.log("✅ Implement the generic Stack class!\n");

// ============================================
// EXERCISE 6: Utility Types
// ============================================
console.log("\n📚 EXERCISE 6: Utility Types\n");

// Given this interface
interface UserProfile {
  id: number;
  username: string;
  email: string;
  age: number;
  bio?: string;
  avatar?: string;
}

// TODO: Use utility types to create:

// 6a. A type that makes all properties optional
type UserProfileUpdate = Partial<UserProfile>

// 6b. A type with only id, username, and email
type BasicProfile = Pick<UserProfile, "id" | "username" | "email">

// 6c. A type that excludes bio and avatar
type ProfileSummary = Omit<UserProfile, "bio" | "avatar">

// 6d. A type that makes all properties readonly
type ReadonlyProfile = Readonly<UserProfile>

type RequiredProfile = Required<UserProfile>

console.log("✅ Create the utility types above!\n");

// ============================================
// EXERCISE 7: Type Guards & Discriminated Unions
// ============================================
console.log("\n📚 EXERCISE 7: Type Guards & Discriminated Unions\n");

// TODO: Create a system for different payment methods
// - CreditCard: kind: "credit", number: string, expiry: string
type CreditCard = {
  kind: "credit";
  number: string;
  expiry: string;
}
// - PayPal: kind: "paypal", email: string
type PayPal = {
  kind: "paypal";
  email: string;
}
// - BankTransfer: kind: "bank", accountNumber: string, routingNumber: string
type BankTransfer = {
  kind: "bank";
  accountNumber: string;
  routingNumber: string;
}
type Payment = CreditCard | PayPal | BankTransfer;

// TODO: Create a function processPayment(payment: Payment) that:
// - Returns "Processing credit card payment..." for CreditCard
function processPayment(payment: Payment): string {
  switch (payment.kind) {
    case "credit": return `processing credit card payment`;
    case "bank": return `processing bank payment`;
    case "paypal": return `processing paypal payment`;
    default: return ""
  }
}

console.log(processPayment({ kind: "credit", number: "123", expiry: "12/25" }))
console.log(processPayment({ kind: "paypal", email: "123" }))
console.log(processPayment({ kind: "bank", accountNumber: "123", routingNumber: "12/25" }))
// - Returns "Processing PayPal payment..." for PayPal
// - Returns "Processing bank transfer..." for BankTransfer

console.log("✅ Implement the payment processing system!\n");

// ============================================
// EXERCISE 8: Real-World Application
// ============================================
console.log("\n📚 EXERCISE 8: Real-World Application\n");

// TODO: Build a simple task management system
// Requirements:
// 1. Create a Task interface (id, title, completed, priority, dueDate?)
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
  dueDate?: Date;
}
// 2. Create a TaskManager class with:
//    - addTask(task: Task): void
//    - completeTask(id: number): void
//    - getTasksByPriority(priority: string): Task[]
//    - getPendingTasks(): Task[]
//    - getCompletedTasks(): Task[]
class TaskManager {
  private tasks: Task[] = [];

  addTask(task: Task): void {
    this.tasks.push(task)
    if (task) {
      task.completed = true;
    }
  }
  completeTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
    }
  }
  getTaskByPriority(priority: number): Task[] {
    return this.tasks.filter(t => t.priority === priority)
  }

  getPendingTasks(): Task[] {
    return this.tasks.filter(t => !t.completed)
  }
  getCompletedTasks(): Task[] {
    return this.tasks.filter(t => t.completed)
  }
}
// 3. Add some sample tasks and test the functionality

const taskManager = new TaskManager()
taskManager.addTask({ id: 1, title: "sample task", completed: false, priority: 1, dueDate: new Date(Date.UTC(2023)) })

console.log("✅ Build the task management system!\n");

// ============================================
// EXERCISE 9: Loops
// ============================================
console.log("\n📚 EXERCISE 9: Loops\n");

const exerciseNumbers = [10, 20, 30, 40, 50];

// TODO: Use a standard for-loop to print numbers from 1 to 5
console.log("Standard for-loop (1 to 5):");
// Write your code here

// TODO: Use a for...of loop to calculate the sum of the 'exerciseNumbers' array
console.log("\nSumming array with for...of:");
let sum = 0;
// Write your code here
console.log(`Total sum: ${sum}`);

// TODO: Use a while loop to print powers of 2 less than 100 (2, 4, 8, 16...)
console.log("\nWhile loop (Powers of 2):");
// Write your code here

// TODO: Use .forEach() to print each number in 'exerciseNumbers' multiplied by 2
console.log("\n.forEach() (Doubled values):");
// Write your code here

console.log("\n✅ Practice with different loop types above!\n");

// ============================================
// EXERCISE 10: Maps & Sets
// ============================================
console.log("\n📚 EXERCISE 10: Maps & Sets\n");

// TODO: Create a Map to store student scores (name -> score)
// Requirements:
// 1. Initialize an empty Map with types Map<string, number>
const studentScores = new Map<string, number>();

// 2. Add some student scores (Alice: 95, Bob: 88, Charlie: 92)
// Write your code here

// 3. Update Bob's score to 90
// Write your code here

// 4. Print Alice's score using .get()
// Write your code here

// 5. Check if 'David' exists in the map and print the result
// Write your code here

// 6. Iterate through the map and print: "Student: [Name], Score: [Score]"
console.log("\nStudent Scores List:");
// Write your code here


// TODO: Create a Set to store unique library categories
// Requirements:
// 1. Create a Set with initial categories: "Fiction", "Science", "History"
const categories = new Set<string>(["Fiction", "Science", "History"]);

// 2. Try to add "Fiction" again (see what happens)
// Write your code here

// 3. Add "Programming" to the set
// Write your code here

// 4. Check if "Science" exists in the set
// Write your code here

// 5. Remove "History" from the set
// Write your code here

// 6. Convert the set back to an array and print it
console.log("\nFinal Categories Array:");
// Write your code here


console.log("\n✅ Practice with Maps and Sets above!\n");

// ============================================
// EXERCISE 11: Dependency Injection (TSyringe)
// ============================================
console.log("\n📚 EXERCISE 11: Dependency Injection (TSyringe)\n");

import "reflect-metadata";
import { container, injectable, singleton, inject } from "tsyringe";

// TODO: Implement a loosely coupled logging and notification system
// 1. Create a Logger class with @singleton()
// 2. Create an AnalyticsService class with @injectable() that uses Logger
// 3. Create a PaymentProcessor class with @injectable() that uses AnalyticsService
// 4. Resolve PaymentProcessor from the container and call a method

// Write your code here

console.log("\n✅ Practice with TSyringe Dependency Injection above!\n");

// ============================================
// EXERCISE 12: Dependency Injection (Awilix)
// ============================================
console.log("\n📚 EXERCISE 12: Dependency Injection (Awilix)\n");

import { createContainer, asClass, InjectionMode } from "awilix";

// TODO: Implement a loosely coupled notification system using Awilix
// 1. Create a class EmailService with a send(msg) method
// 2. Create a class NotificationManager that receives { emailService } in constructor
// 3. Setup an Awilix container with PROXY mode
// 4. Register both classes
// 5. Resolve NotificationManager and send a notification

// Write your code here

console.log("\n✅ Practice with Awilix Dependency Injection above!\n");

// ============================================
// BONUS CHALLENGES
// ============================================
console.log("\n🎯 BONUS CHALLENGES\n");

// Challenge 1: Implement a generic Pair type
// Challenge 2: Create a generic cache utility
// Challenge 3: Build a type-safe event emitter
// Challenge 4: Create a generic API client class

console.log("✅ Try the bonus challenges when you're ready!\n");

// ============================================
// HELPER FUNCTIONS (Don't modify)
// ============================================
function testAll(): void {
  console.log("\n🧪 Running Tests...\n");

  // Test Exercise 1
  // Don't redeclare - use the outer scope variable
  myNumber = 42;  // ✅ Just assign, don't redeclare
  let myName: string = "Ahmed";
  let scores: number[] = [85, 90, 78, 92];
  let book: [string, number, number] = ["TypeScript Guide", 350, 2023];
  console.log("✅ Exercise 1 passed!");

  // Test Exercise 3a
  function add(a: number, b: number): number {
    return a + b;
  }
  console.log("✅ Exercise 3a: 5 + 3 =", add(5, 3));

  // Test Exercise 3b
  function greet(name: string, title?: string): string {
    return title ? `${title} ${name}` : `Hello, ${name}`;
  }
  console.log("✅ Exercise 3b:", greet("Ahmed"));
  console.log("✅ Exercise 3b:", greet("Ahmed", "Dr."));

  // Test Exercise 3c
  function findMax(numbers: number[]): number {
    return Math.max(...numbers);
  }
  console.log("✅ Exercise 3c: Max of [1, 5, 3, 9, 2] =", findMax([1, 5, 3, 9, 2]));

  // Test Exercise 3d
  const double = (n: number): number => n * 2;
  console.log("✅ Exercise 3d: Double 7 =", double(7));

  console.log("\n🎉 Basic tests passed! Keep working on the exercises!\n");
}

// Run tests
// Uncomment to test your progress
// testAll();

console.log("\n📖 Next Steps:");
console.log("1. Work through each exercise progressively");
console.log("2. Run: bun run main.ts to see your progress");
console.log("3. Check basics.ts for detailed explanations");
console.log("4. Use TypeScript's compiler to catch errors\n");
