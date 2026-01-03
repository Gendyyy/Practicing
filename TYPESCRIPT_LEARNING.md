# TypeScript Basics Learning Guide

## 🎯 Learning Objectives

This guide will take you from TypeScript beginner to confident user through hands-on exercises and examples.

## 📚 File Structure

- **`basics.ts`** - Comprehensive reference with all TypeScript concepts explained
- **`loops-guide.ts`** - Specific guide for loop structures
- **`maps-sets-guide.ts`** - Specific guide for Maps and Sets data structures
- **`tsyringe-guide.ts`** - Specific guide for Dependency Injection with TSyringe
- **`awilix-guide.ts`** - Specific guide for Dependency Injection with Awilix
- **`main.ts`** - Practical exercises for you to complete
- **`TYPESCRIPT_LEARNING.md`** - This learning roadmap

## 🚀 Quick Start

1. **Run the examples:**
   ```bash
   bun run basics.ts
   ```

2. **Practice with exercises:**
   ```bash
   bun run main.ts
   ```

3. **Learn progressively:**
   - Start with basics.ts to understand concepts
   - Complete exercises in main.ts
   - Run code frequently to see results

## 📖 Curriculum

### Level 1: Foundations (Start Here)
1. **Basic Types** - Learn primitive types, arrays, tuples
2. **Type Inference** - Let TypeScript do the work
3. **Type Annotations** - Explicitly define types

### Level 2: Core Concepts
4. **Interfaces** - Define object shapes
5. **Functions** - Type-safe functions
6. **Union & Intersection Types** - Combine types flexibly

### Level 3: Object-Oriented
7. **Classes** - OOP in TypeScript
8. **Inheritance** - Extend and reuse code
9. **Access Modifiers** - Encapsulation with public/private/protected

### Level 4: Advanced Patterns
10. **Generics** - Reusable type-safe code
11. **Utility Types** - Transform types easily
12. **Type Guards** - Runtime type checking
13. **Discriminated Unions** - Pattern matching with types

### Level 5: Real-World
14. **Error Handling** - Type-safe error handling
15. **API Integration** - Type-safe API calls
16. **State Management** - Typed state patterns

### Level 6: Data Structures
17. **Maps & Sets** - Efficient key-value pairs and unique collections

### Level 7: Dependency Management
20. **Dependency Injection (TSyringe)** - Decorator-based DI
21. **Dependency Injection (Awilix)** - Container-based DI without decorators

## 🏋️ Exercises by Topic

### Exercise 1: Types & Variables
- Fix type mismatches
- Add correct type annotations
- Work with arrays and tuples

### Exercise 2: Interfaces & Objects
- Create a Student interface
- Use optional properties
- Use readonly properties

### Exercise 3: Functions
- Implement typed functions
- Use optional parameters
- Work with default values
- Create arrow functions

### Exercise 4: Classes & Inheritance
- Create a Vehicle class
- Extend with Car class
- Override methods
- Use getters and setters

### Exercise 5: Generics
- Implement a generic Stack class
- Understand type parameters
- Create reusable data structures

### Exercise 6: Utility Types
- Use Partial, Required, Readonly
- Use Pick and Omit
- Transform existing types

### Exercise 7: Type Guards
- Create discriminated unions
- Implement type-safe payment processing
- Use switch statements for type narrowing

### Exercise 8: Real-World Application
- Build a task management system
- Implement CRUD operations
- Use filtering and searching
- Practice real-world patterns

### Exercise 9: Loops
- Use for, for...of, while, and .forEach()
- Practice iterating over arrays

### Exercise 10: Maps & Sets
- Use Map for key-value storage
- Use Set for unique collections
- Practice iteration and conversions

### Exercise 11: Dependency Injection (TSyringe)
- Use @injectable and @singleton
- Resolve dependencies via the container
- Implement loose coupling

### Exercise 12: Dependency Injection (Awilix)
- Create an Awilix container
- Use asClass, asValue, and asFunction
- Understand Injection Modes (Proxy vs Classic)

## 💡 Learning Tips

1. **Read the concept in basics.ts first**
   - Understand what each feature does
   - See practical examples
   - Note the syntax patterns

2. **Try it yourself in main.ts**
   - Uncomment exercises one at a time
   - Fix the code to make it work
   - Run frequently to verify

3. **Experiment and break things**
   - Try changing types to see errors
   - TypeScript's compiler is your teacher
   - Learn from error messages

4. **Build incrementally**
   - Start simple
   - Add complexity gradually
   - Test at each step

## 🔧 Common TypeScript Patterns

### Pattern 1: Type-Safe Configuration
```typescript
interface Config {
  apiUrl: string;
  timeout: number;
  retries?: number;
}

function init(config: Config) {
  // Implementation
}
```

### Pattern 2: Generic Repository
```typescript
interface Repository<T> {
  findById(id: number): T | null;
  findAll(): T[];
  create(entity: T): T;
}
```

### Pattern 3: Type-Safe Event Emitter
```typescript
type EventMap = {
  click: { x: number; y: number };
  keypress: { key: string; code: string };
};

class EventEmitter<T extends EventMap> {
  on<K extends keyof T>(event: K, handler: (data: T[K]) => void) {
    // Implementation
  }
}
```

## 🎓 Progression Checklist

- [ ] Can define basic types (string, number, boolean)
- [ ] Can create and use interfaces
- [ ] Can write type-safe functions
- [ ] Understand optional parameters
- [ ] Can create classes and use inheritance
- [ ] Understand basic generics
- [ ] Can use utility types (Partial, Pick, Omit)
- [ ] Can create discriminated unions
- [ ] Can build a small application with TypeScript
- [ ] Understand type guards and narrowing

## 🐛 Debugging TypeScript

### Common Errors & Solutions

**Error: Type 'X' is not assignable to type 'Y'**
- Check if types match exactly
- Use type assertion if you're certain: `value as Y`
- Check for optional properties

**Error: Property 'X' does not exist on type 'Y'**
- Verify the property name spelling
- Check if property exists in interface/type
- Use optional chaining: `obj?.property`

**Error: Cannot invoke an expression whose type lacks a call signature**
- Ensure the value is a function
- Check for proper type annotations

## 📚 Additional Resources

### Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Practice Platforms
- [TypeScript Challenges](https://typescript-exercises.github.io/)
- [Total TypeScript](https://totaltypescript.com/)

## 🎯 Next Steps After Basics

1. **Advanced Types**
   - Conditional types
   - Mapped types
   - Template literal types

2. **Type-Safe APIs**
   - OpenAPI code generation
   - Axios interceptors
   - Fetch wrappers

3. **Framework-Specific**
   - React with TypeScript
   - Node.js with TypeScript
   - Next.js with TypeScript

4. **Tooling**
   - ESLint configuration
   - Prettier setup
   - VS Code extensions

## 💬 Questions?

Remember the golden rule: **Ask clarifying questions!**
- Unsure about a concept? Ask!
- Need more examples? Request them!
- Want to know why something works? Ask!

Happy learning! 🚀
