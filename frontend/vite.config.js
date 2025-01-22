import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    appType: "mpa", // Multi-Page Application
    base: "", // Adjust if deploying under a subdirectory
    build: {
        target: "modules", // Modern ES Modules target
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "/"),
                login: path.resolve(__dirname, "auth/login"),
                register: path.resolve(__dirname, "auth/register"),
                movie: path.resolve(__dirname, "movie"),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // Optional alias for cleaner imports
        },
    },
    server: {
        port: 5173, // Customize the port if needed
        open: true, // Automatically open the app in the browser
    },
});
