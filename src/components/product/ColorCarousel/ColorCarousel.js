import React, {useState, useEffect, useRef} from 'react';
import './ColorCarousel.css';

const ColorCarousel = ({colorImages, colorMouseEnter, isSmallScreen}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [imagesToShow, setImagesToShow] = useState(0);

    const leftArrowRef = useRef(null);
    const rightArrowRef = useRef(null);

    useEffect(() => {
        // Function to set imagesToShow and endIndex based on screen width
        const handleEndIndex = () => {
            if (window.innerWidth > 1130) {
                setImagesToShow(7);
                setEndIndex(6);
            } else if (window.innerWidth > 985) {
                setImagesToShow(6);
                setEndIndex(5);
            } else {
                setImagesToShow(colorImages && colorImages.length); // Show all images on small screens
                setEndIndex(colorImages && colorImages.length - 1);
            }
        };

        handleEndIndex(); // Initialize on mount
        window.addEventListener('resize', handleEndIndex); // Add listener for resize

        return () => {
            window.removeEventListener('resize', handleEndIndex); // Clean up on unmount
        };
    }, [isSmallScreen, colorImages]);

    useEffect(() => {
        if (colorImages) {
            setTotalImages(colorImages.length);
        }
    }, [colorImages]);

    const handleLeftClick = (e) => {
        e.stopPropagation(); // Stop event propagation
        if (startIndex > 0) {
            // Move left by a full page of imagesToShow
            setStartIndex(Math.max(startIndex - imagesToShow, 0));
            setEndIndex(Math.max(startIndex - 1, imagesToShow - 1));
        }
    };

    const handleRightClick = (e) => {
        e.stopPropagation(); // Stop event propagation
        if (endIndex < totalImages - 1) {
            // Move right by the number of images currently displayed
            setStartIndex(startIndex + imagesToShow);
            setEndIndex(Math.min(endIndex + imagesToShow, totalImages - 1));
        }
    };

    return (
        <div className="carousel">
            {!isSmallScreen && colorImages && totalImages > imagesToShow && (
                <button className="carousel-arrow left-arrow"
                        onClick={handleLeftClick}
                        ref={leftArrowRef}
                        disabled={startIndex === 0}>
                    &lt;
                </button>
            )}
            <div className={`carousel-images ${isSmallScreen ? 'scrollable' : ''}`}>
                {colorImages && colorImages.slice(isSmallScreen ? 0 : startIndex, isSmallScreen ? colorImages.length : endIndex + 1).map((colorImage, index) => (
                    <div className={'imageContainer'}
                         key={index}
                         onMouseEnter={() => colorMouseEnter(index + startIndex)}>
                        <img
                            className={'colorImage'}
                            src={colorImage}
                            alt=""
                        />
                    </div>
                ))}
            </div>
            {!isSmallScreen && colorImages && totalImages > imagesToShow && (
                <button className="carousel-arrow right-arrow"
                        onClick={handleRightClick}
                        ref={rightArrowRef}
                        disabled={endIndex >= totalImages - 1}>
                    &gt;
                </button>
            )}
        </div>
    );
};

export default ColorCarousel;
