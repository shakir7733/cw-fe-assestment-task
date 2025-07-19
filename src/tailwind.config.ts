/* eslint-disable @typescript-eslint/no-require-imports */
// Tailwind CSS Configuration File

import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration object.
 * - Customizes dark mode, content scanning, theme, and plugins.
 * - Uses CSS variables for semantic theming (compatible with Shadcn/UI).
 */
const config = {
    // Enable dark mode via 'class' or custom '_dark' class on the HTML element.
    darkMode: ["class", "_dark"],

    // Specify files for Tailwind to scan for class usage (purging unused styles).
    content: [
        // Uncomment for Next.js pages/app directories:
        // "./pages/**/*.{ts,tsx}",
        // "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}", // Scan all components
        "./src/**/*.{ts,tsx}",        // Scan all source files (Vite/CRA)
    ],

    // Prefix for all Tailwind classes (useful for legacy integration).
    prefix: "",

    theme: {
        // Responsive container settings for consistent layouts.
        container: {
            center: true,           // Center container horizontally
            padding: "2rem",        // Container horizontal padding
            screens: {
                "2xl": "1400px",    // Desktop screens
                "xl": "1200px",     // Large screens
                "lg": "1000px",     // Small laptops
                "md": "800px",      // Tablets
                "sm": "600px",      // Large phones/small tablets
                "xs": "400px",      // Phones
            },
        },
        extend: {
            /**
             * Semantic color palette using CSS variables.
             * - Enables easy theming and compatibility with Shadcn/UI.
             */
            colors: {
                border: "hsl(var(--border))",           // Border color
                input: "hsl(var(--input))",             // Input background
                ring: "hsl(var(--ring))",               // Focus ring
                background: "hsl(var(--background))",   // App background
                foreground: "hsl(var(--foreground))",   // Main text color
                primary: {
                    DEFAULT: "hsl(var(--primary))",             // Accent color
                    foreground: "hsl(var(--primary-foreground))", // Text on accent
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",               // Muted backgrounds
                    foreground: "hsl(var(--muted-foreground))", // Muted text
                },
            },

            /**
             * Border radius settings using CSS variables.
             * - Ensures consistent rounding across components.
             */
            borderRadius: {
                lg: "var(--radius)",                  // Large radius
                md: "calc(var(--radius) - 2px)",      // Medium radius
                sm: "calc(var(--radius) - 4px)",      // Small radius
            },

            /**
             * Custom keyframes and animations.
             * - Extend as needed for custom or Shadcn/UI animations.
             */
            keyframes: {
                // Add custom keyframes here
            },
            animation: {
                // Add custom animations here
            },
        },
    },

    // Tailwind CSS plugins for extended functionality.
    plugins: [
        require("tailwindcss-animate"), // Animation support (required by Shadcn/UI)
        // require("@tailwindcss/forms"), // Uncomment for enhanced form styling
    ],
} satisfies Config;

export default config;