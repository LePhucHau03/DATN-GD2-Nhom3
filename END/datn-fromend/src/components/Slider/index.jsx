import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Slider = () => {
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get("https://api.unsplash.com/search/photos", {
                    params: {
                        query: "bubble tea",
                        client_id: "0sRx_iHuuBVk40GaLS1PkOCcoFxrXGDbQRtKh0MhDe0",
                    },
                });
                setImages(response.data.results);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleIndicatorClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <section className="relative z-0">
            {/* Hero content */}
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-36 z-10 relative">
                <h1 className="mb-4 text-5xl font-bold text-purple-900 md:text-6xl lg:text-7xl">
                    Discover Your Flavor Paradise
                </h1>
                <p className="mb-8 text-lg font-medium text-gray-800 lg:text-xl sm:px-16 lg:px-48">
                    Dive into the world of BubblyTea, where each sip is a delightful journey.
                    Explore our unique selection of flavors, toppings, and refreshing teas that will
                    awaken your taste buds and bring a smile to your face.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <a
                        href="#"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 transition duration-300"
                    >
                        View Our Menu
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </a>
                    <a
                        href=""
                        onClick={() => navigate("/about")}
                        className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 transition duration-300"
                    >
                        Learn More About Us
                    </a>
                </div>
            </div>

            {/* Image slider */}
            <div
                className="absolute w-full h-full top-0 left-0"
                data-carousel="slide"
            >
                <div className="relative h-full overflow-hidden">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`duration-700 ease-in-out transition-opacity ${
                                index === activeIndex ? "opacity-100" : "opacity-0 absolute"
                            }`}
                            data-carousel-item
                        >
                            <img
                                src={image.urls.full}
                                className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt={image.alt_description || `Carousel item ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Slider controls (indicators and buttons) */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-4 h-4 rounded-full transition duration-300 ${index === activeIndex ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-500'}`}
                            aria-current={index === activeIndex ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => handleIndicatorClick(index)}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                    onClick={handlePrevClick}
                >
                    <span className="text-white text-3xl">❮</span>
                </button>

                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                    onClick={handleNextClick}
                >
                    <span className="text-white text-3xl">❯</span>
                </button>
            </div>
        </section>
    );
};

export default Slider;
