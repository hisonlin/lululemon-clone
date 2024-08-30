import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const OrderConfirmation = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);
    return (

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem',
                fontWeight: '700',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap:'1rem'
            }}>
                Thank you for your order!
                <a href={'/'}>Continue Shopping</a>
            </div>



    )
        ;
};

export default OrderConfirmation;