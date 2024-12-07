// src/services/airbnbService.js
import express from 'express';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.use(limiter);

// Configuration for Airbnb API requests
const AIRBNB_API_BASE_URL = 'https://airbnb13.p.rapidapi.com';
const config = {
    async: true,
	crossDomain: true,
	url: 'https://airbnb13.p.rapidapi.com/search-geo?ne_lat=52.51&ne_lng=13.41&sw_lat=52.41&sw_lng=13.31&checkin=2025-01-12&checkout=2025-01-13&adults=1&children=0&infants=0&pets=0&page=1&currency=USD',
	method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'airbnb13.p.rapidapi.com'
  }
};

// Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Internal server error',
      status: error.status || 500
    }
  });
};

// Get listings with filters
router.get('/search', async (req, res, next) => {
  try {
    const {
      location,
      checkin,
      checkout,
      adults = 1,
      children = 0,
      pets = 0,
      page = 1,
      currency = 'USD'
    } = req.query;

    // Create cache key from query parameters
    const cacheKey = `listings-${location}-${checkin}-${checkout}-${adults}-${children}-${pets}-${page}-${currency}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Validate required parameters
    if (!location || !checkin || !checkout) {
      throw { status: 400, message: 'Missing required parameters' };
    }

    const response = await axios.get(`${AIRBNB_API_BASE_URL}/search-location`, {
      ...config,
      params: {
        location,
        checkin,
        checkout,
        adults,
        children,
        pets,
        page,
        currency
      }
    });

    // Cache the response
    cache.set(cacheKey, response.data);
    
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Get detailed information for a specific listing
router.get('/listings/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cacheKey = `listing-${id}`;

    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${AIRBNB_API_BASE_URL}/listing`, {
      ...config,
      params: { id }
    });

    // Cache the response
    cache.set(cacheKey, response.data);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Get reviews for a specific listing
router.get('/listings/:id/reviews', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = `reviews-${id}-${page}-${limit}`;

    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${AIRBNB_API_BASE_URL}/reviews`, {
      ...config,
      params: { 
        id,
        page,
        limit
      }
    });

    // Cache the response
    cache.set(cacheKey, response.data);

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

export default router;