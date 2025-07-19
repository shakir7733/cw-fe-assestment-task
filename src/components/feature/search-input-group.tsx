import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";




interface SearchInputGroupProps {
    initialValue: string;
    onSearch: (search: string) => void;
}

export const SearchInputGroup = (props: SearchInputGroupProps) => {
    const { initialValue, onSearch } = props;
    const [searchTerm, setSearchTerm] = useState<string>(initialValue);


    // useCallback to memoize the search handler function
    const handleSearch = useCallback(() => {
        // Only log the search term as per assignment, or trigger actual search logic
        console.log("Searching for:", searchTerm);
        onSearch(searchTerm); // Pass the current search term to the parent
    }, [searchTerm, onSearch]); // Dependencies ensure it re-creates only if searchTerm or onSearch changes

    // Handler for Enter key press
    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
            e.preventDefault(); // Prevent default form submission behavior if inside a form
        }
    }, [handleSearch]); // Dependency ensures it re-creates only if handleSearch changes

    return (
        <div className="flex items-center border-1 border-border bg-input pl-4 pr-2 py-2 rounded-lg w-120 h-16 max-w-xl shadow-lg focus-within:border-1">
            <Search className="text-muted-foreground" />
            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress} // Add key press handler
                type="text"
                placeholder="Type to search..."
                className="flex-1 bg-transparent border-none text-white placeholder:text-muted-foreground placeholder:font-light placeholder:text-[16px] focus-visible:ring-0 focus-visible:ring-offset-0 h-10" // Use focus-visible and explicit height
            // value={innerValue}
            // onChange={(e) => setInnerValue(e.target.value)}
            // type="text"
            // placeholder="Type to search..."
            // className="flex-1 bg-transparent border-none text-white placeholder:text-muted-foreground placeholder:font-light placeholder:text-[16px]"
            />
            <Button
                onClick={handleSearch} // Trigger search on button click
                className="bg-primary cursor-pointer h-full px-6 py-2 text-[16px]  font-semibold rounded-lg hover:bg-blue-700 text-primary-foreground ml-4">
                Search
            </Button>
        </div>
    );
}

export default SearchInputGroup;