import React from "react";
import Carousel from 'react-bootstrap/Carousel';

import './carousel.css'

function CarouselComponent() {
    return (
        <Carousel className="carousel">
            <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1599043627490-6725d0a01067?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alternatetext" />
                <Carousel.Caption className="caption">
                <h3>Student Dorm</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1599043627490-6725d0a01067?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alternatetext" />
            <Carousel.Caption className="caption">
            <h3>Student Dorm</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img src="https://images.unsplash.com/photo-1599043627490-6725d0a01067?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alternatetext" />
            <Carousel.Caption className="caption">
                    <h3>Student Dorm</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );

}

export default CarouselComponent;