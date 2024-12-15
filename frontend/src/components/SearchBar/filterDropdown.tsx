import React, { useState, useEffect, useRef } from "react";
import "./filterDropdown.css";

interface FilterDropdownProps {
    includeListings: boolean; // Controlled state for Include Listings
    onIncludeListingsChange: (value: boolean) => void; // Callback to update Include Listings state
    onPriceRangeChange: (newRange: { min: string; max: string }) => void; // New callback for Price Range
}


const FilterDropdown: React.FC<FilterDropdownProps> = ({
    includeListings,
    onIncludeListingsChange,
    onPriceRangeChange,
                                                       }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // Selected filters
    const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // State for price range input
    const [minRating, setMinRating] = useState(0); // State for ratings slider
    const [includeEvents, setIncludeEvents] = useState(false); // State for "Include Events" toggle
    // const [includeListings, setIncludeListings] = useState(false); // State for "Include Listings" toggle
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

    const filters = ["Price Range", "Location", "Rating", "Type of Place"]; // Available filter options

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleFilterClick = (filter: string) => {
        setSelectedFilters((prev) => {
            const updatedFilters = prev.includes(filter)
                ? prev.filter((f) => f !== filter) // Remove filter
                : [...prev, filter]; // Add filter

            // Reset price range if deselecting "Price Range"
            if (filter === "Price Range" && !updatedFilters.includes(filter)) {
                setPriceRange({ min: "", max: "" });
                onPriceRangeChange({ min: "", max: "" }); // Notify parent
            }

            return updatedFilters;
        });
    };


    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setPriceRange((prev) => {
                const newRange = { ...prev, [type]: value };

                // Adjust "max" if it goes below "min"
                if (type === "min" && value !== "" && parseFloat(value) > parseFloat(newRange.max || "0")) {
                    newRange.max = value;
                }

                // Adjust "min" if it goes above "max"
                if (type === "max" && value !== "" && parseFloat(value) < parseFloat(newRange.min || "0")) {
                    newRange.min = value;
                }
                onPriceRangeChange(newRange);
                return newRange;
            });
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false); // Close dropdown
            }
        };

        // Add event listener for clicks
        document.addEventListener("mousedown", handleOutsideClick);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinRating(Number(e.target.value));
    };

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
            <button
                className={`filter-button ${isDropdownOpen ? "active" : ""}`}
                onClick={toggleDropdown}>
                Filters
            </button>
            {isDropdownOpen && (
                <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                    {/* Toggle switches for Include Events and Include Listings */}
                    <div className="dropdown-item toggle">
                        <label htmlFor="includeEvents" className="filter-label">
                            Include Events
                        </label>
                        <div className="toggle-switch">
                            <input
                                id="includeEvents"
                                type="checkbox"
                                checked={includeEvents}
                                onChange={() => setIncludeEvents((prev) => !prev)}
                            />
                            <label htmlFor="includeEvents" className="slider"></label>
                        </div>
                    </div>
                    <div className="dropdown-item toggle">
                        <label htmlFor="includeListings" className="filter-label">
                            Include Listings
                        </label>
                        <div className="toggle-switch">
                            <input
                                id="includeListings"
                                type="checkbox"
                                checked={includeListings}
                                onChange={(e) => onIncludeListingsChange(e.target.checked)}
                            />
                            <label htmlFor="includeListings" className="slider"></label>
                        </div>
                    </div>

                    {/* Filter items */}
                    {filters.map((filter) => (
                        <div
                            key={filter}
                            className={`dropdown-item ${selectedFilters.includes(filter) ? "selected" : ""}`}
                            onClick={() => handleFilterClick(filter)}
                        >
                            <div className="filter-label">{filter}</div>
                            {filter === "Price Range" && selectedFilters.includes(filter) && (
                                <div
                                    className="price-range-inputs"
                                    onClick={(e) => e.stopPropagation()} // Prevent deselection
                                >
                                    <input
                                        type="text"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) => handlePriceChange(e, "min")}
                                    />
                                    <span>-</span>
                                    <input
                                        type="text"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) => handlePriceChange(e, "max")}
                                    />
                                </div>
                            )}
                            {filter === "Rating" && selectedFilters.includes(filter) && (
                                <div
                                    className="rating-slider"
                                    onClick={(e) => e.stopPropagation()} // Prevent deselection
                                >
                                    <label htmlFor="minRating">
                                        Minimum Rating: <strong>{minRating} Stars</strong>
                                    </label>
                                    <input
                                        type="range"
                                        id="minRating"
                                        name="minRating"
                                        min="0"
                                        max="5"
                                        step="0.5"
                                        value={minRating}
                                        onChange={handleRatingChange}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;