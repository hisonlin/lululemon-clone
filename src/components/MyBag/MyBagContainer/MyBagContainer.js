import React, {useEffect, useState} from 'react';
import MyBagFullCard from "../MyBagFullCard/MyBagFullCard";
import MyBagSummary from "../MyBagSummary/MyBagSummary";
import './MyBagContainer.css';
import MyBagSmallCard from "../MyBagSmallCard/MyBagSmallCard";
import {useNavigate} from "react-router-dom";

const MyBagContainer = () => {

    const [bag, setBag] = useState(JSON.parse(localStorage.getItem('bag')) || []);
    const [saveForLater, setSaveForLater] = useState(JSON.parse(localStorage.getItem('saveForLater')) || []);

    const subtotal = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1100);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

    }, []);

    const updateBag = (updatedBag) => {
        setBag(updatedBag);
        localStorage.setItem('bag', JSON.stringify(updatedBag));
    };

    const updateSaveForLater = (updatedSaveForLater) => {
        setSaveForLater(updatedSaveForLater);
        localStorage.setItem('saveForLater', JSON.stringify(updatedSaveForLater));
    }

    const navigate = useNavigate();
    const handleCheckOut = () => {
        navigate('/checkout');
    }

    return (
        <>
            {bag.length === 0 && saveForLater.length === 0 ? (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh'
                    }}
                >
                    <div style={{fontSize: '2rem'}}>Your bag is empty</div>
                </div>
            ) : (
                <div className={'bagContainer'}>
                    <div className={'bagCardContainer'}>
                        {bag.length > 0 && (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <div className={'bagTitle'} style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                        <div >My Bag</div>
                                        <div style={{fontWeight:'normal'}}>{bag.length} item(s)</div>
                                    </div>
                                    {isSmallScreen&&<div className={'bagTitle'}>
                                        ${subtotal} CAD
                                    </div>}
                                </div>


                                {isSmallScreen && <button className={'checkOutBtn'} onClick={handleCheckOut}>
                                    <img src="/logo-for-checkout.png" alt=""/>CHECKOUT
                                </button>}
                                {bag.map((item, index) => (
                                    isSmallScreen ? <MyBagSmallCard key={index} item={item} type={'bag'} updateBag={updateBag} updateSaveForLate={updateSaveForLater}/> :
                                        <MyBagFullCard key={index} item={item} type={'bag'} updateBag={updateBag} updateSaveForLate={updateSaveForLater}/>
                                ))}
                            </div>
                        )}
                        {saveForLater.length > 0 && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column', gap:'1rem', padding:'1rem', background: '#c4c4c4', marginTop: '2rem'}}>
                                <div style={{fontSize: '2rem', fontWeight: '700'}}>Save For Later</div>
                                {saveForLater.map((item, index) => (
                                   isSmallScreen ? <MyBagSmallCard key={index} item={item} type={'saveForLater'} updateBag={updateBag} updateSaveForLate={updateSaveForLater}/> :
                                        <MyBagFullCard key={index} item={item} type={'saveForLater'} updateBag={updateBag} updateSaveForLate={updateSaveForLater}/>
                                ))}
                            </div>
                        )}
                    </div>
                    {bag.length > 0 && (
                        <div className={'bagSummaryContainer'}>
                            <MyBagSummary subtotal={subtotal}/>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MyBagContainer;




