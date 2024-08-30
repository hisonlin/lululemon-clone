import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import './TopUtilityBar.scss'
import GiftCardIcon from "../../icons/GiftCard";
import LocationIcon from "../../icons/LocationIcon";

const TopUtilityBar = () => {
  return (
    <AppBar className = "top-utility-bar" position="static" color="default" elevation={0} sx={{}}>
      <div className = "toolbar" style={{ display:'flex', justifyContent: 'flex-end', minHeight: '30px'}}>
        <Box className = "menuBox" sx={{ display: 'flex', alignItems: 'center'}}>
          <Button className = "menuBtn" startIcon={<LocationIcon/>} size="small">Store Locator</Button>
          <Button className = "menuBtn" startIcon={<GiftCardIcon />} size="small">Gift Cards</Button>
          <Button className = "menuBtn" startIcon={<HelpOutlineOutlinedIcon />} size="24px">Get Help</Button>
          <Button className = "menuBtn" startIcon={<LanguageIcon />} size="24px">CAN</Button>
        </Box>
      </div>
    </AppBar>
  );
};

export default TopUtilityBar;