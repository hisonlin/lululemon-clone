import React from 'react';
import {Box, Typography, Divider} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {styled} from '@mui/system';

const Details = ({featureIcon, featureTitle, isSmallScreen}) => {
    const FeatureBox = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
    })
    const IconWrapper = styled(Box)({
        marginRight: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    })
    if (isSmallScreen) {
        return null;
    }

    return (
        <>
            <Typography sx={{fontWeight: 'bold', mb: 2}}>Details</Typography>
            <Box>
                {featureIcon?.length > 0 && featureIcon.map((icon, index) => (
                    <React.Fragment key={`feature-${index}`}>
                        <FeatureBox>
                            <IconWrapper>
                                <img src={icon} alt="" style={{height: '1.5rem', width: '1.5rem', fontWeight: 'bold'}}/>
                            </IconWrapper>
                            <Typography>{featureTitle?.[index]}</Typography>
                        </FeatureBox>
                    </React.Fragment>
                ))}
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
                <Box>
                    <Typography sx={{fontWeight: 'bold', fontSize: '1.1rem'}}>Questions? Bring them on (all of
                        them)</Typography>
                    <Typography variant="caption">Virtual shop with one of our educators</Typography>
                </Box>

                <ArrowRightAltIcon sx={{color: '#C8102E'}}/>
            </Box>
        </>
    )
}
export default Details;