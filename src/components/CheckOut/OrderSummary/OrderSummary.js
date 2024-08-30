import React, {useState} from 'react';
import ShoppingBagIcon from "../../../icons/ShoppingBag";
import HoverMyBagCard from "../../MyBag/HoverMyBagCard/HoverMyBagCard";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const OrderSummary = () => {
    const [bag, setBag] = useState(JSON.parse(localStorage.getItem('bag')) || []);
    const numItems = bag.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    const updateBag = (updatedBag) => {
        setBag(updatedBag);
        localStorage.setItem('bag', JSON.stringify(updatedBag));
    };

    return (
        <div className={'formSection'}>
            <div className={'formTitle'}>Order summary</div>
            <div className={'formInputRow'}>
                <div style={{display: 'flex', alignItems: 'center', gap:'0.5rem'}}>
                    <ShoppingBagIcon/>
                    <div>{numItems} item(s)</div>
                    <div style={{cursor:'pointer', display:'flex', alignItems:'center'}} onClick={handleExpand}>
                        {expanded?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>}
                    </div>

                </div>
                <div style={{fontWeight: '700'}}>${totalPrice}</div>

            </div>
            <div className={'bottomLine'}></div>
            {expanded&&<div style={{display: 'flex', flexDirection: 'column', maxHeight: '500px', overflowY: 'auto'}}>
                {bag.map((item, index) => (
                    <HoverMyBagCard key={index} item={item} type={'checkout'} updateBag={updateBag}/>
                ))}
            </div>}
            <div className="formInputRow">
                <div>Subtotal</div>
                <div>${totalPrice}</div>
            </div>
            <div className="formInputRow">
                <div>Shipping</div>
                <div>FREE</div>
            </div>
            <div className="formInputRow">
                <div>Tax</div>
                <div>{totalPrice*0.13.toFixed(2)}</div>
            </div>
            <div className={'bottomLine'}></div>
            <div className="formInputRow" style={{fontWeight: '700'}}>
                <div>Order total</div>
                <div>CAD ${(totalPrice * 1.13).toFixed(2)}</div>

            </div>
        </div>
    );
};

export default OrderSummary;