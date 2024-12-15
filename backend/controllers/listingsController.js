import Listing from '../model/listing.js';

// Controller to fetch all listings with filters
export const getAllListings = async (req, res) => {
    try {
        const { query, minPrice, maxPrice } = req.query; // Get query parameters for search and price range

        let filter = {};

        // Add query-based filtering
        if (query) {
            filter.$or = [
                { city: { $regex: query, $options: "i" } }, // Case-insensitive search
                { country: { $regex: query, $options: "i" } },
                { street: { $regex: query, $options: "i" } },
            ];
        }

        // Add price range filtering
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice); // Minimum price filter
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice); // Maximum price filter
        }

        // Fetch listings based on filters
        const listings = await Listing.find(filter);

        // Transform listings for the response
        const transformedListings = listings.map((listing) => ({
            id: listing.id,
            name: `${listing.city}, ${listing.country}`,
            price: {
                total: listing.price,
                currency: "USD",
            },
            rating: 4.5, // Placeholder or computed logic
            hostThumbnail: "https://via.placeholder.com/150",
            reviewsCount: 0,
            address: `${listing.street} ${listing.houseNumber}, ${listing.city}, ${listing.country}`,
            isFavorite: false,
        }));

        // Send transformed listings as the response
        res.status(200).json(transformedListings);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch listings", details: error.message });
    }
};