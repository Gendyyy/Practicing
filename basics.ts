// ============================================
// TYPESCRIPT BASICS - Comprehensive Learning Guide
// Run this file with: bun run basics.ts
// ============================================

// ============================================
// LESSON 1: Basic Types
// ============================================
console.log("\n=== LESSON 1: Basic Types ===\n");

// Primitive Types
let username: string = "Ahmed";
let age: number = 25;
let isDeveloper: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Type inference (TypeScript infers the type)
let inferredString = "TypeScript is smart!"; // automatically typed as string

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let mixed: (string | number)[] = [1, "two", 3, "four"];

// Tuples (fixed-length arrays with specific types)
let personTuple: [string, number] = ["Ahmed", 25];
let coordinate: [number, number] = [10.5, 20.3];

console.log("Username:", username);
console.log("Numbers:", numbers);
console.log("Person tuple:", personTuple);

// ============================================
// LESSON 2: Object Types & Interfaces
// ============================================
console.log("\n=== LESSON 2: Object Types & Interfaces ===\n");

// Object type annotation
// const user: {
//   name: string;
//   age: number;
//   email: string;
// } = {
//   name: "Ahmed",
//   age: 25,
//   email: "ahmed@example.com"
// };

// Interface (reusable object type)
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
  readonly id: number; // Cannot be changed
}

const user1: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  id: 1
};

const user2: User = {
  name: "Bob",
  age: 25,
  id: 2
  // email is optional, so we can omit it
};

// Type alias (alternative to interface)
type UserType = {
  name: string;
  age: number;
};

const user3: UserType = { name: "Charlie", age: 35 };

console.log("User with interface:", user1);
console.log("User without email:", user2);

// ============================================
// LESSON 3: Functions
// ============================================
console.log("\n=== LESSON 3: Functions ===\n");

// Function with typed parameters and return type
// function add(a: number, b: number): number {
//   return a + b;
// }

// // Arrow function
// const multiply = (a: number, b: number): number => a * b;

// // Function with void return (no return value)
// function greet(name: string): void {
//   console.log(`Hello, ${name}!`);
// }

// Optional parameters
function sayHello(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// Default parameters
function introduce(name: string, title: string = "Developer"): string {
  return `${name} is a ${title}`;
}

// Function with object parameter
function createUser({ name, age }: { name: string; age: number }): User {
  return {
    name,
    age,
    id: Math.random()
  };
}

console.log("Add:", add(5, 3));
// console.log("Multiply:", multiply(4, 7));
greet("Ahmed");
console.log("Say hello:", sayHello("Alice"));
console.log("Say hello with greeting:", sayHello("Bob", "Good morning"));
console.log("Introduce:", introduce("Ahmed"));
console.log("Introduce with title:", introduce("Ahmed", "Full Stack Developer"));

// ============================================
// LESSON 4: Union & Intersection Types
// ============================================
console.log("\n=== LESSON 4: Union & Intersection Types ===\n");

// Union Types (can be one of several types)
let value: string | number;
value = "hello";
value = 42;

type StringOrNumber = string | number;

function printLength(value: StringOrNumber): void {
  console.log(`Value: ${value}, Length: ${value.toString().length}`);
}

printLength("Hello");
printLength(12345);

// Literal Types
type Direction = "up" | "down" | "left" | "right";
let direction: Direction = "up";

// Intersection Types (combining multiple types)
type EmployeeType = {
  name: string;
  id: number;
};

type ManagerType = {
  department: string;
  reports: number;
};

type TeamLeadType = EmployeeType & ManagerType;

const teamLead: TeamLeadType = {
  name: "Ahmed",
  id: 1,
  department: "Engineering",
  reports: 5
};

console.log("Team Lead:", teamLead);

// ============================================
// LESSON 5: Type Assertions & Guards
// ============================================
console.log("\n=== LESSON 5: Type Assertions & Guards ===\n");

// Type Assertion (you know better than TypeScript)
let someValue: unknown = "This is a string";
let strLength: number = (someValue as string).length;

// Another syntax
let anotherValue: unknown = 42;
let numLength = (anotherValue as number).toFixed(2);

// Type Guards
function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(`String: ${value.toUpperCase()}`);
  } else {
    console.log(`Number: ${value.toFixed(2)}`);
  }
}

processValue("hello");
processValue(42.567);

// ============================================
// LESSON 6: Classes & Object-Oriented Programming
// ============================================
console.log("\n=== LESSON 6: Classes & Object-Oriented Programming ===\n");

class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  // Getter
  get info(): string {
    return `${this.name} (${this.age})`;
  }

  // Setter
  set updateAge(age: number) {
    this.age = age;
  }
}

// Inheritance
class Employee extends Person {
  private salary: number; // Private property
  protected title: string; // Protected property

  constructor(name: string, age: number, salary: number, title: string) {
    super(name, age); // Call parent constructor
    this.salary = salary;
    this.title = title;
  }

  getSalary(): number {
    return this.salary;
  }

  getFullInfo(): string {
    return `${this.greet()} I work as a ${this.title}.`;
  }
}

const person = new Person("Alice", 30);
console.log("Person greet:", person.greet());
console.log("Person info:", person.info);

const employee = new Employee("Bob", 28, 50000, "Software Engineer");
console.log("Employee full info:", employee.getFullInfo());
console.log("Employee salary:", employee.getSalary());

// ============================================
// LESSON 7: Enums
// ============================================
console.log("\n=== LESSON 7: Enums ===\n");

enum Role {
  Admin,
  User,
  Guest
}

enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending"
}

console.log("Role Admin:", Role.Admin);
console.log("Status Active:", Status.Active);

// ============================================
// LESSON 8: Generics
// ============================================
console.log("\n=== LESSON 8: Generics ===\n");

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

console.log("Identity string:", identity<string>("hello"));
console.log("Identity number:", identity<number>(42));
console.log("Identity inferred:", identity("inferred type"));

// Generic interface
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 42 };

console.log("String box:", stringBox);
console.log("Number box:", numberBox);

// Generic function with multiple types
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const myPair = pair(1, "hello");
console.log("Pair:", myPair);

// ============================================
// LESSON 9: Utility Types
// ============================================
console.log("\n=== LESSON 9: Utility Types ===\n");

// Partial - makes all properties optional
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo1: Todo = {
  title: "Learn TypeScript",
  description: "Complete the basics",
  completed: false
};

const partialTodo: Partial<Todo> = {
  title: "Update Todo"
  // description and completed are optional now
};

// Required - makes all properties required
interface UserPartial {
  name: string;
  age?: number;
}

const requiredUser: Required<UserPartial> = {
  name: "Ahmed",
  age: 25
};

// Readonly - makes all properties readonly
interface Point {
  x: number;
  y: number;
}

const origin: Readonly<Point> = {
  x: 0,
  y: 0
};

// Pick - create new type by picking specific properties
type TodoPreview = Pick<Todo, "title" | "completed">;

const todoPreview: TodoPreview = {
  title: "Learn TypeScript",
  completed: false
};

// Omit - create new type by omitting specific properties
type TodoSummary = Omit<Todo, "description">;

const todoSummary: TodoSummary = {
  title: "Learn TypeScript",
  completed: false
};

console.log("Partial Todo:", partialTodo);
console.log("Todo Preview:", todoPreview);
console.log("Todo Summary:", todoSummary);

// ============================================
// LESSON 10: Type Guards & Discriminated Unions
// ============================================
console.log("\n=== LESSON 10: Type Guards & Discriminated Unions ===\n");

// Discriminated union
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };

console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));

// ============================================
// EXERCISES
// ============================================
console.log("\n=== EXERCISES - Try These! ===\n");

// Exercise 1: Fix the type errors

let myNumberBasics: number = 42; // Error!
function addNumbers(a: number, b: number): number {
  return a + b;
}


// Exercise 2: Create a function that accepts an array of numbers
// and returns the sum of all numbers
// function sumNumbers(numbers: ???): ??? {
//   // Your code here
// }

// Exercise 3: Create an interface for a Product with:
// - name (string)
// - price (number)
// - inStock (boolean, optional)
// Then create a product object using it

// Exercise 4: Create a generic function that returns the first
// element of an array
// function getFirstElement<T>(arr: T[]): ??? {
//   // Your code here
// }

// Exercise 5: Create a class Animal with name and makeSound method,
// then create Dog class that extends Animal and overrides makeSound

console.log("\n=== TypeScript Basics Complete! ===\n");
console.log("Now try running: bun run basics.ts");
