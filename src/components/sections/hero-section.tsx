import SearchInputGroup from "../feature/search-input-group";
import heroBg from "@/assets/images/hero-bg.png";

export const HeroSection = () => {
    const onSearch = (search: string) => {
        console.log(search);
        // implementing the search logic is not required for this task
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden p-4">
            <img alt="Abstract geometric patterns hero image " src={heroBg} className="w-full h-120 object-cover rounded-xl" />
            <div className="absolute inset-4 bg-black/10 flex flex-col items-center justify-center text-center px-4 gap-8">
                <h1 className="text-3xl md:text-5xl max-w-3xl font-bold text-white leading-tight">
                    Search for words, phrases and meanings
                </h1>
                <SearchInputGroup initialValue="" onSearch={onSearch} />
            </div>
        </div>
    );
}
