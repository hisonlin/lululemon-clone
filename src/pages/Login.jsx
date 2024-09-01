import {TextField, Box, IconButton, InputAdornment, FormControl} from '@mui/material';
import './Login.scss'
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useEffect, useRef, useState} from "react";
import SmallScreenHeader from "../components/Header/SmallScreenHeader/SmallScreenHeader";
import MainHeader from "../components/Header/MainHeader";
import {Footer} from "../components/Footer/Footer";
import {useNavigate, useLocation } from "react-router-dom";
import SmallerFooter from "../components/Footer/SmallFooter/SmallerFooter";


function Login() {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 985);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 985);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('test@email.com');
    // console.log(email);
    const [password, setPassword] = useState('test');
    // console.log(password);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [alertMsg, setAlertMsg] = useState("");

    const emailInputRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.style.backgroundColor = isButtonDisabled ? 'gray' : '';
            buttonRef.current.style.cursor = isButtonDisabled ? 'not-allowed' : 'pointer';
        }
    }, [isButtonDisabled]);

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsButtonDisabled(false);
        }
    }, [emailError, passwordError, email, password]);

    const navigate = useNavigate();


    const login = (loginInfo) => {
        const testUserDetail = {
            email: "test@email.com",
            password: "test",
            firstName: "Test",
            lastName: "User",
            address: "123 Test St",
            city: "Test City",
            province: "Test Province",
            postalCode: "T3S T3T",
            phone: "123-456-7890",
        }

        if (loginInfo.email === testUserDetail.email && loginInfo.password === testUserDetail.password) {
            localStorage.setItem('user', JSON.stringify({
                firstName: testUserDetail.firstName,
                lastName: testUserDetail.lastName,
                email: testUserDetail.email,
                address: testUserDetail.address,
                city: testUserDetail.city,
                province: testUserDetail.province,
                postalCode: testUserDetail.postalCode,
                phone: testUserDetail.phone
            }));
            return {

                success: true
            }

        } else {
            if (loginInfo.email !== testUserDetail.email) {
                return {error: "User not found"};
            }
            if (loginInfo.password !== testUserDetail.password) {
                return {error: "Password is incorrect"};
            }
        }

    }

    const location = useLocation();
    const from = location.state?.from || '/';

    const handleOnClick = async (event) => {
        event.preventDefault();

        const result = login({email, password});

        if (result?.success) {
            navigate(from);
        } else if (result?.error === 'User not found') {
            setAlertMsg('User not found. Please try again.');
        } else if (result?.error === 'Password is incorrect') {
            setAlertMsg('Password is incorrect. Please try again.');
        }

    };


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        if (!value) {
            setEmailError("Please enter an email address");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError("Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address.");
        } else {
            setEmailError('');
        }
    };
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        if (!value) {
            setPasswordError("Please enter a password");
        } else {
            setPasswordError('');
        }
    }

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const handleEmailBlur = () => {
        if (!email) {
            setEmailError("Please enter an email address");
        } else {
            setEmailError('');
        }
    };

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordError("Please enter a password");
        } else {
            setPasswordError('');
        }
    }

    return (
        <>
            {isSmallScreen ? <SmallScreenHeader/> : <MainHeader/>}
            <div className="LoginContainer">

                <form className={'LoginForm'} action="">
                    {alertMsg && <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '1rem',
                        width: '100%',
                        height: '50px',
                        marginBottom: '1rem',

                    }}>
                        {alertMsg}
                    </div>}
                    <div className={'LoginHeader'}>Sign in to your member account</div>
                    <Box sx={{marginBottom: '20px'}}>
                        <FormControl className={'formControl'} variant="outlined">
                            <div style={{marginBottom: "5px"}}>Email address</div>
                            <TextField
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={handleEmailBlur}
                                inputRef={emailInputRef}
                                required
                                error={!!emailError}
                                helperText={emailError}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                    style: {fontFamily: 'Tilt Neon'}
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{marginBottom: '20px'}}>
                        <FormControl className={'formControl'} variant="outlined">
                            <div style={{marginBottom: "5px"}}>Password</div>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordBlur}
                                required
                                error={!!emailError}
                                helperText={passwordError}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    style: {fontFamily: 'Tilt Neon'}
                                }}
                            />

                        </FormControl>

                    </Box>
                    <a href="/" style={{marginBottom: '20px'}}>Forget your password?</a>
                    <button className={'signInBtn'}
                            disabled={isButtonDisabled}
                            ref={buttonRef}
                            onClick={handleOnClick}>
                        SIGN IN
                    </button>
                    <div className={'formControl'}>
                        By signing in, you agree to the Terms of Use and acknowledge the Privacy Policy. California
                        consumers, see
                        our Notice of Financial Incentives.
                    </div>
                </form>
            </div>
            {isSmallScreen ? <SmallerFooter/> : <Footer/>}
        </>

    )
        ;
}

export default Login;