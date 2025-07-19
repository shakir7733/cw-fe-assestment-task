import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

// Simulate an asynchronous search operation
const simulateSearch = async (term: string): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([`Result 1 for "${term}"`, `Result 2 for "${term}"`]);
        }, 800);
    });
};

/**
 * Custom hook for handling header search logic.
 */
export function useHeaderSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [searchExecutedFor, setSearchExecutedFor] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsLoading(true);
            setSearchResults([]);
            setSearchExecutedFor("");
            simulateSearch(debouncedSearchTerm)
                .then((results) => {
                    setSearchResults(results);
                    setSearchExecutedFor(debouncedSearchTerm);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
            setSearchResults([]);
            setSearchExecutedFor("");
        }
    }, [debouncedSearchTerm]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsPopoverOpen(value.length > 0);
    }, []);

    const handlePopoverOpenChange = useCallback((open: boolean) => {
        setIsPopoverOpen(open);
        if (!open) setIsLoading(false);
    }, []);

    return {
        searchTerm,
        isLoading,
        searchResults,
        isPopoverOpen,
        searchExecutedFor,
        handleInputChange,
        handlePopoverOpenChange,
        setSearchTerm,
    };
}