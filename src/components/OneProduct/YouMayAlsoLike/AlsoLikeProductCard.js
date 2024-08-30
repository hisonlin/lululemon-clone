import React, {useState} from 'react';
import ColorCarousel from "../../product/ColorCarousel/ColorCarousel";
import {useNavigate} from "react-router-dom";
import './AlsoLikeProductCard.css';

const AlsoLikeProductCard = ({product, images, colorImages, colorNames, isSmallScreen}) => {
    // console.log(product)

    const [imageIndex, setImageIndex] = useState(0);
    // console.log('imageIndex:', imageIndex)

    const [isHovered, setIsHovered] = useState(false);

    const [showCarousel, setShowCarousel] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Helper function to safely access image source
    const getImageSrc = () => {
        if (images && images[imageIndex]) {
            // Use conditional chaining and nullish coalescing
            return images[imageIndex][isHovered ? 1 : 0] ?? undefined;
        }
        return undefined;
    };

    // Handler to update the image index locally
    const handleColorMouseEnter = (index) => {
        setImageIndex(index);
    };

    const isShowCarousel = () => {
        setShowCarousel(!showCarousel);

    }

    const navigate = useNavigate()

    const handleSelectProduct = () => {
        console.log('colorNames:', colorNames)
        navigate(`/product/${product.productId}/${colorNames[imageIndex]} `)
    }
    return (

        <div className={'alsoLikeCard'}
             onClick={handleSelectProduct}
             onMouseEnter={isShowCarousel}
             onMouseLeave={isShowCarousel}>
            <div className={'alsoLikeProductImageContainer'} onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                <img className={'alsoLikeProductImage'} src={getImageSrc()} alt=""/>
                {showCarousel && <div className={'carouselContainer'}>
                    <ColorCarousel colorImages={colorImages} colorMouseEnter={handleColorMouseEnter} isSmallScreen={isSmallScreen}/>
                </div>}
            </div>

            <div className={'alsoLikeProductInfo'}>
                <div className={'alsoLikeProductName'}>{product.name}</div>
                <div className="alsoLikeProductPrice">{product.price}</div>
            </div>
        </div>

    );
};

export default AlsoLikeProductCard;