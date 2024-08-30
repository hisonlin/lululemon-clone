import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const EditItemCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div style={{ position: 'relative' }}>
            <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                style={{width: '100%'}}
            />
            <KeyboardArrowRightIcon
                onClick={handleNextImage}
                style={{
                    color: 'black',
                    background: 'white',
                    borderRadius: '5%',
                    border: 'none',
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    fontSize: '40px',
                }}
            />
        </div>
    );
};

export default EditItemCarousel;
