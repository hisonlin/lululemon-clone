import React, {useEffect} from 'react';
import MyBagHeader from "../components/MyBag/MyBagHeader/MyBagHeader";
import PaymentContainer from "../components/Payment/PaymentContainer/PaymentContainer";
import {useNavigate} from "react-router-dom";

const Payment = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);
    return (
        <div className={'checkOutPageContainer'}>
            <MyBagHeader/>
            <PaymentContainer/>

        </div>
    );
};

export default Payment;