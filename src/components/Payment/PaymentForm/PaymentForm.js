import React from 'react';

import './PaymentForm.css'
import PayPalButton from '../../PayPalButton/PayPalButton';

const PaymentForm = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    // const dispatch = useDispatch();

    // const [cardNum, setCardNum] = useState('');
    // const [expiry, setExpiry] = useState('');
    // const [securityCode, setSecurityCode] = useState('');
    // const [name, setName] = useState('');

    // const [showCreditCardError, setShowCreditCardError] = useState(false);

    // const navigate = useNavigate();
    // const handleSubmit = () => {
    //     if (cardNum.length !== 16 || expiry.length !== 4 || securityCode.length !== 3 || name.length === 0) {
    //         setShowCreditCardError(true);
    //     } else {
    //         setShowCreditCardError(false);
    //         navigate('/order-confirmation');
    //         localStorage.removeItem('bag');
    //         dispatch(bagAction.clearBag());
    //     }

    // }


    // const handleCardNum = (e) => {
    //     setCardNum(e.target.value);
    // }
    // const handleExpiry = (e) => {
    //     setExpiry(e.target.value);
    // }
    // const handleSecurityCode = (e) => {
    //     setSecurityCode(e.target.value);
    // }
    // const handleName = (e) => {
    //     setName(e.target.value);
    // }


    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    deliveryDate = deliveryDate.toDateString();

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div className={'bottomLine'}></div>
            <div className={'paymentRow'}>
                <div className={'formTitle'}>Notifications to</div>
                <div>Email</div>
                <div>{userInfo.email}</div>
            </div>
            <div className={'bottomLine'}></div>
            <div className={'paymentRow'}>
                <div className={'formTitle'}>Sending to</div>
                <div>Address</div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                        {userInfo.firstName} {userInfo.lastName}
                    </div>
                    <div>
                        {userInfo.address}
                    </div>
                    <div>
                        {userInfo.city}, {userInfo.province}, {userInfo.postalCode}
                    </div>
                    <div>
                        {userInfo.phone}
                    </div>
                </div>
            </div>
            <div className={'bottomLine'}></div>
            <div className={'paymentRow'}>
                <div className={'formTitle'}>Estimated delivery</div>
                <div>Date</div>
                <div>
                    {deliveryDate}
                </div>
            </div>
            <div className={'bottomLine'}></div>
            <div className={'formTitle'}>Payment Method</div>
            {/* <CreditCardForm setCardNum={handleCardNum}
                            setExpiry={handleExpiry}
                            setSecurityCode={handleSecurityCode}
                            setName={handleName}
                            cardNum={cardNum}
                            expiry={expiry}
                            securityCode={securityCode}
                            name={name}
                            showCreditCardError={showCreditCardError}
            /> */}
            <PayPalButton />
            <div className={'bottomLine'}></div>
            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                <button style={{
                    width: '50%',
                    padding: '1rem',
                    background: '#c8102e',
                    color: 'white',
                    fontWeight: '700',
                    borderRadius: '0.25rem',
                    border: 'none',
                    cursor: 'pointer'
                }}
                        onClick={handleSubmit}>
                    PLACE YOUR ORDER
                </button>
            </div> */}
        </div>
    );
};

export default PaymentForm;