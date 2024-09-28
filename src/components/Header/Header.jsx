import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography, IconButton, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LululemonLogo from './SmallScreenHeader/LululemonLogo';
import './Header.scss';
import UserIcon from "../../icons/UserIcon";
import HeartIcon from "../../icons/HeartIcon";
import ShoppingBagIcon from "../../icons/ShoppingBag";
import HoverMyBag from "../MyBag/HoverMyBag/HoverMyBag";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
    const navigate = useNavigate();

    const firstName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    
    const handleLogoClick = () => {
        navigate('/');
    }

    // State to hold the current bag items
    const [bag, setBag] = React.useState(JSON.parse(localStorage.getItem('bag')) || []);
    const totalItems = bag.reduce((acc, item) => acc + item.quantity, 0);

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [hoverBag, setHoverBag] = React.useState(false);

    const handleShowDropdown = () => {
        setShowDropdown(true);
    }

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    }

    const handleHoverBag = () => {
        setHoverBag(true);
    }

    const handleCloseHoverBag = () => {
        setHoverBag(false);
    }

    // // useEffect to update the state based on localStorage changes
    // React.useEffect(() => {
    //     const handleBagChange = () => {
    //         const updatedBag = JSON.parse(localStorage.getItem('bag')) || [];
    //         setBag(updatedBag);
    //     };

    //     // Watch for updates to the bag in localStorage
    //     const interval = setInterval(() => {
    //         handleBagChange();
    //     }, 500);

    //     // Cleanup the interval on component unmount
    //     return () => clearInterval(interval);
    // }, []);

    const handleSignInClick = () => {
        if (firstName) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('bag');
            localStorage.removeItem('saveForLater');

            //refresh the page
            window.location.reload();

        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <AppBar className="navBar" position="relative" color="default" elevation={0}
                    sx={{ backgroundColor: 'transparent' }}>
                <div className="navContainer">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        {/* Logo placeholder */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                                <LululemonLogo />
                            </div>

                            {/* Menu items */}
                            <div onMouseEnter={handleShowDropdown} onMouseLeave={handleCloseDropdown}
                                 style={{ height: '64px', display: 'flex', justifyContent: 'center' }}>
                                <Box className="menuBox">
                                    <div className={'menuBox-item'} color="inherit">WOMEN</div>
                                    <div className={'menuBox-item'} color="inherit">MEN</div>
                                    <div className={'menuBox-item'} color="inherit">ACCESSORIES</div>
                                    <div className={'menuBox-item'} color="inherit">SHOES</div>
                                    <div className={'menuBox-item'} color="inherit">BACK TO SCHOOL</div>
                                    <div className={'menuBox-item'} color="inherit" style={{ color: '#C8102E' }}>TEAM
                                        CANADA
                                    </div>
                                </Box>
                            </div>
                        </div>
                        {/* Right side items */}
                        {/* search box */}
                        <div>

                            <InputBase className="searchBox"
                                       placeholder="Search"
                                       inputProps={{ 'aria-label': 'search' }}
                                       startAdornment={<SearchIcon />} />
                        </div>
                        <div>
                            <Box className="rightSideBox">
                                {firstName&& <div>Hi, {firstName}</div>}
                                {/* User icon */}
                                <IconButton color="inherit" size="small" onClick={handleSignInClick}
                                            disableRipple
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'transparent'
                                                },
                                            }}
                                >
                                    <UserIcon />
                                    <Typography className="signIn" variant="body2">{firstName?"Sign Out":"Sign In"}</Typography>
                                </IconButton>
                                {/* Wishlist icon */}
                                <IconButton color="inherit" size="small">
                                    <HeartIcon />
                                </IconButton>
                                {/* Shopping bag icon */}
                                <IconButton onClick={handleHoverBag}>
                                    <div style={{ position: 'relative' }}>
                                        <ShoppingBagIcon />
                                        {totalItems > 0 && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-10px',
                                                right: '-10px',
                                                backgroundColor: '#c8102e',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '12px'
                                            }}>
                                                {totalItems}
                                            </div>
                                        )}
                                    </div>
                                </IconButton>
                            </Box>
                        </div>
                    </div>
                </div>
            </AppBar>
            <div style={{
                position: 'sticky',
                background: "white",
                zIndex: '9999',
                width: '100vw',
                margin: '0 auto',
                boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)'
            }}
                 onMouseEnter={handleShowDropdown}
                 onMouseLeave={handleCloseDropdown}>
                {showDropdown && <DropdownMenu />}
            </div>
            {hoverBag && <HoverMyBag showBag={handleHoverBag} closeBag={handleCloseHoverBag} position={'absolute'} right={'20%'} width={'400px'} height={'600px'} />}
        </>
    );
}
export default Header;
