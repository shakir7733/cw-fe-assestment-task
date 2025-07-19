import { Badge } from "../ui/badge"

interface TagListProps {
    title: string;
    tags: string[];
}

export const TagList = (props: TagListProps) => {
    const { title, tags } = props;
    return (
        <div className="mx-auto">
            <h2 className="text-white px-4 pt-4 text-lg font-semibold">{title}</h2> {/* Use h2 for semantic structure */}
            <div className="flex flex-wrap gap-3 px-3 py-3">
                {tags.map((tag) => (
                    <Badge
                        key={tag} // Assuming tags are unique strings, which they appear to be here.
                        className="bg-muted text-muted-foreground rounded-lg  h-8 px-4 text-sm font-medium hover:bg-gray-700 cursor-pointer"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    )
}