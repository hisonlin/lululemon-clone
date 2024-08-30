import React from 'react';
import {Box, Typography, IconButton, List, ListItem, ListItemText, Button} from '@mui/material';
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const categories = [
  "Men's Clothes",
  "Accessories",
  "Activity"
];

const subCategories = [
  "What's New",
  "BestSellers",
  "ABC Collection",
  "Business Casual Clothes",
  "Loungewear",
  "Golf Clothes",
  "Travel Clothes",
  "Best Workout Gear",
  "5\" Shorts Shop",
  "We Made Too Much"
]

const RoundedImage = styled('img')({
  borderRadius:'5px',
  height:'auto',
  width:'323px'
})

const Men = ({onBack, onClose}) => {
  return (
    <Box sx={{display:'flex', flexDirection:'column', height:'100%', width:'100%'}}>
      <Box sx={{display:'flex', alignItems:'center', p:'0.3rem 1rem', borderBottom:1, borderColor:'divider'}}>
        <IconButton edge="start" onClick={onBack}>
          <ChevronLeftIcon sx={{color:'black'}}/>
        </IconButton>
        <Typography variant="h6" sx={{flexGrow:1, fontWeight:500}}>Men</Typography>
        <IconButton edge="end" onClick={onClose}>
          <CloseIcon sx={{color:'black'}}/>
        </IconButton>
      </Box>
      <Box sx={{flexGrow:1, overflow:'auto'}}>
        <List>
          {categories.map((category,index)=>(
            <ListItem
              key={index}
              sx={{borderBottom:1, borderColor:'divider'}}
            >
              <ListItemText primary={category} primaryTypographyProps={{fontWeight:'medium', fontSize:'1.2rem'}}/>
              <IconButton edge="end">
                <AddIcon sx={{color:'black'}}/>
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: '400' }}>Men</Typography>
        <Box sx={{p:'0 1rem',borderBottom:1,borderColor:'divider',mb:1}}>
          <RoundedImage src="/Twill.webp" alt="image in Men component"/>
          <Typography variant="h6" gutterBottom fontWeight='bold'> Twill, reimagined.</Typography>
          <Button
          endIcon={<ArrowForwardIcon sx={{color:'#C8102E'}}/>}
          sx={{color:'inherit',textTransform:'none',pl:0,mb:2}}
          >
            Shop Pants
          </Button>
        </Box>
        {/* start of sub categories */}
        <List>
          {subCategories.map((item,index)=>(
            <ListItem key={index} sx={{py:1}}>
              <ListItemText primary={item}/>
            </ListItem>
          ))}
        </List>

        <Box sx={{p:'0.6rem 0',borderTop:1,borderColor:'divider'}}>
          <Button
            variant="caption"
            endIcon={<ArrowForwardIcon sx={{color:'#C8102E'}}/>}
            sx={{
              textTransform:'uppercase',
              color:'black',
              borderColor:'black',
              fontWeight:'bold'
            }}
          >
            shop all men
          </Button>
        </Box>
      </Box>
      
    </Box>
  )
}

export default Men