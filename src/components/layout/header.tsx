import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import logo from "@/assets/images/logo.png"
import avatarImage from "@/assets/images/avatar.png"
import { useDebounce } from "@/hooks/use-debounce"
import { useEffect, useState } from "react"

const onSearch = (term: string) => {
    console.log("Searching for:", term);
    // Implement search logic here
};

export const Header = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) { // Only search if there's a value
            onSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <header className="flex items-center justify-between px-10 py-4 bg-background border-b border-muted-foreground">
            <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="w-4 h-4" />
                <div className="text-white font-semibold text-lg">Wortionary</div>
            </div>
            <div className="flex items-center gap-8">
                <div className="bg-muted relative flex items-center w-40 h-10 rounded-lg pl-4 pr-1">
                    <Search className="text-muted-foreground text-sm" />
                    <Input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-muted-foreground border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-9 placeholder:text-muted-foreground placeholder:text-[16px]"
                    />
                </div>
                <Avatar className="w-10 h-10"> {/* Use Tailwind classes for size instead of inline css */}
                    <AvatarImage src={avatarImage} alt="User Avatar" />
                    <AvatarFallback>User Avatar</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}