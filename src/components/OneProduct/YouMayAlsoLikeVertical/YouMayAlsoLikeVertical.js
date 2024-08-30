import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import productAction from "../../../actions/productAction";
import AlsoLikeProductCard from "../YouMayAlsoLike/AlsoLikeProductCard";
import './YouMayAlsoLikeVertical.css';
import AlsoLikeVerticalProductCard from "./AlsoLikeVerticalProductCard";

const YouMayAlsoLikeVertical = ({ productId }) => {
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
            <div style={{fontSize:'12px', fontWeight:'700', marginBottom:'0.625rem'}}>
                You may also like
            </div>
            <div className={'alsoLikeVerticalCardContainer'}>
                {filteredProducts.length > 0 && filteredProducts.map((product, index) => (
                    <AlsoLikeVerticalProductCard key={index}
                                         product={product}
                                         images={imagesArray.length > 0 ? imagesArray[index] : undefined}
                                         colorImages={colorImagesArray[index]}
                                         colorNames={colorNamesArray[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default YouMayAlsoLikeVertical;