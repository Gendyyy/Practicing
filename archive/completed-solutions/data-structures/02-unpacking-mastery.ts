/**
 * -----------------------------------------------------------------------------
 * 02 - UNPACKING MASTERY (DESTRUCTURING)
 * -----------------------------------------------------------------------------
 * 
 * "Unpacking" (Destructuring) is the art of extracting values from data 
 * structures directly into variables. It is cleaner and more readable 
 * than repeating 'obj.prop.subprop'.
 */

// Let's use a standard User configurations object
const userConfig = {
    id: 99,
    username: "coder_123",
    preferences: {
        theme: "dark",
        notifications: {
            email: true,
            sms: false,
            push: {
                mobile: true,
                desktop: false
            }
        }
    },
    meta: {
        created: "2024-01-01",
        loginCount: 42
    },
    // Sometimes fields are arrays
    recentIPs: ["192.168.1.1", "10.0.0.1", "172.16.0.5"]
};

// -----------------------------------------------------------------------------
// LEVEL 1: SHALLOW UNPACKING
// -----------------------------------------------------------------------------

// Old way:
// const id = userConfig.id;
// const username = userConfig.username;

// New way:
const { id, username } = userConfig;
console.log(`User: ${username} (ID: ${id})`);


// -----------------------------------------------------------------------------
// LEVEL 2: DEEP UNPACKING (Nested)
// -----------------------------------------------------------------------------
// We want 'theme' and 'email' notifications.
// NOTICE: The structure mimics the object structure.

const {
    preferences: {
        theme,
        notifications: { email }
    }
} = userConfig;

console.log(`Theme: ${theme}, Email Enabled: ${email}`);

// -----------------------------------------------------------------------------
// LEVEL 3: RENAMING (ALIASES)
// -----------------------------------------------------------------------------
// What if 'email' is too generic? We can rename it during unpacking.
// syntax:  propertyName: newVariableName

const {
    preferences: {
        notifications: {
            sms: smsEnabled,  // unpack 'sms' -> rename to 'smsEnabled'
            push: {
                mobile: isMobilePushOn
            }
        }
    }
} = userConfig;

console.log(`SMS: ${smsEnabled}, Mobile Push: ${isMobilePushOn}`);


// -----------------------------------------------------------------------------
// LEVEL 4: UNPACKING ARRAYS
// -----------------------------------------------------------------------------
// We want the first two IPs, and the rest we don't care about (or collect them).

const [firstIP, secondIP, ...others] = userConfig.recentIPs;

console.log(`Primary IP: ${firstIP}`);
console.log(`Other IPs:`, others);


// -----------------------------------------------------------------------------
// LEVEL 5: FUNCTION PARAMETER UNPACKING (VERY COMMON)
// -----------------------------------------------------------------------------
// Instead of taking the whole object, just take what you need in the signature.

type UserConfig = typeof userConfig; // Utility to infer type quickly

// Pro pattern: "Exploded" function signature
function printPushStatus({ preferences: { notifications: { push } } }: UserConfig) {
    // We extracted 'push' directly in the argument list!
    console.log("Desktop push:", push.desktop);
}

printPushStatus(userConfig);

// -----------------------------------------------------------------------------
// LEVEL 6: DEFAULTS + UNPACKING
// -----------------------------------------------------------------------------
// What if a field is missing? We can assign a default value (`= value`).

const partialData = {
    title: "My Post",
    // tags is missing
};

// We try to unpack 'tags'. If it's missing, we default to ["general"].
const { title, tags = ["general"] } = partialData as any;

console.log(`Title: ${title}, Tags: ${tags}`);


// -----------------------------------------------------------------------------
// MASTER EXERCISE: THE "SUPER UNPACK"
// -----------------------------------------------------------------------------
// Let's grab: 
// 1. The 2nd IP address renamed to 'backupIP'
// 2. The login count
// 3. The theme

const {
    recentIPs: [, backupIP], // Skip first comma, grab second
    meta: { loginCount },
    preferences: { theme: currentTheme }
} = userConfig;

console.log(`
    Backup IP: ${backupIP}
    Logins: ${loginCount}
    Theme: ${currentTheme}
`);

// -----------------------------------------------------------------------------
// MINI CHALLENGE: THE MESSY API RESPONSE
// -----------------------------------------------------------------------------
const apiResponse = {
    data: {
        id: 101,
        type: "order"
    },
    meta: {
        status: "failed",
        timestamp: 1680000000
    },
    errors: [
        { code: 500, text: "Database timeout" },
        { code: 403, text: "Unauthorized" }
    ]
};

export function extractStatusAndError(response: typeof apiResponse) {
    // TODO: Use destructuring to extract:
    // 1. 'status' from meta
    // 2. The TEXT of the FIRST error message (renamed to 'firstErrorText')
    const {meta: {status}, errors: [{text: firstErrorText}]} = response

    // const { ... } = response;

    console.log(`Status: ${status}`);
    console.log(`Reason: ${firstErrorText}`);
}

extractStatusAndError(apiResponse);