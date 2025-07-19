import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderAvatarProps {
    src: string;
    alt?: string;
    fallback?: string;
}

/**
 * Avatar section for the header.
 */
export const HeaderAvatar = (props: HeaderAvatarProps) => (
    <Avatar className="w-10 h-10">
        <AvatarImage src={props.src} alt={props?.alt ?? "User Avatar"} />
        <AvatarFallback>{props?.fallback ?? "User Avatae"}</AvatarFallback>
    </Avatar>
);