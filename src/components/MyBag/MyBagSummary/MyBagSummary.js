import AfterPay from "../../../icons/AfterPay";
import React from "react";
import './MyBagSummary.css';
import InfoIcon from "../../../icons/Info";
import {useNavigate} from "react-router-dom";

const MyBagSummary = ({ subtotal }) => {
    const navigate = useNavigate();

    const handleCheckOut = () => {
        navigate('/checkout');
    }
    return (
        <div className={'orderSummaryContainer'}>
            <div className={'orderSummary'}>
                <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem'}}>Order Summary</div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <div>Subtotal</div>
                    <div>${subtotal}</div>
                </div>
                <div className={'bottomLine'}></div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <div>Shipping<InfoIcon style={{marginLeft: '0.5rem'}} /></div>
                    <div>FREE</div>
                </div>
                <div className={'bottomLine'}></div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <div>Tax<InfoIcon style={{marginLeft: '0.5rem'}} /></div>
                    <div>Calculated at checkout</div>
                </div>
                <div className={'bottomLine'}></div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <div><strong>Estimated Total</strong></div>
                    <div><strong>CAD ${subtotal}</strong></div>
                </div>
                <div>or 4 payments of ${subtotal / 4} with <AfterPay/><InfoIcon style={{marginLeft: '0.5rem'}} /></div>
                <button className={'checkOutBtn'} onClick={handleCheckOut}>
                    <img src="/logo-for-checkout.png" alt=""/>CHECKOUT
                </button>
            </div>
        </div>
    )
}

export default MyBagSummary;
