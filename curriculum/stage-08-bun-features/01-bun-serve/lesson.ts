/**
 * =============================================================================
 * LESSON 01: BUN.SERVE
 * =============================================================================
 *
 * Bun.serve() is a high-performance HTTP server built into Bun.
 * It supports routing, WebSockets, and hot reloading out of the box.
 *
 * Run this file: bun run curriculum/stage-08-bun-features/01-bun-serve/lesson.ts
 */

// =============================================================================
// PART 1: BASIC SERVER
// =============================================================================

// Simplest possible server
// const simpleServer = Bun.serve({
//     port: 3000,
//     fetch(req) {
//         return new Response("Hello from Bun!");
//     }
// });

// console.log(`Server running at http://localhost:${simpleServer.port}`);

// With async handler
async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    console.log(`${req.method} ${url.pathname}`);

    return new Response(JSON.stringify({
        message: "Hello from Bun!",
        path: url.pathname,
        method: req.method
    }), {
        headers: { "Content-Type": "application/json" }
    });
}

// =============================================================================
// PART 2: ROUTES
// =============================================================================

// Route-based server with type-safe handlers
interface RouteHandlers {
    [path: string]: (req: Request, params: Record<string, string>) => Response | Promise<Response>;
}

function createRouter(routes: RouteHandlers) {
    return async (req: Request): Promise<Response> => {
        const url = new URL(req.url);
        const path = url.pathname;

        // Check exact matches first
        if (routes[path]) {
            return routes[path](req, {});
        }

        // Check parameterized routes
        for (const [routePath, handler] of Object.entries(routes)) {
            const match = matchRoute(path, routePath);
            if (match) {
                return handler(req, match.params);
            }
        }

        return new Response("Not Found", { status: 404 });
    };
}

function matchRoute(path: string, route: string): { params: Record<string, string> } | null {
    const pathParts = path.split("/").filter(Boolean);
    const routeParts = route.split("/").filter(Boolean);

    if (pathParts.length !== routeParts.length) return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(":")) {
            params[routeParts[i].slice(1)] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
            return null;
        }
    }

    return { params };
}

// Example routes
const routes: RouteHandlers = {
    "/": () => new Response("Home"),
    "/users": () => new Response("Users list"),
    "/users/:id": (req, params) => new Response(`User ${params.id}`),
    "/api/health": () => new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
    })
};

// =============================================================================
// PART 3: WEBSOCKETS
// =============================================================================

// Bun has built-in WebSocket support - no external library needed!
interface ChatMessage {
    type: "join" | "leave" | "message";
    user: string;
    content?: string;
}

// Uncomment to run WebSocket server:
/*
const wsServer = Bun.serve<{ username: string }>({
    port: 3001,
    fetch(req, server) {
        const url = new URL(req.url);

        if (url.pathname === "/ws") {
            const username = url.searchParams.get("name") || "Anonymous";
            const success = server.upgrade(req, {
                data: { username }
            });
            if (success) return undefined;
        }

        return new Response("WebSocket server running");
    },
    websocket: {
        open(ws) {
            console.log(`${ws.data.username} joined`);
            ws.subscribe("chat");
            ws.publish("chat", JSON.stringify({
                type: "join",
                user: ws.data.username
            }));
        },
        message(ws, message) {
            const data: ChatMessage = {
                type: "message",
                user: ws.data.username,
                content: message.toString()
            };
            ws.publish("chat", JSON.stringify(data));
        },
        close(ws) {
            console.log(`${ws.data.username} left`);
            ws.publish("chat", JSON.stringify({
                type: "leave",
                user: ws.data.username
            }));
        }
    }
});
*/

// =============================================================================
// PART 4: HTML IMPORTS
// =============================================================================

// Bun can import HTML files directly - they become server-side templates
// import indexHtml from "./index.html";

// The HTML file can import TSX/JSX files directly:
/*
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script type="module" src="./app.tsx"></script>
  </body>
</html>
*/

// Server with HTML import:
/*
const htmlServer = Bun.serve({
    routes: {
        "/": indexHtml,
        "/api/data": {
            GET: async () => {
                return Response.json({ data: "Hello" });
            }
        }
    },
    development: {
        hmr: true,
        console: true
    }
});
*/

// =============================================================================
// YOUR TURN: EXERCISES
// =============================================================================

// TODO 1: Create a simple JSON API server with GET /todos and POST /todos endpoints.
// Store todos in memory (array) and return proper JSON responses.

// TODO 2: Create a route handler that serves static files from a directory.
// Use Bun.file() to read files and return them with correct content types.

// TODO 3: Create a WebSocket server that echoes messages back with a timestamp prefix.
// Track connected clients and broadcast connection count to all clients.


// =============================================================================
// MINI CHALLENGE
// =============================================================================

/**
 * Challenge: Real-time Task Board API
 *
 * Build a complete task management API with Bun.serve:
 *
 * 1. REST API endpoints:
 *    - GET    /api/tasks        - List all tasks
 *    - POST   /api/tasks        - Create new task { title: string, status: "todo" | "doing" | "done" }
 *    - GET    /api/tasks/:id    - Get specific task
 *    - PUT    /api/tasks/:id    - Update task
 *    - DELETE /api/tasks/:id    - Delete task
 *
 * 2. WebSocket for real-time updates:
 *    - Connect at /ws
 *    - Broadcast task changes to all connected clients
 *    - Send message format: { type: "created" | "updated" | "deleted", task: Task }
 *
 * 3. Static file serving:
 *    - Serve index.html at root "/"
 *    - Serve any files from ./public directory
 *
 * 4. CORS headers for API endpoints
 *
 * 5. Graceful shutdown handling
 */

interface Task {
    id: string;
    title: string;
    status: "todo" | "doing" | "done";
    createdAt: Date;
}

export class TaskBoardServer {
    private tasks: Map<string, Task> = new Map();
    private server: ReturnType<typeof Bun.serve> | null = null;

    constructor(private port: number = 3000) {}

    start(): void {
        // TODO: Implement Bun.serve with routes and WebSocket
        console.log(`Server would start on port ${this.port}`);
    }

    stop(): void {
        // TODO: Implement graceful shutdown
        this.server?.stop();
        console.log("Server stopped");
    }

    // Helper methods
    private createTask(title: string, status: Task["status"] = "todo"): Task {
        const task: Task = {
            id: crypto.randomUUID(),
            title,
            status,
            createdAt: new Date()
        };
        this.tasks.set(task.id, task);
        return task;
    }

    private getTask(id: string): Task | undefined {
        return this.tasks.get(id);
    }

    private updateTask(id: string, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null {
        const task = this.tasks.get(id);
        if (!task) return null;

        Object.assign(task, updates);
        return task;
    }

    private deleteTask(id: string): boolean {
        return this.tasks.delete(id);
    }

    private getAllTasks(): Task[] {
        return Array.from(this.tasks.values());
    }
}

export function runChallenge() {
    const server = new TaskBoardServer(3000);
    server.start();

    // Simulate some usage
    console.log("\nSimulating API calls...");

    // Would make actual HTTP requests in real implementation
    // fetch("http://localhost:3000/api/tasks", { method: "POST", body: JSON.stringify({ title: "Learn Bun" }) })

    // Keep server running for a bit then stop
    setTimeout(() => {
        server.stop();
    }, 5000);
}

// Uncomment to test:
// runChallenge();

// Run: bun run curriculum/stage-08-bun-features/01-bun-serve/lesson.ts
