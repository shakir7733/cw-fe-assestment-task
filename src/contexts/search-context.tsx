// src/contexts/SearchContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";

// Type for the context value
interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void; // For updating the input value
    triggerSearch: (term: string) => void; // For initiating a search (e.g., API call)
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Search Provider Component Props
interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    // This function simulates initiating a search (e.g., an API call).
    // It's memoized with useCallback to ensure referential stability.
    const triggerSearch = useCallback((term: string) => {
        // - Call an API (e.g., axios.get(`/api/search?q=${term}`))
        // - Update global state (e.g., Redux, Zustand, etc.) with the search results
        // - Navigate to a search results page
        console.log(`[SearchContext] Initiating search for: "${term}"`);
        // For this assessment, logging is sufficient.
    }, []);

    // The value that will be provided to consumers of this context.
    const contextValue = React.useMemo(
        () => ({
            searchTerm,
            setSearchTerm,
            triggerSearch,
        }),
        [searchTerm, triggerSearch] // Dependencies: re-memoize if searchTerm or triggerSearch changes
    );

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom Hook to consume the Search Context
// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};