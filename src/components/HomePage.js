import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={'/images/home2.png'} 
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={'/images/home.png'}
                alt="Second slide"
                />
            </Carousel.Item>
        </Carousel>
    )
} 

export default HomePage;

