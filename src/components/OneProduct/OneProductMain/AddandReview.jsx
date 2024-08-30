import React from 'react';
import {Box, Typography} from '@mui/material';
import HeartIcon from '../../../icons/HeartIcon';
import Star from '../../../icons/Star';
import Outfit from '../../../icons/Outfit.jsx';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Details from './Details.jsx'
import {useSelector} from "react-redux";

const AddandReview = ({featureIcon, featureTitle, isSmallScreen}) => {

    const reviews = useSelector(state => state.reviewsReducer.filteredReviews);
    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <HeartIcon/>
                    <Typography variant="body2" sx={{textDecoration: 'underline', fontWeight: 'bold', ml: 1}}>Add to
                        Wish List</Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Star/>
                    <Typography variant="body2" sx={{textDecoration: 'underline', ml: 1}}>Reviews({reviews.length})</Typography>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 4,
                mb: 4,
                backgroundColor: '#fff',
                padding: '1.3rem 2rem',
                borderBottom: '1px solid lightgrey'
            }}>
                <Outfit/>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>Outfit Inspiration</Typography>
                <ArrowRightAltIcon sx={{color: '#C8102E'}}/>
            </Box>
            <Details
                featureIcon={featureIcon}
                featureTitle={featureTitle}
                isSmallScreen={isSmallScreen}
            />

        </>
    )
}
export default AddandReview