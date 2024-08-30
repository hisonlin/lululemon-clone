import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import './FullScreenProduct.css';
import {useSelector} from "react-redux";

const FullScreenProduct = ({close}) => {
    const reduxSelectedItem = useSelector(state => state.oneProductReducer.selectedItem);
    const product = useSelector(state => state.oneProductReducer.product);
    const images = product.images[reduxSelectedItem.color].mainCarousel.media.split('|').map(image => image.trim());
    return (
        <div className={'fullScreenBackground'}>
            <div className={'fullScreenContainer'}>
                <div className={'fullScreenHeader'}>
                    <div className={'backToProduct'} onClick={close}>
                        <ArrowBackIosIcon/>
                        <div>Back to Product</div>
                    </div>
                    <div className={'fullScreenProductName'}>{product.name} - {product.swatches[reduxSelectedItem.color].swatchAlt}</div>
                    <CloseIcon className='closeIcon' onClick={close} />
                </div>
                <div className={'fullScreenImages'}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="" className={'fullScreenImage'}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FullScreenProduct;