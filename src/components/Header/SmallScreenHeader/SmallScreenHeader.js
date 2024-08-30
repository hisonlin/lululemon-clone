import React, {useState} from 'react';
import LululemonLogo from "./LululemonLogo";
import UserIcon from "../../../icons/UserIcon";
import LocationIcon from "../../../icons/LocationIcon";
import HeartIcon from "../../../icons/HeartIcon";
import GiftCardIcon from "../../../icons/GiftCard";
import ShoppingBagIcon from "../../../icons/ShoppingBag";
import MenuIcon from '@mui/icons-material/Menu';
import './SmallScreenHeader.css';
import {InputBase, Box} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HoverMyBag from "../../MyBag/HoverMyBag/HoverMyBag";
import BurgerMenu from './BurgerMenu';
import {useNavigate} from "react-router-dom";

const SmallScreenHeader = () => {
    const [bag, setBag] = React.useState(JSON.parse(localStorage.getItem('bag')) || []);
    const totalItems = bag.reduce((acc, item) => acc + item.quantity, 0);
    const [hoverBag, setHoverBag] = React.useState(false);
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    const handleHoverBag = () => {
        setHoverBag(true);
    }

    const handleCloseHoverBag = () => {
        setHoverBag(false);
    }
    const handleBurgerMenuOpen = () => {
        setBurgerMenuOpen(true);
    }
    const handleBurgerMenuClose = () => {
        setBurgerMenuOpen(false);
    }

    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    }
    // useEffect to update the state based on localStorage changes
    React.useEffect(() => {
        const handleBagChange = () => {
            const updatedBag = JSON.parse(localStorage.getItem('bag')) || [];
            setBag(updatedBag);
        };

        // Watch for updates to the bag in localStorage
        const interval = setInterval(() => {
            handleBagChange();
        }, 500);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);


    const firstName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstName : null;
    const handleSignInClick = () => {
        if (firstName) {
            localStorage.removeItem('user');
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
            <div className={'smallScreenHeaderContainer'}>
                <div className={'smallScreenHeaderFirstRow'}>
                    <div onClick={handleLogoClick} style={{cursor: 'pointer'}}>
                        <LululemonLogo/>
                    </div>
                    <div style={{display: 'flex', gap: '1rem'}}>
                        <div onClick={handleSignInClick}>
                            {firstName ? <div>Sign Out</div> : <UserIcon/>}
                        </div>
                        <LocationIcon/>
                        <HeartIcon/>
                        <GiftCardIcon/>
                        <div style={{position: 'relative', cursor: 'pointer'}} onClick={handleHoverBag}>
                            <ShoppingBagIcon/>
                            {totalItems > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    backgroundColor: 'red',
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

                        <Box onClick={handleBurgerMenuOpen}>
                            <MenuIcon/>
                        </Box>

                    </div>
                </div>
                <div>
                    <InputBase className="searchBox"
                               placeholder="Search"
                               inputProps={{'aria-label': 'search'}}
                               startAdornment={<SearchIcon/>}/>

                </div>

            </div>
            {hoverBag &&
                <HoverMyBag showBag={handleHoverBag} closeBag={handleCloseHoverBag} position={'fixed'} width={'100vw'}
                            height={'100%'} top={'0'}/>}
            <BurgerMenu open={burgerMenuOpen} onClose={handleBurgerMenuClose}/>
        </>
    );
};

export default SmallScreenHeader;