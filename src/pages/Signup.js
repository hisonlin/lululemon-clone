import { TextField, Box, IconButton, InputAdornment, FormControl } from '@mui/material';
import './Login.scss'
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import SmallScreenHeader from "../components/Header/SmallScreenHeader/SmallScreenHeader";
import MainHeader from "../components/Header/MainHeader";
import { Footer } from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import SmallerFooter from "../components/Footer/SmallFooter/SmallerFooter";
import { useDispatch } from "react-redux";
import userAction from "../actions/userAction";
import Progress from "../components/Progress/Progress";


function Signup() {

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
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // New states for first name, last name, and confirm password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [alertMsg, setAlertMsg] = useState("");

    const [loading, setLoading] = useState(false);

    const emailInputRef = useRef(null);
    const buttonRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.style.backgroundColor = isButtonDisabled ? 'gray' : '';
            buttonRef.current.style.cursor = isButtonDisabled ? 'not-allowed' : 'pointer';
        }
    }, [isButtonDisabled]);

    useEffect(() => {
        if (email && password && firstName && lastName && confirmPassword && !emailError && !passwordError && !confirmPasswordError) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [emailError, passwordError, confirmPasswordError, email, password, firstName, lastName, confirmPassword]);

    const navigate = useNavigate();

    const handleSignup = () => {
        // Add your signup logic here (e.g., API call)
        const newUser = {
            firstName,
            lastName,
            email,
            password
        };

        dispatch(userAction.signUp(newUser))
            .then(() => {
                setLoading(true);  
                setTimeout(() => {
                    setLoading(false); 
                    navigate('/login'); 
                }, 2000); 
            })
            .catch((error) => {
                // Handle any errors (e.g., signup failure)
                setAlertMsg(error.response.data.message);
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setConfirmPassword('');
                // console.error('Signup error:', error);
            });
    };

    const handleOnClick = async (event) => {
        event.preventDefault();

        // Simulate a successful signup
        handleSignup();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleEmailChange = async (event) => {
        const value = event.target.value;
        setEmail(value);

        // Basic email format validation
        if (!value) {
            setEmailError("Please enter an email address");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError("Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address.");
        } else {
            // Clear the format error if the email is valid
            setEmailError('');

        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        if (!value) {
            setPasswordError("Please enter a password");
        } else if (value.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        } else {
            setPasswordError('');
            setAlertMsg('');  // Clear alert message if the password is valid
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
        if (!value) {
            setFirstNameError("Please enter your first name");
        } else {
            setFirstNameError('');
        }
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
        if (!value) {
            setLastNameError("Please enter your last name");
        } else {
            setLastNameError('');
        }
    };

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    return (
        <>
            {loading ? (
                <Progress />
            ) : (
                <>
                    {isSmallScreen ? <SmallScreenHeader /> : <MainHeader />}
                    <div className="LoginContainer">
                        <form className={'LoginForm'} action="">
                            {alertMsg && (
                                <div
                                    style={{
                                        backgroundColor: '#f8d7da',
                                        color: '#721c24',
                                        padding: '1rem',
                                        width: '100%',
                                        height: '50px',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    {alertMsg}
                                </div>
                            )}
                            <div className={'LoginHeader'}>Create a new account</div>                          

                            {/* Email */}
                            <Box sx={{ marginBottom: '20px' }}>
                                <FormControl className={'formControl'} variant="outlined">
                                    <div style={{ marginBottom: '5px' }}>Email address</div>
                                    <TextField
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        inputRef={emailInputRef}
                                        required
                                        error={!!emailError}
                                        helperText={emailError}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                            style: { fontFamily: 'Tilt Neon' },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                             {/* First Name */}
                             <Box sx={{ marginBottom: '20px' }}>
                                <FormControl className={'formControl'} variant="outlined">
                                    <div style={{ marginBottom: '5px' }}>First Name</div>
                                    <TextField
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                        required
                                        error={!!firstNameError}
                                        helperText={firstNameError}
                                        InputProps={{
                                            style: { fontFamily: 'Tilt Neon' },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            {/* Last Name */}
                            <Box sx={{ marginBottom: '20px' }}>
                                <FormControl className={'formControl'} variant="outlined">
                                    <div style={{ marginBottom: '5px' }}>Last Name</div>
                                    <TextField
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                        required
                                        error={!!lastNameError}
                                        helperText={lastNameError}
                                        InputProps={{
                                            style: { fontFamily: 'Tilt Neon' },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            {/* Password */}
                            <Box sx={{ marginBottom: '20px' }}>
                                <FormControl className={'formControl'} variant="outlined">
                                    <div style={{ marginBottom: '5px' }}>Password</div>
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: { fontFamily: 'Tilt Neon' },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            {/* Confirm Password */}
                            <Box sx={{ marginBottom: '20px' }}>
                                <FormControl className={'formControl'} variant="outlined">
                                    <div style={{ marginBottom: '5px' }}>Confirm Password</div>
                                    <TextField
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                        error={!!confirmPasswordError}
                                        helperText={confirmPasswordError}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle confirm password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: { fontFamily: 'Tilt Neon' },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            <button
                                className={'signInBtn'}
                                disabled={isButtonDisabled}
                                ref={buttonRef}
                                onClick={handleOnClick}
                            >
                                SIGN UP
                            </button>
                        </form>
                    </div>
                    {isSmallScreen ? <SmallerFooter /> : <Footer />}
                </>
            )}
        </>

    );
}

export default Signup;
