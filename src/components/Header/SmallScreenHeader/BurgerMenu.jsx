import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SmallLogo from './SmallLogo';
import Globe from './Globe';

import Men from './Men';
import Accessories from './Accessories';
import Shoes from './Shoes';
import BacktoSchool from './BacktoSchool';

import Location from './Location';
import Women from "./Women";
import TeamCanada from "./TeamCanada";
// 将 menuItems 定义为常量
export const menuItems = [
  'Women', 'Men', 'Accessories', 'Shoes', 'Back To School',
  'Team Canada', 'Gift Cards', 'Lululemon Apps', 'Store Locator',
  'Start A Return', 'Track My Order', 'Check Return Status', 'Help & Support'
];

// 将 theme 定义为常量
export const theme = createTheme({
  typography: {
    fontFamily: 'TestCalibre, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'TestCalibre';
          src: url('/fonts/TestCalibre-Medium-BF661746ed8cff9.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
        }
      `,
    },
  },
});

const BurgerMenu = ({ open, onClose }) => {
  const [showWomen, setShowWomen] = useState(false);
  const [showMen,setShowMen] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showShoes, setShowShoes] = useState(false);
  const [showBacktoSchool, setShowBacktoSchool] = useState(false);
  const [showTeamCanada,setShowTeamCanada] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleWomenClick = () => {
    setShowWomen(true);
  };
  const handleMenClick = ()=>{
    setShowMen(true);
  }
  const handleAccessoriesClick = ()=>{
    setShowAccessories(true)
  }
  const handleShoesClick = ()=>{
    setShowShoes(true)
  }
  const handleBacktoSchoolClick = ()=>{
    setShowBacktoSchool(true)
  }
  const handleTeamCanadaClick = ()=>{
    setShowTeamCanada(true)
  }
  const handleLocationClick = () =>{

    setShowLocation(true)
  }

  const handleBackClick = () => {
    setShowWomen(false);
    setShowMen(false);
    setShowAccessories(false);
    setShowShoes(false);
    setShowBacktoSchool(false);
    setShowTeamCanada(false);
    setShowLocation(false);
  };

  const firstName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstName : null;
  return (
    <ThemeProvider theme={theme}>
      <Drawer 
        anchor={showMen || showWomen || showAccessories || showShoes || showBacktoSchool || showTeamCanada || showLocation ? "right" : "left"}
        open={open} 
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }
        }}
      >
        {showWomen ? (
          <Women onBack={handleBackClick} onClose={onClose}/>
        ) : showMen ? (
          <Men onBack ={handleBackClick} onClose={onClose}/>
        ) : showAccessories ? (
          <Accessories onBack={handleBackClick} onClose={onClose}/>
        ) : showShoes ? (
          <Shoes onBack={handleBackClick} onClose={onClose}/>
        ) : showBacktoSchool ? (
          <BacktoSchool onBack={handleBackClick} onClose={onClose}/>
        ) : showTeamCanada ? (
          <TeamCanada onBack={handleBackClick} onClose = {onClose}/>
        ) : showLocation ? (
          <Location onBack={handleBackClick} onClose = {onClose}/>
        ) : (
          <>
            <Box sx={{ padding: '0 1rem' }}>
              <Box sx={{ mt: 2 }}>
              <Link to="/" style={{display:'flex', gap:'1rem'}}>
                <SmallLogo />
                {firstName&& <div>Hi, {firstName}</div>}
              </Link>
              </Box>
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <List sx={{ paddingTop: 6, margin: '0 -1rem' }}>
                {menuItems.map((text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    onClick={
                      text === 'Women' ? handleWomenClick : 
                      text === 'Men' ? handleMenClick:
                      text === 'Accessories' ? handleAccessoriesClick :
                      text === 'Shoes' ? handleShoesClick :
                      text === 'Back To School' ? handleBacktoSchoolClick :
                      text === 'Team Canada' ? handleTeamCanadaClick :
                      undefined}
                    sx={{
                      borderBottom: index < 6 ? '1px solid #e0e0e0' : 'none',
                      color: text === 'Team Canada' ? '#C8102E' : 'inherit',
                      py: 1,
                      px: '1rem',
                      ...(text === 'Gift Cards' && { mt: 2 })
                    }}
                  >
                    <ListItemText 
                      primary={text} 
                      primaryTypographyProps={{
                        fontSize: index <= 5 ? '1.2rem' : 'inherit',
                        fontWeight: index <= 5 ? 500 : 400,
                      }}
                    />
                    {index <= 5 && <ArrowForwardIosIcon fontSize="small" />}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ padding: '1rem' }}>
              <Box 
              onClick={handleLocationClick}
              sx={{
                display: 'inline-flex', 
                alignItems: 'center',
                border: '1px solid #d3d5d7',
                borderRadius: '25px',
                padding: '8px 16px',
                mb: 2,
              }}>
                <Globe />
                <Typography>CA / Change Location</Typography>
              </Box>
            </Box>
          </>
        )}
      </Drawer>
    </ThemeProvider>
  );
};

export default BurgerMenu;