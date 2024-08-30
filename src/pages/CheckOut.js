import React, {useEffect} from 'react';
import './CheckOut.css';
import MyBagHeader from "../components/MyBag/MyBagHeader/MyBagHeader";
import CheckOutContainer from "../components/CheckOut/CheckOutContainer/CheckOutContainer";
import {useNavigate} from "react-router-dom";

const CheckOut = () => {
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
            <CheckOutContainer/>

        </div>
    );
};

export default CheckOut;