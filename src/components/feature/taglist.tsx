import { useSearch } from "@/contexts/search-context";
import { useCallback } from "react";
import { Badge } from "../ui/badge"

interface TagListProps {
    title: string;
    tags: string[];
}

export const TagList = (props: TagListProps) => {
    const { title, tags } = props;
    const { setSearchTerm, triggerSearch } = useSearch();

    // Handler for clicking a tag. This will update the search input and trigger a search.
    const handleTagClick = useCallback(
        (tag: string) => {
            setSearchTerm(tag); // Optional: Set the search input field to the tag value
            triggerSearch(tag); // Trigger the search with the tag as the term
        },
        [setSearchTerm, triggerSearch]
    );
    return (
        <div className="mx-auto">
            <h2 className="text-white px-4 pt-4 text-lg font-semibold">{title}</h2> {/* Use h2 for semantic structure */}
            <div className="flex flex-wrap gap-3 px-3 py-3">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)} // Add click handler
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-full"
                        aria-label={`Search for ${tag}`}
                    >
                        <Badge
                            key={tag} // Assuming tags are unique strings, which they appear to be here.
                            className="bg-muted text-muted-foreground rounded-lg  h-8 px-4 text-sm font-medium hover:bg-gray-700 cursor-pointer"
                        >
                            {tag}
                        </Badge>
                    </button>
                ))}
            </div>
        </div>
    )
}