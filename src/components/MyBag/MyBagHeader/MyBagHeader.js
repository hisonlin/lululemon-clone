import React from 'react';
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar, Typography, IconButton, Box} from '@mui/material';
import LululemonLogo from './LululemonLogo';
import UserIcon from "../../../icons/UserIcon";


const MyBagHeader = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }

    const firstName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const handleSignInClick = () => {
        if (firstName) {
            localStorage.removeItem('user');
            localStorage.removeItem('bag');
            localStorage.removeItem('token');
            localStorage.removeItem('saveForLater');

            //refresh the page
            window.location.reload();

        } else {
            navigate('/login');
        }
    };

    return (
        <AppBar position="static" color="default" elevation={0}
                sx={{backgroundColor: 'transparent', marginBottom:'2rem'}}>
                <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
                    {/* Logo placeholder */}
                    <Box onClick={handleLogoClick} sx={{cursor: 'pointer'}}>
                        <Typography variant="h6" component="div" sx={{display:'flex', alignItems:'center', gap:'1rem'}}>
                            <LululemonLogo/>
                            {firstName&&<div>Hi, {firstName}</div>}
                        </Typography>
                    </Box>

                    <Box >
                        <IconButton color="inherit" size="small" onClick={handleSignInClick}
                                    disableRipple
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                        >

                            <UserIcon/>
                            <Typography variant="body2" sx={{marginLeft:'1rem'}}>{firstName?"Sign Out":"Sign In"}</Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
        </AppBar>
    );
};

export default MyBagHeader;