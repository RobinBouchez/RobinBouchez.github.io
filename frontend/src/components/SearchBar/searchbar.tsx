import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { CiSearch } from "react-icons/ci";
import "./searchbar.css";
import FilterDropdown from "./filterDropdown";


interface SearchbarProps {
    onSearch: (query: string) => void;
    showFilterButton?: boolean; // Optional prop to toggle filter button
    onFilterClick?: () => void; // Callback for the filter button
    initialIncludeListings?: boolean; // prop for initial state
    onIncludeListingsChange?: (value: boolean) => void; // Optional callback
    onPriceRangeChange?: (newRange: { min: string; max: string }) => void;
    initialQuery?: string;

}

function Searchbar({ onSearch,
                       showFilterButton = false,
                       onFilterClick,
                      initialIncludeListings = false,
                       onPriceRangeChange,
                       initialQuery= "",
                   }: SearchbarProps) {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [includeListings, setIncludeListings] = useState(initialIncludeListings); // Use the prop as the initial state

    useEffect(() => {
        setSearchQuery(initialQuery);
    }, [initialQuery]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(searchQuery);
        }
    };

    return (
        <div className="search-bar-container">
            {showFilterButton &&(
                <FilterDropdown
                    includeListings={includeListings}
                    onIncludeListingsChange={setIncludeListings} // Callback to update the state
                    onPriceRangeChange={onPriceRangeChange || (() => {})} // Pass to FilterDropdown
                />
            )}
            <div className={`search-bar ${showFilterButton ? "filter-visible" : ""}`}>
                <Card className="search-card">
                    <Card.Body>
                        <div className="searchbarWrapper">
                            <CiSearch className="absolute left-3 top-3 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="University or City"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Searchbar;