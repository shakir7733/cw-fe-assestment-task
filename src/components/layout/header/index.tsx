import { useHeaderSearch } from "@/hooks/use-header-search";
import HeaderLogo from "./header-logo";
import { HeaderAvatar } from "./header-avatar";
import avatarImage from "@/assets/images/avatar.png";
import { HeaderSearchInput } from "./header-search-input";


/**
 * Main Header Component
 */
export const Header = () => {
    const headerSearch = useHeaderSearch();

    return (
        <header className="flex items-center justify-between px-10 py-4 bg-background border-b border-border">
            <HeaderLogo />
            <div className="flex items-center gap-8">
                <HeaderSearchInput {...headerSearch} />
                <HeaderAvatar src={avatarImage} />
            </div>
        </header>
    );
};