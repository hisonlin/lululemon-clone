import React, {useEffect} from 'react';
import MyBagHeader from "../components/MyBag/MyBagHeader/MyBagHeader";
import './MyBag.css';
import MyBagContainer from "../components/MyBag/MyBagContainer/MyBagContainer";
import {useNavigate} from "react-router-dom";


const MyBag = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);


    return (
        <div className={'myBagContainer'}>
            <MyBagHeader/>
            <MyBagContainer/>
        </div>

    );
};

export default MyBag;