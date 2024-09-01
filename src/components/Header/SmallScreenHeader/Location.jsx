import React, { useState } from 'react';
import {
  Box, Typography, IconButton, List, ListItem, ListItemText, Select, MenuItem
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Globe from './Globe';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const regions = [
  "Africa",
  "Asia Pacific",
  "Europe",
  "North America",
  "South America",
  "The Middle East"
];

const Location = ({onBack, onClose}) => {
  const [language, setLanguage] = useState('English');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', maxWidth: '1200px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: '0.3rem 1rem', borderBottom: 1, borderColor: 'divider' }}>
        <IconButton edge="start" onClick={onBack}>
          <ChevronLeftIcon sx={{color: 'black'}}/>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton edge="end" onClick={onClose}>
          <CloseIcon sx={{color: 'black'}}/>
        </IconButton>
      </Box>
      <Box sx={{ p: '16px 0 16px 32px', overflow: 'auto' }}>
        <Typography variant="caption" sx={{color:'slateGrey'}}>
          Your current selected location is Canada and <br/> your order will be billed in CAD.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 ,mt:2}}>
          <Globe sx={{ mr: 1 }} />
          <Typography variant="body1">Canada (CAD)</Typography>
        </Box>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          sx={{ mb: 2, width:'16rem','& .MuiOutlinedInput-notchedOutline':{borderColor:'black'}}}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="French">French</MenuItem>
        </Select>
        <Typography variant="h6" sx={{ mb: 1 }}>Choose your location for.</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          lululemon ships to the following areas to:
        </Typography>
        <List>
          {regions.map((region, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                py: 2
              }}
            >
              <ListItemText primary={region} />
              <IconButton edge="end">
                <AddIcon sx={{color: 'black'}}/>
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Location;