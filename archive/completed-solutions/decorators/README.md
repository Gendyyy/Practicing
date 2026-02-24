# Decorators Mastery

Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.

## Prerequisites

To use decorators in TypeScript, you must enable the `experimentalDecorators` compiler option in your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## Types of Decorators

1. **Class Decorators**: Applied to the constructor of the class.
2. **Method Decorators**: Applied to the property descriptor of the method.
3. **Accessor Decorators**: Applied to the property descriptor of the accessor (getter/setter).
4. **Property Decorators**: Applied to the property declaration.
5. **Parameter Decorators**: Applied to the function declaration.

## Execution Order

1. **Instance Members**: Parameter -> Method/Accessor/Property.
2. **Static Members**: Parameter -> Method/Accessor/Property.
3. **Constructor Parameters**.
4. **Class Decorators**.

Within each category, decorators are applied from **bottom to top** (right to left if on the same line).

## Practice

Open `01-lessons-and-exercises.ts` to start the hands-on practice!
