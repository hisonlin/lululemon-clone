import React from 'react';
import {
  Box,Typography,IconButton,List,ListItem,ListItemText,Button,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';

const categories = ["Accessories", "Bags", "Activity"];

const subCategories = [
  "What's New",
  "Bestsellers",
  "Back To School",
  "Team Canada",
  "Mini Bags",
  "Pink Accessories",
  "Everywhere Bag Shop",
  "Travel Accessories",
  "Summer Accessories",
  "We Made Too Much"
];

const RoundedImage = styled('img')({
  borderRadius:'5px',
  height:'auto',
  width:'323px'
})
const Accessories = ({onBack,onClose}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%',maxWidth:'1200px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '0.3rem 1rem', borderBottom: 1, borderColor: 'divider' }}>
        <IconButton edge="start" onClick={onBack}>
          <ChevronLeftIcon sx={{color:'black'}}/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>Accessories</Typography>
        <IconButton edge="end" onClick={onClose}>
          <CloseIcon sx={{color:'black'}}/>
        </IconButton>
      </Box>
      <Box sx={{flexGrow:1,overflow:'auto'}}>
        <List>
          {categories.map((category,index)=>(
            <ListItem
              key={index}
              sx={{
                borderBottom:1,
                borderColor:'divider'
              }}
            >
              <ListItemText primary={category} primaryTypographyProps={{fontWeight:'medium',fontSize:'1.2rem'}}/>
              <IconButton edge="end">
                  <AddIcon sx={{color:'black'}}/>
                </IconButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: '400' }}>Accessories</Typography>
        {/* start of image section */}
        <Box sx={{p:'0 1rem',borderBottom:1,borderColor:'divider',mb:1}}>
                <RoundedImage src="/Accessories.webp" alt="Accessories image"/>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Early access: succulent <br/> accessories.
              </Typography>
              <Button
                endIcon={<ArrowForwardIcon sx={{color:'#C8102E'}}/>}
                sx={{ color: 'inherit', textTransform: 'none', pl: 0,mb:2}}
              >
                Access Your Perks
              </Button>
        </Box>
        <List>
            {subCategories.map((item, index) => (
              <ListItem key={index} sx={{ py: 1}}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
      </Box>
      
        {/* Footer */}
        <Box sx={{p:'0.6rem 0',borderTop: 1, borderColor: 'divider'}}>
          <Button
            variant="caption"
            endIcon={<ArrowForwardIcon sx={{color:'#C8102E'}}/>}
            sx={{ 
              textTransform: 'uppercase', 
              color: 'black', 
              borderColor: 'black',
              fontWeight:'bold'
            }}
          >
            Shop All Accessories
          </Button>
        </Box>
    </Box>

  )
}

export default Accessories