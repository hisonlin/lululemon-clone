import React from 'react';
import './AddToBag.css'
import {useSelector} from "react-redux";
import ShoppingBagIcon from "../../../icons/ShoppingBag";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";


const AddToBag = ({close}) => {
    const handleBackgroundClick = (e) => {
        // If the clicked element is the container, close the modal
        if (e.target.className === 'addToBagBackGround') {
            close();
        }
    };

    const reduxSelectedItem = useSelector(state => state.oneProductReducer.selectedItem);
    const bag = useSelector(state => state.bagReducer.bag);
    // console.log('bag:', bag);
    const product = useSelector(state => state.oneProductReducer.product);
    // console.log('product:', product);

    const images = product.images[reduxSelectedItem.color].mainCarousel.media.split('|').map(image => image.trim());
    const image = images[0];

    const subtotal = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // console.log('subtotal:', subtotal)

    const totalItems = bag.reduce((acc, item) => acc + item.quantity, 0);

    const navigate = useNavigate();

    const navigateToMyBag = () => {
        navigate('/mybag');
    }


    return (
        <div className={'addToBagBackGround'} onClick={handleBackgroundClick}>
            <div className={'addToBagContainer'}>
                <div className={'topBar'}>
                    <div className={'addToBagHeader'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>Added To Your Bag</div>
                            <ShoppingBagIcon/>
                        </div>

                        <div>{totalItems} item(s)</div>
                    </div>
                    <CloseIcon onClick={close} style={{cursor: 'pointer'}}/>
                </div>
                <div className={'horizontalBorder'}></div>
                <div className={'addToBagContent'}>
                    <div style={{display:'flex', gap:'1rem', width:'100%', padding:'0 1rem'}}>
                        <div>
                            <img src={image} alt="" width={'150px'}/>
                        </div>
                        <div className={'bagProductInfo'}>
                            <div style={{fontWeight: '700'}}>{product.name}</div>
                            <div style={{fontWeight: '700'}}>{product.swatches[reduxSelectedItem.color].swatchAlt}</div>
                            <div>Size: {reduxSelectedItem.size}</div>
                            <div>{product.price}</div>
                        </div>
                    </div>
                    <div className={'verticalBorder'}></div>
                    <div className={'checkOut'}>
                        <div className={'subtotal'}>
                            <div>Subtotal</div>
                            <div>${subtotal} CAD</div>
                        </div>
                        <button className={'checkOutBtn'} onClick={navigateToMyBag}>VIEW BAG & CHECKOUT</button>
                        <div className={'continue'} onClick={close}>
                            <div style={{fontSize: '1rem', fontWeight: '700', cursor: "pointer"}}>CONTINUE SHOPPING
                            </div>
                            <ArrowForwardIcon style={{color: '#c8102e', cursor: "pointer"}}/>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AddToBag;