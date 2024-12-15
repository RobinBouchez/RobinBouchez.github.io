import React from "react";
import "./searchResult.css";
import LoginForm from "../components/LoginForm/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import TopNav from '../components/TopNav/TopNav';
import MapComponent from "../components/Map/Map";
import Searchbar from "../components/SearchBar/searchbar";
// import FilterButtons from "../components/SearchBar/filterButtons";
import ProfileConfig from "../components/ProfileConfig/conf";
import ContentPage from "../components/ContentGrid/contentPageResult";

import Footer from "../components/Footer/footer";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResult() {
    const navigate = useNavigate();
    const location = useLocation();

    // const query = useQuery().get("query");
    const queryParams = new URLSearchParams(location.search); // Get the search query from the URL
    const query = queryParams.get("query");
    const includeListingsParam = queryParams.get("includeListings") === "true"; // Parse the includeListings parameter
    const [view, setView] = useState<"split" | "full-map" | "full-cards">("split");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // Track the price range filter
    const [currentQuery, setCurrentQuery] = useState(query); // Local state for the query

    // Update `currentQuery` if `query` changes
    useEffect(() => {
        setCurrentQuery(query);
    }, [query]);

    // Handler for searching from the search bar
    const handleSearch = (newQuery: string) => {
        if (newQuery.trim()) {
            navigate(`/SearchResult?query=${encodeURIComponent(newQuery)}&includeListings=${includeListingsParam}`);
        }
    };

    // Handler for price range changes
    const handlePriceRangeChange = (newRange: { min: string; max: string }) => {
        setPriceRange(newRange);
        console.log("Updated Price Range:", newRange);
    };

    return (
        <div>
            <div className="searchbar">
                <Searchbar
                    onSearch={handleSearch}
                    showFilterButton={true}
                    onFilterClick={() => console.log("Filter button clicked!")}
                    initialIncludeListings={includeListingsParam} // Pass the state
                    onIncludeListingsChange={(newValue) => console.log("Include Listings:", newValue)} // Handle updates
                    onPriceRangeChange={handlePriceRangeChange}
                    initialQuery={query || ""}
                />
            </div>

            <div className="MainWrapper container-fluid">
                <div className="view-toggle-buttons mb-3">
                    <button
                        className={`btn btn-primary ${view === "split" ? "active" : ""}`}
                        onClick={() => setView("split")}
                    >
                        Split View
                    </button>
                    <button
                        className={`btn btn-secondary ${view === "full-cards" ? "active" : ""}`}
                        onClick={() => setView("full-cards")}
                    >
                        Full Content View
                    </button>
                    <button
                        className={`btn btn-secondary ${view === "full-map" ? "active" : ""}`}
                        onClick={() => setView("full-map")}
                    >
                        Full Map View
                    </button>
                </div>
                <div className="row">
                    {view === "split" && (
                        <>
                            <div className="col-md-6 left-side">
                                <h2>Content Cards</h2>
                                <ContentPage query={query} priceRange={priceRange} />
                            </div>
                            <div className="col-md-6 right-side">
                                <h2>Map</h2>
                                {/* <MapComponent /> */}
                            </div>
                        </>
                    )}
                    {view === "full-cards" && (
                        <div className="centered-horizontal d-flex justify-content-center align-items-start">
                            <h2>Full Content View</h2>
                            <ContentPage query={query} priceRange={priceRange} />
                        </div>
                    )}
                    {view === "full-map" && (
                        <div className="col-12">
                            <h2>Full Map View</h2>
                            {/* <MapComponent /> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
            );
}

            export default SearchResult