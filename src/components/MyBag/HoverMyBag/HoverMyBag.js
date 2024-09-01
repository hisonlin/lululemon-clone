import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import HoverMyBagCard from "../HoverMyBagCard/HoverMyBagCard";
import CloseIcon from "@mui/icons-material/Close";

const HoverMyBag = ({closeBag, position, right, width, height, top}) => {
    const [bag, setBag] = useState(JSON.parse(localStorage.getItem('bag')) || []);
    const subtotal = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = bag.reduce((acc, item) => acc + item.quantity, 0);

    const navigate = useNavigate();
    const navigateToMyBag = () => {
        navigate('/mybag');
    }

    const updateBag = (updatedBag) => {
        setBag(updatedBag);
        localStorage.setItem('bag', JSON.stringify(updatedBag));
    };

    return (
        <div style={{
            width:`${width}`,
            height:`${height}`,
            overflowY: 'scroll',
            padding: '0 2rem 2rem 2rem',
            background: "white",
            zIndex: '9999',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            position: `${position}`,
            right: right && `${right}`,
            top: top && `${top}`
        }}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontSize: '1.5rem', fontWeight: '700', padding: '1rem 0'}}>Item(s) In Your Bag</div>
                <CloseIcon style={{cursor:'pointer'}} onClick={closeBag}/>
            </div>

            <div className={'bottomLine'}></div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {bag.length>0?bag.map((item, index) => (
                    <HoverMyBagCard key={index} item={item} type={'myBag'} updateBag={updateBag}/>
                )):<div style={{padding: '1rem', display:'flex',justifyContent:'center', alignItems:'center', height:'300px'}}>No items in your bag</div>}

            </div>
            <div className={'bottomLine'} style={{marginBottom: '1rem'}}></div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: '700'}}>
                <div>Subtotal ({totalItems} items)</div>
                <div>${subtotal}</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '1rem'}}>
                <div>Shipping</div>
                <div>FREE</div>
            </div>
            <button onClick={navigateToMyBag} style={{
                width: '100%',
                padding: '1rem',
                background: '#c8102e',
                color: 'white',
                fontWeight: '700',
                borderRadius:'0.25rem',
                border: 'none',
                cursor: 'pointer'
            }}>VIEW BAG & CHECKOUT
            </button>


        </div>
    );
};

export default HoverMyBag;