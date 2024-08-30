import React, {useEffect, useState} from 'react';
import ProductTitle from "../ProductTitle/ProductTitle";
import ProductCarousel from "../ProductCarousel";
import ProductInfo from "../ProductInfo";
import WhyWeMadeThis from "../../WhyWeMadeThis/WhyWeMadeThis";
import Feature from "../../Feature/Feature";
import YouMayAlsoLike from "../../YouMayAlsoLike/YouMayAlsoLike";
import ReviewsContainer from "../../Reviews/ReviewsContainer";
import {Footer} from "../../../Footer/Footer";
import SmallerFooter from "../../../Footer/SmallFooter/SmallerFooter";

const SmallScreenOneProductMain = ({product, initialColorIndex, isSmallScreen, productId}) => {
    const [imagesArray, setImagesArray] = useState([]);
    // console.log('OneProductMain imagesArray:', imagesArray);
    // console.log('OneProductMain initialColorIndex:', initialColorIndex);

    const [sizeArray, setSizeArray] = useState([]);

    const [featureIcon, setFeatureIcon] = useState([]);

    const [featureTitle, setFeatureTitle] = useState([]);

    const [colorImagesArray, setColorImagesArray] = useState([]);

    const [colorNamesArray, setColorNamesArray] = useState([]);

    useEffect(() => {
        if (product && product.images) {
            const images = product.images.map(imageObj => {
                const images = imageObj.mainCarousel.media;
                return images.split('|').map(image => image.trim());
            });
            setImagesArray(images);
        }
        if (product && product.sizes) {
            setSizeArray(product.sizes[0].details);
        }
        if (product && product.featureTitles) {
            const featureIcons = product.featureTitles.map(feature => feature.iconPath);
            setFeatureIcon(featureIcons);
            const featureTitles = product.featureTitles.map(feature => feature.title);
            setFeatureTitle(featureTitles);
        }
        if (product && product.swatches) {
            const colorImages = product.swatches.map(color => color.swatch);
            setColorImagesArray(colorImages);
            const colorNames = product.swatches.map(color => color.swatchAlt);
            setColorNamesArray(colorNames);
        }
    }, [product]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <ProductTitle product={product}/>
            <ProductCarousel imagesArray={imagesArray} initialColorIndex={initialColorIndex}/>
            <ProductInfo
                product={product}
                initialColorIndex={initialColorIndex}
                colorNamesArray={colorNamesArray}
                colorImagesArray={colorImagesArray}
                sizeArray={sizeArray}
                image={imagesArray[initialColorIndex] && imagesArray[initialColorIndex][0]}
                isSmallScreen={isSmallScreen}
            />
            <WhyWeMadeThis product={product} initialColorIndex={initialColorIndex}/>
            <Feature product={product}/>
            <YouMayAlsoLike productId={productId} isSmallScreen={isSmallScreen}/>
            <ReviewsContainer productId={productId}/>
            {isSmallScreen ? <SmallerFooter/> : <Footer/>}
        </div>
    );
};

export default SmallScreenOneProductMain;