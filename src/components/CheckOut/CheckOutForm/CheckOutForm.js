import React, {useEffect} from 'react';
import "./CheckOutForm.css";
import UserIcon from "../../../icons/UserIcon";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import checkoutAction from "../../../actions/checkoutAction";

const CheckOutForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            setUserInfo(prevState => ({
                ...prevState,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                city: user.city,
                province: user.province,
                postalCode: user.postalCode,
            }));
        }
    }, []);

    const [userInfo, setUserInfo] = React.useState({});
    console.log('userInfo:', userInfo);
    const [errors, setErrors] = React.useState({});
    console.log('errors:', errors);

    // Map field labels to their corresponding keys in userInfo
    const requiredFields = {
        'Email': 'email',
        'First Name': 'firstName',
        'Last Name': 'lastName',
        'Phone': 'phone',
        'Address': 'address',
        'City': 'city',
        'Province': 'province',
        'Postal Code': 'postalCode'
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '', // Clear the error message when the user starts typing
        });
    };

    const handleNextStep = () => {
        const newErrors = {};

        // Check each required field
        for (const [label, key] of Object.entries(requiredFields)) {
            if (!userInfo[key]) {
                newErrors[key] = `${label} is required`;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            dispatch(checkoutAction.updateUserInfo(userInfo));
            navigate('/payment');
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div className={'formSection'}>
                <div className={'formTitle'}>Contact information</div>
                <div>Email address (for order notification)</div>
                <input
                    type="email"
                    className={'formInput'}
                    name="email"
                    value={userInfo.email || ''}
                    onChange={handleInputChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
                <div>
                    <input type="checkbox" style={{cursor: 'pointer'}}/>
                    <label htmlFor="emailSubscription">
                        Sign me up for lululemon emails (you can unsubscribe at any time). See our privacy policy for
                        details.
                    </label>
                </div>
            </div>
            {!user&&<div className={'formSection'}>
                <div className={'formTitle'} style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <UserIcon/>
                    <div>Have an account?</div>
                </div>
                <div><span style={{fontWeight: '700', textDecoration: 'underline', cursor: 'pointer'}}>Log in</span> to
                    checkout more quickly and easily
                </div>
            </div>}
            <div className={'formSection'}>
                <div className={'formTitle'}>Shipping address</div>
                <form>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput1'}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className={'formInput'}
                                value={userInfo.firstName || ''}
                                onChange={handleInputChange}
                            />
                            {errors.firstName && <div className="error">{errors.firstName}</div>}
                        </div>
                        <div className={'formInfoInput1'}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className={'formInput'}
                                value={userInfo.lastName || ''}
                                onChange={handleInputChange}
                            />
                            {errors.lastName && <div className="error">{errors.lastName}</div>}
                        </div>
                    </div>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput'} style={{width: '100%'}}>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className={'formInput'}
                                value={userInfo.phone || ''}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <div className="error">{errors.phone}</div>}
                        </div>
                    </div>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput'} style={{width: '100%'}}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className={'formInput'}
                                value={userInfo.address || ''}
                                onChange={handleInputChange}
                            />
                            {errors.address && <div className="error">{errors.address}</div>}
                        </div>
                    </div>
                    <div className={'formInputRow'}>
                        <div className={'formInfoInput2'}>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className={'formInput'}
                                value={userInfo.city || ''}
                                onChange={handleInputChange}
                            />
                            {errors.city && <div className="error">{errors.city}</div>}
                        </div>
                        <div className={'formInfoInput2'}>
                            <label htmlFor="province">Province</label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                className={'formInput'}
                                value={userInfo.province || ''}
                                onChange={handleInputChange}
                            />
                            {errors.province && <div className="error">{errors.province}</div>}
                        </div>
                        <div className={'formInfoInput2'}>
                            <label htmlFor="postalCode">Postal code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                className={'formInput'}
                                value={userInfo.postalCode || ''}
                                onChange={handleInputChange}
                            />
                            {errors.postalCode && <div className="error">{errors.postalCode}</div>}
                        </div>
                    </div>
                </form>
            </div>
            <div className={'formSection'}>
                <div className={'formTitle'}>Shipping & gift options</div>
                <div>2-7 business days</div>
                <div>Standard Shipping (FREE)</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
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
                        onClick={handleNextStep}>GO TO NEXT STEP
                </button>
                <div style={{fontSize: '12px', color: 'rgba(48,48,48,0.3)'}}>Proceed to step 2 of 3</div>
            </div>
        </div>
    );
};

export default CheckOutForm;

