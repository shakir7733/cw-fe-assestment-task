import { Header } from "./header";

/**
 * Layout Component
 * - Wraps page content and includes the Header.
 * - Use for consistent structure across pages.
 */
export const Layout = ({ children }: { children: React.ReactNode }) => (
    <main className="bg-background min-h-screen text-white font-sans antialiased">
        <Header />
        <div className="max-w-5xl mx-auto p-4">{children}</div>
    </main>
);