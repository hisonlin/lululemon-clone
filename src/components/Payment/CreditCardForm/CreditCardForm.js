import React, {useState} from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({
                            setCardNum,
                            setExpiry,
                            setName,
                            setSecurityCode,
                            cardNum,
                            expiry,
                            securityCode,
                            name,
                            showCreditCardError
                        }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'start', gap: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'start', gap: '1rem'}}>
                    <label style={{fontWeight: '700'}}>
                        <input type={'checkbox'} checked={isChecked} onChange={handleCheckboxChange}/>
                        Pay With Credit Card
                    </label>
                    {showCreditCardError &&
                        <div style={{color: '#c8102e', fontSize: '0.8rem'}}>*Please fill in the card information in correct format.</div>}
                </div>
            </div>
            {isChecked && (
                <form id={'creditCardForm'}>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput'} style={{width: '100%'}}>
                            <label htmlFor="cardNum">Credit Card Number</label>
                            <input
                                type="number"
                                id="cardNum"
                                name="cardNum"
                                className={'formInput'}
                                value={cardNum}
                                onChange={(e) => setCardNum(e)}
                            />
                        </div>
                    </div>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput'} style={{width: '45%'}}>
                            <label htmlFor="expiry">Expiry (MMYY)</label>
                            <input
                                type="number"
                                id="expiry"
                                name="expiry"
                                className={'formInput'}
                                value={expiry}
                                onChange={(e) => setExpiry(e)}
                            />
                        </div>
                        <div className={'formInfoInput'} style={{width: '45%'}}>
                            <label htmlFor="securityCode">Security Code</label>
                            <input
                                type="number"
                                id="securityCode"
                                name="securityCode"
                                className={'formInput'}
                                value={securityCode}
                                onChange={(e) => setSecurityCode(e)}
                            />
                        </div>
                    </div>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput'} style={{width: '100%'}}>
                            <label htmlFor="name">Name On Card</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={'formInput'}
                                value={name}
                                onChange={(e) => setName(e)}
                            />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CreditCardForm;
