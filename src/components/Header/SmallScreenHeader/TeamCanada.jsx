import React, { useState } from 'react';
import {
  Box, Typography, IconButton, List, ListItem, ListItemText, Button, Collapse
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';

const categories = [
  "All Team Canada",
  "Women's",
  "Men's",
  "Accessories",
  "Discover Team Canada"
];

const RoundedImage = styled('img')({
  borderRadius: '5px',
  height: 'auto',
  width: '100%',
  maxWidth: '323px'
})

const TeamCanada = ({onBack, onClose}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', maxWidth: '1200px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '0.3rem 1rem', borderBottom: 1, borderColor: 'divider' }}>
        <IconButton edge="start" onClick={onBack}>
          <ChevronLeftIcon sx={{color: 'black'}}/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>Team Canada</Typography>
        <IconButton edge="end" onClick={onClose}>
          <CloseIcon sx={{color: 'black'}}/>
        </IconButton>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{borderBottom:1, borderColor:'divider'}}>
          <ListItem>
            <ListItemText primary="Team Canada" primaryTypographyProps={{fontWeight: 'medium', fontSize: '1.2rem'}}/>
            <IconButton edge="end" onClick={toggleExpand}>
              {isExpanded ? <RemoveIcon sx={{color: 'black'}}/> : <AddIcon sx={{color: 'black'}}/>}
            </IconButton>
          </ListItem>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((category, index) => (
                <ListItem key={index} sx={{ pl: 4 }}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: '400' }}>Team Canada</Typography>
        <Box sx={{p: '0 1rem', borderBottom: 1, borderColor: 'divider', mb: 1}}>
          <RoundedImage src="/teamCanada.webp" alt="Team Canada athletes"/>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            As seen on the world stage.
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon sx={{color: '#C8102E'}}/>}
            sx={{ color: 'inherit', textTransform: 'none', pl: 0, mb: 2}}
          >
            Shop Team Canada Collection
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default TeamCanada;