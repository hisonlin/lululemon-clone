import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AlsoLikeProductCard from "./AlsoLikeProductCard";
import productAction from "../../../actions/productAction";
import './YouMayAlsoLike.css';

const YouMayAlsoLike = ({ productId, isSmallScreen}) => {

    const productsShowing = useSelector(state => state.productReducer.productsShowing);
    // console.log('productsShowing:', productsShowing);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [imagesArray, setImagesArray] = useState([]);
    const [colorImagesArray, setColorImagesArray] = useState([]);
    const[ colorNamesArray, setColorNamesArray] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        // Filter out the product with the given productId and take the first 4 products
        const products = productsShowing.filter(product => product.productId !== productId).slice(0, 4);
        setFilteredProducts(products);
        if (products.length > 0) {
            dispatch(productAction.getImages(products));
            dispatch(productAction.getColorInfo(products));
        }
    }, [productId, productsShowing, dispatch]);

    const reduxImagesArray = useSelector(state => state.productReducer.imagesArray);
    const reduxColorImagesArray = useSelector(state => state.productReducer.colorImagesArray);
    const reduxColorNamesArray = useSelector(state => state.productReducer.colorNamesArray);

    useEffect(() => {
        setImagesArray(reduxImagesArray);
        setColorImagesArray(reduxColorImagesArray);
        setColorNamesArray(reduxColorNamesArray);
    }, [reduxImagesArray, reduxColorImagesArray, reduxColorNamesArray]);

    return (
        <div>
            <div className={'alsoLikeTitle'}>
                You may also like
            </div>
            <div className={'alsoLikeCardContainer'}>
                {filteredProducts.length > 0 && filteredProducts.map((product, index) => (
                    <AlsoLikeProductCard key={index}
                                         product={product}
                                         images={imagesArray.length > 0 ? imagesArray[index] : undefined}
                                         colorImages={colorImagesArray[index]}
                                         colorNames={colorNamesArray[index]}
                                         isSmallScreen={isSmallScreen}
                    />
                ))}
            </div>
        </div>
    );
};

export default YouMayAlsoLike;
