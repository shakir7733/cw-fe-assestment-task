import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useHeaderSearch } from "@/hooks/use-header-search";
import { Search } from "lucide-react";


/**
 * Popover content for search results.
 */
const HeaderSearchPopoverContent = ({
    searchTerm,
    isLoading,
    searchResults,
    searchExecutedFor,
}: {
    searchTerm: string;
    isLoading: boolean;
    searchResults: string[];
    searchExecutedFor: string;
}) => {
    if (!searchTerm) {
        return <div className="p-4 text-center text-muted-foreground">Start typing to search...</div>;
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
    return null;
};

/**
 * Search input and popover section for the header.
 */
export const HeaderSearchInput = ({
    searchTerm,
    isPopoverOpen,
    handleInputChange,
    handlePopoverOpenChange,
    isLoading,
    searchResults,
    searchExecutedFor,
}: ReturnType<typeof useHeaderSearch>) => (
    <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild>
            <div className="bg-muted relative flex items-center w-40 h-10 rounded-lg pl-4 pr-1 w-40 md:w-48 lg:w-60">
                <Search className="text-muted-foreground text-sm" />
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="bg-transparent text-foreground border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full placeholder:text-muted-foreground placeholder:text-[16px]"
                    aria-label="Global search input"
                />
            </div>
        </PopoverTrigger>
        <PopoverContent
            className="w-60 p-0 bg-input border border-border rounded-lg shadow-lg"
            align="end"
            onOpenAutoFocus={e => e.preventDefault()}
        >
            <HeaderSearchPopoverContent
                searchTerm={searchTerm}
                isLoading={isLoading}
                searchResults={searchResults}
                searchExecutedFor={searchExecutedFor}
            />
        </PopoverContent>
    </Popover>
);
