import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import logo from "@/assets/images/logo.png"
import avatarImage from "@/assets/images/avatar.png"
import { useDebounce } from "@/hooks/use-debounce"
import { useCallback, useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

// Simulate an asynchronous search operation
// In a real app, this would be an API call, e.g., axios.get('/api/search', { params: { q: term } })
const simulateSearch = async (term: string): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate fetching results. Here, we just return a confirmation.
            // In a real scenario, you'd filter data or fetch from an API.
            console.log(`[Simulated Search API] Fetched results for: "${term}"`);
            resolve([`Result 1 for "${term}"`, `Result 2 for "${term}"`]); // Example results
        }, 800); // Simulate network delay
    });
};

export const Header = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [searchExecutedFor, setSearchExecutedFor] = useState<string>(""); // To display in popover
    // Debounce the search term to prevent excessive API calls
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay

    // Effect to trigger search when the debounced term changes
    useEffect(() => {
        // Only trigger search if debounced term is not empty
        if (debouncedSearchTerm) {
            setIsLoading(true); // Start loading when debounced term is ready
            setSearchResults([]); // Clear previous results
            setSearchExecutedFor(""); // Clear previous executed term display

            simulateSearch(debouncedSearchTerm)
                .then((results) => {
                    setSearchResults(results);
                    setSearchExecutedFor(debouncedSearchTerm); // Store the term that was searched for
                })
                .finally(() => {
                    setIsLoading(false); // Stop loading
                });
        } else {
            // If debounced term is empty (e.g., user cleared input)
            setIsLoading(false);
            setSearchResults([]);
            setSearchExecutedFor("");
        }
    }, [debouncedSearchTerm]);

    // Handle input change and popover visibility
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 0 && !isPopoverOpen) {
            setIsPopoverOpen(true); // Open popover if user starts typing and it's closed
        } else if (value.length === 0) {
            setIsPopoverOpen(false); // Close popover if input is cleared
        }
    }, [isPopoverOpen]);

    // Handle popover open/close state directly
    const handlePopoverOpenChange = useCallback((open: boolean) => {
        setIsPopoverOpen(open);
        // If popover is closing and input is not empty, you might want to clear it or not.
        // For now, let's keep it simple: if closed, ensure loading is off.
        if (!open) {
            setIsLoading(false);
            // Optionally, clear searchTerm when popover closes and nothing was searched.
            // if (!searchExecutedFor) setSearchTerm("");
        }
    }, []);

    // Helper to render popover content
    const renderPopoverContent = () => {
        if (searchTerm.length === 0) {
            return (
                <div className="p-4 text-center text-muted-foreground">
                    Start typing to search...
                </div>
            );
        }
        if (isLoading) {
            return (
                <div className="p-4 flex items-center justify-center text-foreground">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading results...</span>
                </div>
            );
        }
        if (searchResults.length > 0) {
            return (
                <div className="p-4">
                    <p className="font-semibold mb-2 text-foreground">Results for "{searchExecutedFor}":</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {searchResults.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                    {/* You can add actions like "View all results" here */}
                </div>
            );
        }
        if (searchExecutedFor && !isLoading && searchResults.length === 0) {
            return (
                <div className="p-4 text-center text-muted-foreground">
                    No results found for "{searchExecutedFor}".
                </div>
            );
        }
        return null; // Fallback, should not be reached often
    };

    return (
        <header className="flex items-center justify-between px-10 py-4 bg-background border-b border-border">
            <div className="flex items-center gap-4">
                <img src={logo} alt="Wortionary Logo" className="w-4 h-4" />
                <div className="text-foreground font-semibold text-lg">Wortionary</div>
            </div>

            <div className="flex items-center gap-8">
                <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
                    <PopoverTrigger asChild>
                        {/* The search input acts as the popover trigger */}
                        <div className="bg-muted relative flex items-center w-40 h-10 rounded-lg pl-4 pr-1 w-40 md:w-48 lg:w-60">
                            <Search className=" text-muted-foreground text-sm" />
                            <Input
                                type="text"
                                placeholder="Search"
                                value={searchTerm} // Controlled component
                                onChange={handleInputChange}
                                // onFocus={() => setIsPopoverOpen(true)} // Open popover on focus
                                // onBlur={() => setIsPopoverOpen(false)} // Consider carefully, might close when trying to click content
                                className="bg-transparent text-foreground border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full placeholder:text-muted-foreground placeholder:text-[16px] " // Increased width for better UX
                                aria-label="Global search input"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-60 p-0 bg-input border border-border rounded-lg shadow-lg" // Shadcn PopoverContent styling
                        align="end" // Align popover to the end of the trigger
                        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus shifting when popover opens
                    >
                        {renderPopoverContent()}
                    </PopoverContent>
                </Popover>
                <Avatar className="w-8 h-8">
                    <AvatarImage src={avatarImage} alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}