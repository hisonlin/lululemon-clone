import React, {useEffect, useState} from "react";
import {Grid, Typography, Box, Radio, Button} from '@mui/material';
import "./ProductInfo.scss";
import MySize from "../../../icons/Mysize";
import ShippingOptions from "./ShippingOptions.jsx";
import AddandReview from "./AddandReview.jsx";
import {useDispatch} from "react-redux";
import oneProductAction from "../../../actions/oneProductAction";
import ColorOption from "./ColorOption";
import SizeOption from "./SizeOption";
import ProductTitle from "./ProductTitle/ProductTitle";


const ProductInfo = ({product, initialColorIndex, colorNamesArray, colorImagesArray, sizeArray, image, isSmallScreen}) => {
// console.log('product:', product);

    const item = {
        productId: '',
        color: 0,
        size: '',
        price: 0,
        quantity: 1,
        image: '',
        name: '',
        colorName: '',
        colorImagesArray: [],
        colorNamesArray: [],
        sizeArray: [],
        productImages: []
    }
    // console.log('initialColorIndex:', initialColorIndex);
    const [selectedItem, setSelectedItem] = useState(item);

    useEffect(() => {
        if (!product || !product.images || product.images.length === 0) {
            return;
        }

        // Ensure price is defined and is a string
        const priceString = product.price || '';
        const removeDollarSign = priceString.replace('$', '');
        const priceInInt = parseInt(removeDollarSign, 10) || 0;

        // Ensure that product images are available and process them
        const productImages = product.images.map(image =>
            image.mainCarousel.media.split('|').map(img => img.trim())
        );

        // Now, safely set the selected item state
        setSelectedItem(prevState => ({
            ...prevState,
            productId: product.productId || '',
            color: initialColorIndex,
            price: priceInInt,
            name: product.name || '',
            image: image,
            colorName: colorNamesArray[initialColorIndex] || '',
            colorImagesArray: colorImagesArray,
            colorNamesArray: colorNamesArray,
            sizeArray: sizeArray,
            productImages: productImages,
            size:''
        }));
    }, [product, initialColorIndex, image, colorNamesArray, colorImagesArray, sizeArray]);


    const handleSizeSelection = (size) => {
        setSelectedItem(prev => ({
            ...prev,   // Preserve the current state
            size: size      // Update only the size
        }));
    };

    const handleColorSelection = (index) => {
        const colorName = colorNamesArray[index];
        const images = product.images[index].mainCarousel.media.split('|').map(image => image.trim());
        setSelectedItem(prev => ({
            ...prev,   // Preserve the current state
            color: index,  // Update only the color
            colorName: colorName,
            image: images[0],

        }));
    }

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('ProductInfo selectedItem:', selectedItem);
        dispatch(oneProductAction.selectedItem(selectedItem))
    }, [selectedItem, dispatch]);

    return (
        <div className={'productInfoContainer'}>
            <Grid  sx={{marginLeft: {md: 6}}}>
                {!product ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <Typography>Loading product information...</Typography>
                    </Box>
                ) : (
                    <Box className="infoSection">
                        {!isSmallScreen&&<ProductTitle product={product}/>}
                        <Typography variant="body2" fontWeight="bold"  sx={{mt: '2rem'}}>
                            Colour <span style={{fontWeight: 'normal'}}>{colorNamesArray[selectedItem.color]}</span>
                        </Typography>
                        {/* start of radio buttons */}
                        <ColorOption images={colorImagesArray} selectedItem={selectedItem}
                                     handleColorSelection={handleColorSelection}/>
                        {/* start of the sizes chart */}
                        <div className="sizeCaption">
                            <Typography variant="body2" fontWeight='bold' >Select Size</Typography>
                            <Typography id="sizeGuide" variant="body2" fontWeight='bold'>Size Guide</Typography>
                        </div>

                        <SizeOption sizeArray={sizeArray} selectedItem={selectedItem}
                                    handleSizeSelection={handleSizeSelection}/>
                        <Typography variant="body2" sx={{mb: 3}}>
                            Size sold out? Select size to get notified
                        </Typography>
                        <Box className="mysizeCaption">
                            <div className="sizeIcon"><MySize/></div>
                            <Typography variant="caption"
                                        sx={{textDecoration: 'underline', paddingBottom: 'none', mb: 2}}>
                                What's My Size?
                            </Typography>
                        </Box>
                        {/* End of sizeChart */}
                        {/* Start of Shipping info */}
                        <ShippingOptions/>
                        {/* End of Shipping info */}
                        {/* Start of Add and Review section */}
                        <AddandReview
                            featureIcon={product.featureTitles?.map(feature => feature.iconPath) ?? []}
                            featureTitle={product.featureTitles?.map(feature => feature.title) ?? []}
                            isSmallScreen={isSmallScreen}
                        />
                    </Box>
                )}
            </Grid>
        </div>
    )
}

export default ProductInfo