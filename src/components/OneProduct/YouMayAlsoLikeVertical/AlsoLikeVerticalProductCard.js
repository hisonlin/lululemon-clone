import React from 'react';
import {useNavigate} from "react-router-dom";
import './AlsoLikeVerticalProductCard.css'

const AlsoLikeVerticalProductCard = ({product, images, colorNames}) => {
    // console.log(product)

    const navigate = useNavigate()

    const handleSelectProduct = () => {
        // console.log('colorNames:', colorNames)
        navigate(`/product/${product.productId}/${colorNames[0]} `)
    }
    return (

        <div className={'alsoLikeVerticalCard'} onClick={handleSelectProduct}>
            <div className={'alsoLikeVerticalProductImageContainer'}>
                <img className={'alsoLikeVerticalProductImage'} src={images[0][0]} alt=""/>
            </div>
            <div >
                <div>{product.name}</div>
            </div>
        </div>

    );
};

export default AlsoLikeVerticalProductCard;