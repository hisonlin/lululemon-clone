import React from 'react';
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import OrderSummary from "../OrderSummary/OrderSummary";
import './CheckOutContainer.css';

const CheckOutContainer = () => {
    return (
        <div>
            <div style={{fontSize: '2rem', fontWeight: '700', textAlign:'center', margin:'2rem 0'}}>Checkout</div>
            <div className={'checkOutContainer'}>
                <div className={'checkOutLeft'}>
                    <CheckOutForm/>
                </div>
                < div className={'checkOutRight'}>
                    <OrderSummary/>
                </div>
            </div>
        </div>
    );
};

export default CheckOutContainer;