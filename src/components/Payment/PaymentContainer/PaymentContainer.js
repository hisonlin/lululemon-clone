import React from 'react';
import OrderSummary from "../../CheckOut/OrderSummary/OrderSummary";
import PaymentForm from "../PaymentForm/PaymentForm";
import './PaymentContainer.css';

const PaymentContainer = () => {
    return (
        <div>
            <div style={{fontSize: '2rem', fontWeight: '700', textAlign: 'center', margin: '2rem 0'}}>Checkout</div>
            <div className={'paymentContainer'}>
                <div className={'paymentContainerLeft'}>
                    <PaymentForm/>
                </div>
                < div className={'paymentContainerRight'}>
                    <OrderSummary/>
                </div>
            </div>
        </div>
    );
};

export default PaymentContainer;