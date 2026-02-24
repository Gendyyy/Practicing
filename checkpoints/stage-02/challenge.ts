/**
 * =============================================================================
 * CHECKPOINT: STAGE 02 - Shopping Cart Calculator
 * =============================================================================
 *
 * This challenge combines: Conditionals, Loops, and Array Methods
 *
 * Run this file: bun run checkpoints/stage-02/challenge.ts
 */

// =============================================================================
// TYPES
// =============================================================================

type Product = {
    id: string;
    name: string;
    price: number;
    category: "food" | "electronics" | "clothing";
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Discount = {
    type: "percentage" | "fixed";
    value: number;
    minPurchase?: number;
};

// =============================================================================
// SAMPLE DATA
// =============================================================================

const products: Product[] = [
    { id: "p1", name: "Apple", price: 1.5, category: "food" },
    { id: "p2", name: "Laptop", price: 999, category: "electronics" },
    { id: "p3", name: "T-Shirt", price: 25, category: "clothing" },
    { id: "p4", name: "Banana", price: 0.75, category: "food" },
    { id: "p5", name: "Headphones", price: 150, category: "electronics" },
    { id: "p6", name: "Jeans", price: 60, category: "clothing" },
];

const discounts: Discount[] = [
    { type: "percentage", value: 10, minPurchase: 100 }, // 10% off orders over $100
    { type: "fixed", value: 20, minPurchase: 500 },       // $20 off orders over $500
];

// =============================================================================
// CHALLENGE TASKS
// =============================================================================

/**
 * TASK 1: Calculate Subtotal
 *
 * Calculate the total price of all items in the cart (before discounts)
 *
 * @param items - Array of cart items
 * @returns The subtotal
 */
export function calculateSubtotal(items: CartItem[]): number {
    // TODO: Use array methods to calculate subtotal
    // Each item's cost = product.price * quantity
    // Sum all items

    return 0;
}

/**
 * TASK 2: Filter by Category
 *
 * Return only items that belong to a specific category
 *
 * @param items - Array of cart items
 * @param category - Category to filter by
 * @returns Filtered cart items
 */
export function filterByCategory(items: CartItem[], category: Product["category"]): CartItem[] {
    // TODO: Use filter() to return items matching the category

    return [];
}

/**
 * TASK 3: Find Best Discount
 *
 * Find the discount that gives the highest savings for a given subtotal
 * Only consider discounts where minPurchase requirement is met
 *
 * @param subtotal - The cart subtotal
 * @returns The best discount or null if none apply
 */
export function findBestDiscount(subtotal: number): Discount | null {
    // TODO:
    // 1. Filter discounts where minPurchase is met (or no minPurchase)
    // 2. Calculate savings for each applicable discount
    // 3. Return the discount with highest savings

    return null;
}

/**
 * TASK 4: Calculate Discount Amount
 *
 * Calculate how much money a discount saves on a given subtotal
 *
 * @param discount - The discount to apply
 * @param subtotal - The cart subtotal
 * @returns The amount saved
 */
export function calculateDiscountAmount(discount: Discount, subtotal: number): number {
    // TODO:
    // If percentage: savings = subtotal * (value / 100)
    // If fixed: savings = value (capped at subtotal)

    return 0;
}

/**
 * TASK 5: Calculate Final Total
 *
 * Calculate the final total after applying the best discount
 *
 * @param items - Array of cart items
 * @returns Object with subtotal, discount amount, and final total
 */
export function calculateFinalTotal(items: CartItem[]): {
    subtotal: number;
    discountAmount: number;
    finalTotal: number;
    appliedDiscount: Discount | null;
} {
    // TODO:
    // 1. Calculate subtotal
    // 2. Find best discount
    // 3. Calculate discount amount
    // 4. Return all values

    return {
        subtotal: 0,
        discountAmount: 0,
        finalTotal: 0,
        appliedDiscount: null,
    };
}

/**
 * TASK 6: Generate Receipt
 *
 * Create a formatted receipt string showing all items, subtotal,
 * discount (if any), and final total
 *
 * @param items - Array of cart items
 * @returns Formatted receipt string
 */
export function generateReceipt(items: CartItem[]): string {
    // TODO:
    // 1. Build lines for each item: "2x Apple @ $1.50 = $3.00"
    // 2. Add subtotal line
    // 3. Add discount line (if applicable)
    // 4. Add final total line
    // Use template literals and array methods (map, join)

    return "";
}

/**
 * TASK 7: Group Items by Category
 *
 * Group all cart items by their product category
 *
 * @param items - Array of cart items
 * @returns Object with categories as keys and arrays of items as values
 */
export function groupByCategory(items: CartItem[]): Record<Product["category"], CartItem[]> {
    // TODO: Use reduce() to group items by category
    // Result should look like:
    // {
    //   food: [...items],
    //   electronics: [...items],
    //   clothing: [...items]
    // }

    return {
        food: [],
        electronics: [],
        clothing: [],
    };
}

/**
 * TASK 8: Get Most Expensive Item
 *
 * Find the single most expensive item in the cart (considering quantity)
 *
 * @param items - Array of cart items
 * @returns The most expensive cart item or null if cart is empty
 */
export function getMostExpensiveItem(items: CartItem[]): CartItem | null {
    // TODO: Use reduce() to find item with highest (price * quantity)

    return null;
}

// =============================================================================
// BONUS CHALLENGE
// =============================================================================

/**
 * BONUS: Apply Category-Specific Discounts
 *
 * Some categories might have special discounts:
 * - Food: 5% off always
 * - Electronics: $10 off every $100 spent in electronics
 *
 * Calculate the total with category-specific discounts applied first,
 * then apply cart-level discounts
 */
export function calculateWithCategoryDiscounts(items: CartItem[]): number {
    // TODO: Implement category-specific discount logic
    // This is a bonus - think about how to structure this!

    return 0;
}

// =============================================================================
// TEST YOUR SOLUTION
// =============================================================================

function runTests() {
    console.log("=".repeat(60));
    console.log("SHOPPING CART CALCULATOR - TESTS");
    console.log("=".repeat(60));

    const cart: CartItem[] = [
        { product: products[0], quantity: 4 },  // 4x Apple = $6
        { product: products[1], quantity: 1 },  // 1x Laptop = $999
        { product: products[2], quantity: 2 },  // 2x T-Shirt = $50
        { product: products[3], quantity: 6 },  // 6x Banana = $4.50
    ];

    console.log("\n📦 Cart Items:");
    cart.forEach(item => {
        console.log(`   ${item.quantity}x ${item.product.name} @ $${item.product.price.toFixed(2)}`);
    });

    console.log("\n" + "-".repeat(60));

    // Test calculateSubtotal
    const subtotal = calculateSubtotal(cart);
    console.log(`\n💰 Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`   Expected: $1059.50`);

    // Test filterByCategory
    const foodItems = filterByCategory(cart, "food");
    console.log(`\n🍎 Food Items: ${foodItems.length}`);
    console.log(`   Expected: 2 items (Apple, Banana)`);

    // Test findBestDiscount
    const bestDiscount = findBestDiscount(subtotal);
    console.log(`\n🏷️ Best Discount: ${bestDiscount ? `${bestDiscount.type} - ${bestDiscount.value}` : "None"}`);
    console.log(`   Expected: percentage - 10 (10% off for orders over $100)`);

    // Test calculateFinalTotal
    const result = calculateFinalTotal(cart);
    console.log(`\n📊 Final Calculation:`);
    console.log(`   Subtotal: $${result.subtotal.toFixed(2)}`);
    console.log(`   Discount: $${result.discountAmount.toFixed(2)}`);
    console.log(`   Final: $${result.finalTotal.toFixed(2)}`);

    // Test generateReceipt
    console.log(`\n📝 Receipt:\n${generateReceipt(cart)}`);

    // Test groupByCategory
    const grouped = groupByCategory(cart);
    console.log(`\n📂 Grouped by Category:`);
    console.log(`   Food: ${grouped.food.length} items`);
    console.log(`   Electronics: ${grouped.electronics.length} items`);
    console.log(`   Clothing: ${grouped.clothing.length} items`);

    // Test getMostExpensiveItem
    const expensive = getMostExpensiveItem(cart);
    console.log(`\n💎 Most Expensive: ${expensive?.product.name || "None"}`);
    console.log(`   Expected: Laptop ($999)`);

    console.log("\n" + "=".repeat(60));
    console.log("Complete the TODOs to make all tests pass!");
    console.log("=".repeat(60));
}

// Run tests
runTests();
