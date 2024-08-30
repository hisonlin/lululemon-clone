import React, {useEffect, useState} from 'react';
import ProductCarousel from './ProductCarousel';
import ProductInfo from './ProductInfo.jsx';
import YouMayAlsoLikeVertical from "../YouMayAlsoLikeVertical/YouMayAlsoLikeVertical";
import './OneProductMain.css';


const OneProductMain = ({product, initialColorIndex, isSmallScreen}) => {
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
        <div className={'oneProductMainContainer'} style={{padding: '24px'}}>
            <div className={'oneProductMainLeft'}>
                <ProductCarousel imagesArray={imagesArray} initialColorIndex={initialColorIndex}/>
            </div>
               <div className={'oneProductMainCenter'}>
                <ProductInfo
                    product={product}
                    initialColorIndex={initialColorIndex}
                    colorNamesArray={colorNamesArray}
                    colorImagesArray={colorImagesArray}
                    sizeArray={sizeArray}
                    image={imagesArray[initialColorIndex]&&imagesArray[initialColorIndex][0]}
                    isSmallScreen={isSmallScreen}
                />
            </div>
            <div className={'oneProductMainRight'}>
                <YouMayAlsoLikeVertical productId={product.productId}/>
            </div>

        </div>
    );
};

export default OneProductMain;