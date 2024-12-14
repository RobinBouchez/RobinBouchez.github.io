import React from "react";
import Carousel from 'react-bootstrap/Carousel';

import './imageCarousel.css'

function ImageCarousel() {
    return (
        <Carousel className="carousel">
            <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1599043627490-6725d0a01067?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alternatetext" />
            </Carousel.Item>
            <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1599043627490-6725d0a01067?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alternatetext" />
            </Carousel.Item>
            <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1599043627490-6725d0a01067?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alternatetext" />
            </Carousel.Item>
        </Carousel>
    );

}

export default ImageCarousel;