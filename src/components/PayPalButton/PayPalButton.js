import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import bagAction from '../../actions/bagAction';
import axios from 'axios';

function PayPalButton() {
    const [isSdkReady, setSdkReady] = useState(false);
    const bag = JSON.parse(localStorage.getItem('bag')) || [];
    const totalPrice = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Use a ref to keep track of whether the PayPal buttons have been initialized
    const paypalButtonsRendered = useRef(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to load PayPal SDK dynamically
    const addPayPalSdk = () => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=CAD&locale=en_US`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
    };

    useEffect(() => {
        // Only add the PayPal script if it is not ready
        if (!isSdkReady) {
            addPayPalSdk();
        }
        return () => {
            const paypalScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
            if (paypalScript) {
                paypalScript.remove(); // Clean up PayPal SDK script
            }
        };
    }, [isSdkReady]);

    useEffect(() => {
        if (isSdkReady && !paypalButtonsRendered.current) {
            // Only render PayPal buttons if they have not been rendered yet
            window.paypal.Buttons({
                // Create the PayPal order
                createOrder: async function () {
                    try {
                        // Sending totalPrice to the backend when creating an order
                        const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/paypal/create-order`, {
                            totalPrice: totalPrice,  // Send total price to backend
                            user: 1
                        });
                        const { id } = res.data; // Destructure the order ID
                        return id; // Return the PayPal order ID to the SDK
                    } catch (error) {
                        console.error('Error creating PayPal order:', error);
                        alert('Error creating PayPal order.');
                    }
                },
                // Capture the PayPal order after approval
                onApprove: async function (data) {
                    try {
                        const res = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/paypal/capture-order`, {
                            orderID: data.orderID  // Pass PayPal orderID for capture
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const result = res.data;
                        if (result.status === 'COMPLETED') {
                            navigate('/order-confirmation');
                            localStorage.removeItem('bag');
                            dispatch(bagAction.clearBag());
                        } else {
                            alert('Payment failed!');
                        }
                    } catch (error) {
                        console.error('Error capturing PayPal order:', error);
                        alert('Error capturing PayPal order.');
                    }
                }
            }).render('#paypal-button-container');

            // Set the ref to true to indicate PayPal buttons have been rendered
            paypalButtonsRendered.current = true;
        }
    }, [isSdkReady, totalPrice]); // Rerun the effect when SDK is ready or totalPrice changes

    return <div id="paypal-button-container"></div>;
}

export default PayPalButton;

