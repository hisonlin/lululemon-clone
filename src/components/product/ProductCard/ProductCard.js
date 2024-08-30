import React, { useState } from 'react';
import './ProductCard.css';
import ColorCarousel from "../ColorCarousel/ColorCarousel";
import HeartIcon from "../../../icons/HeartIcon";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProductCard = ({ product, images, colorImages, index, isSmallScreen}) => {
    // console.log('product:', product)
    console.log('images:', images)
    const updatedImages = images?.map(imageArray =>
        imageArray.map(imageUrl =>
            imageUrl.replace(
                'http://api-lulu.hibitbyte.com/static/images',
                'https://your-proxy-server.vercel.app/images'
            )
        )
    );
    console.log('images:', images)

    const [imageIndex, setImageIndex] = useState(0);
    // console.log('imageIndex:', imageIndex)

    const [isHovered, setIsHovered] = useState(false);

     const colorNamesArray = useSelector(state => state.productReducer.colorNamesArray);
    // console.log('colorNamesArray:', colorNamesArray)

    // Ensure price is defined and is a string
    const price = product.price ? product.price.split('') : [];
    const formattedPrice = price.slice(0, -4).join('');

    // Check the structure of the images array
    // console.log('images:', images);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Helper function to safely access image source
    const getImageSrc = () => {
        if (updatedImages&&updatedImages[imageIndex]) {
            // Use conditional chaining and nullish coalescing
            return updatedImages[imageIndex][isHovered ? 1 : 0] ?? undefined;
        }
        return undefined;
    };

    // Handler to update the image index locally
    const handleColorMouseEnter = (index) => {
        setImageIndex(index);
    };

    const navigate = useNavigate()

    const handleSelectProduct= () => {
        navigate(`/product/${product.productId}/${colorNamesArray[index][imageIndex]} `)
    }

    return (
        <div className={'card'} onClick={handleSelectProduct}>
            <div className={'productImageContainer'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img className={'productImage'} src={getImageSrc()} alt=""/>
                <div className={'favButton'}>
                    <HeartIcon size={isSmallScreen ? 16 : 24} />
                </div>
            </div>
            <ColorCarousel colorImages={colorImages} colorMouseEnter={handleColorMouseEnter} isSmallScreen={isSmallScreen}/>
            <div className={'productInfo'}>
                <div className={'productName'}>{product.name}</div>
                <div className="productPrice">{formattedPrice}</div>
                {isSmallScreen&&<div style={{marginTop:'1rem', fontSize:'0.7rem', }}>{colorImages&&colorImages.length} colours</div>}
            </div>
        </div>
    );
};

export default ProductCard;
