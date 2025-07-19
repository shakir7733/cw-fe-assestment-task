import SearchInputGroup from "../feature/search-input-group";
import heroBg from "@/assets/images/hero-bg.png";

/**
 * HeroSection Component
 * - Displays a hero image background with overlayed title and search input.
 * - Responsive design for various screen sizes.
 */
export const HeroSection = () => {

    return (
        <section className="relative w-full mx-auto overflow-hidden p-2 md:p-4">
            {/* Hero background image */}
            <img
                alt="Abstract geometric patterns hero image"
                src={heroBg}
                className="w-full h-48 md:h-90 lg:h-120 object-cover rounded-xl"
            />
            {/* Overlay with title and search input */}
            <div className="absolute inset-2 md:inset-4 flex flex-col items-center justify-center text-center px-2 md:px-4 gap-6 md:gap-8 bg-black/30 rounded-xl">
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl max-w-2xl md:max-w-3xl font-bold text-white leading-tight drop-shadow-lg">
                    Search for words, phrases and meanings
                </h1>
                <div className="w-full max-w-md">
                    <SearchInputGroup />
                </div>
            </div>
        </section>
    );
}