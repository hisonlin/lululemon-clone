import React from 'react';
import {Box, Typography, IconButton, List, ListItem, ListItemText, Button} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';

const categories = [
  "Shoes By Gender",
  "Shoe Types",
  "Activity"
];

const RoundedImage = styled('img')({
  borderRadius: '5px',
  height: 'auto',
  width: '100%',
  maxWidth: '323px'
})

const Shoes = ({onBack, onClose}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', maxWidth: '1200px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '0.3rem 1rem', borderBottom: 1, borderColor: 'divider' }}>
        <IconButton edge="start" onClick={onBack}>
          <ChevronLeftIcon sx={{color: 'black'}}/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>Shoes</Typography>
        <IconButton edge="end" onClick={onClose}>
          <CloseIcon sx={{color: 'black'}}/>
        </IconButton>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {categories.map((category, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: 1,
                borderColor: 'divider'
              }}
            >
              <ListItemText primary={category} primaryTypographyProps={{fontWeight: 'medium', fontSize: '1.2rem'}}/>
              <IconButton edge="end">
                <AddIcon sx={{color: 'black'}}/>
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: '400' }}>Shoes</Typography>
        <Box sx={{p: '0 1rem', borderBottom: 1, borderColor: 'divider', mb: 1}}>
          <RoundedImage src="/Shoes.webp" alt="Shoes image"/>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            We studied feet.
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon sx={{color: '#C8102E'}}/>}
            sx={{ color: 'inherit', textTransform: 'none', pl: 0, mb: 2}}
          >
            Shop Shoes
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Shoes;