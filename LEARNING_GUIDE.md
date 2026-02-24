# TypeScript Mastery Guide

Welcome to your structured learning path. This project is organized into "Topics", each containing numbered lesson files.

**How to use this guide:**
1. Open the file for the lesson you are on.
2. Read the code and comments top-to-bottom.
3. Scroll to the bottom to find the **MINI CHALLENGE**.
4. Solve the challenge directly in that file (uncomment the TODOs).
5. Run the file if needed (usually just checking types is enough, but you can run individual files with `bun run <path>`).

---

## 📚 Module 1: The Basics
**Folder:** `basics/`

- **`01-primitives.ts`**: Types, Arrays, Tuples, and Unions.
- **`02-objects.ts`**: Interfaces vs Types, Optional fields, Intersections.
- **`03-functions.ts`**: Typing arguments, return values, and destructuring.
- **`04-classes.ts`**: Public/Private, Inheritance, and Constructors.
- **`05-generics.ts`**: Making code reusable with Generics and Utility Types.
- **`06-null-vs-undefined.ts`**: Deep dive into the two types of 'nothing'.

## 🔄 Module 2: Control Flow
**Folder:** `control-flow/`

- **`01-loops.ts`**: The 4 types of loops in JS/TS and when to use them.

## 🏗️ Module 3: Data Structures (Deep Dive)
**Folder:** `data-structures/`

- **`01-nested-survival-guide.ts`**: Mastering deep objects and optional chaining.
- **`02-unpacking-mastery.ts`**: Advanced Destructuring / Unpacking techniques.
- **`03-complex-collections.ts`**: Nested Maps, Sets, and groupings.

## 💉 Module 4: Dependency Injection
**Folder:** `dependency-injection/`

- **`01-tsyringe.ts`**: Using Decorators for DI (Microsoft style).
- **`02-awilix.ts`**: Using Containers for DI (JS standard style).

## 🎨 Module 5: Decorators
**Folder:** `decorators/`

- **`01-lessons-and-exercises.ts`**: Creating custom Class, Method, and Property decorators.
- **`02-advanced-patterns.ts`**: Composition, Metadata Reflection, and Auto-binding.

---

### 🛠️ Running Code
To run any specific file to see its console output:
```bash
bun run basics/01-primitives.ts
bun run data-structures/02-unpacking-mastery.ts
```
