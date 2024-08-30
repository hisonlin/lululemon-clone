import React from 'react';
import {Box, Typography, IconButton, List, ListItem, ListItemText, Button, Drawer} from '@mui/material';
import styled from '@emotion/styled'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const categories = [
    "Women's Clothes",
    "Accessories",
    "Activity"
];

const subCategories = [
    "What's New",
    "Bestsellers",
    "Align Shop",
    "Travel Clothes",
    "Matching Sets",
    "Athletic Shorts",
    "Tennis And Golf Clothes",
    "Summer Clothes",
    "Plus Size Clothes",
    "We Made Too Much"
];

const RoundedImage = styled('img')({
    borderRadius: '5px',
    height: 'auto',
    width: '323px'
})

const Women = ({onBack, onClose}) => {
    return (
        <Drawer
            anchor="right"
            open={true}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '100%',
                    maxWidth: '1200px',
                },
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100%',
                maxWidth: '1200px',
                bgcolor: 'background.paper'
            }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: '0.3rem 1rem',
                    borderBottom: 1,
                    borderColor: 'divider'
                }}>
                    <IconButton edge="start" onClick={onBack}>
                        <ChevronLeftIcon sx={{color: 'black'}}/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1, fontWeight: 500}}>Women</Typography>
                    <IconButton edge="end" onClick={onClose}>
                        <CloseIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Box>

                {/* Main Content */}
                <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                    {/* Expandable Categories */}
                    <List>
                        {categories.map((category, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                }}
                            >
                                <ListItemText primary={category}
                                              primaryTypographyProps={{fontWeight: 'medium', fontSize: '1.2rem'}}/>
                                <IconButton edge="end">
                                    <AddIcon sx={{color: 'black'}}/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="subtitle1" sx={{px: 2, py: 1, fontWeight: '400'}}>Women</Typography>

                    {/* Membership Card */}
                    <Box sx={{p: '0 1rem', borderBottom: 1, borderColor: 'divider', mb: 1}}>
                        <RoundedImage src="/membership.webp" alt="Membership benefits"/>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Brands we trust. Offers just for <br/> you.
                        </Typography>
                        <Button
                            endIcon={<ArrowForwardIcon sx={{color: '#C8102E'}}/>}
                            sx={{color: 'inherit', textTransform: 'none', pl: 0, mb: 2}}
                        >
                            Access Your Perks
                        </Button>
                    </Box>


                    {/* Sub Categories */}
                    <List>
                        {subCategories.map((item, index) => (
                            <ListItem key={index} sx={{py: 1}}>
                                <ListItemText primary={item}/>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Footer */}
                <Box sx={{p: '0.6rem 0', borderTop: 1, borderColor: 'divider'}}>
                    <Button
                        variant="caption"
                        endIcon={<ArrowForwardIcon sx={{color: '#C8102E'}}/>}
                        sx={{
                            textTransform: 'uppercase',
                            color: 'black',
                            borderColor: 'black',
                            fontWeight: 'bold'
                        }}
                    >
                        Shop All Women
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Women;