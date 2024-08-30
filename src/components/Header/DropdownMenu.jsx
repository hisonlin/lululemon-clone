import './DropdownMenu.scss';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Typography,Button,List, ListItem, ListItemText, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 0)
}));

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
});


//This is made by Zhang. tele is @smartCodi
const DropdownMenu = () => {
  const whatsnewList = ["Bestsellers", "Align Shop", "Travel Clothes", "Matching Sets", "Athletic Shorts", "Tennis and Golf Clothes", "Summer Clothes", "Plus Size Clothes", "We Made Too Much"];
  const womensClothes = ["Bodysuits", "Coats & Jackets", "Dresses", "Hoodies & Sweatshirts", "Joggers", "Jumpsuits & Rompers", "Leggings", "Long Sleeve Shirts", "Pants"];
  const womensClothes2 = ["Polo Shirts", "Shirts", "Shoes", "Shorts", "Skirts", "Sports Bras", "T-Shirts", "Tank Tops", "Underwear"];
  const accessories = ["Backpacks", "Bags", "Belt Bags", "Crossbody Bags", "Hair Accessories", "Hats", "Socks", "Water Bottles", "Yoga Mats"];
  const activities = ["Running", "Workout", "Casual", "Yoga", "Golf", "Tennis"];


  return (
    <Box className="dropdownContainer padding">
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Typography variant="subtitle2">What's New</Typography>
          <List dense>
            {whatsnewList.map((text) => (
              <StyledListItem key={text}>
                <StyledLink component={RouterLink} to={`/${text.toLowerCase().replace(/ /g, '-')}`}>
                  <ListItemText primary={text} />
                </StyledLink>
              </StyledListItem>
            ))}
          </List>
        </Grid>
        
        <Grid className = "rightSection" item xs={4}>
          <div className="womensClothContainer">
          <Typography variant="caption" fontWeight="bold" display="flex" alignItems="center">
            WOMEN'S CLOTHES
            <ArrowRightAltIcon sx={{ color: "#C8102E", marginLeft: 1 }} />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <List dense>
                {womensClothes.map((text) => (
                  <StyledListItem key={text}>
                    <StyledLink component={RouterLink} to={`/${text.toLowerCase().replace(/ /g, '-')}`}>
                      <ListItemText primary={text} />
                    </StyledLink>
                  </StyledListItem>
                ))}
              </List>
            </Grid>
            
            <Grid className = "womensClothes2" item xs={6}>
              <List dense>
                {womensClothes2.map((text) => (
                  <StyledListItem key={text}>
                    <StyledLink component={RouterLink} to={`/${text.toLowerCase().replace(/ /g, '-')}`}>
                      <ListItemText primary={text} />
                    </StyledLink>
                  </StyledListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          </div>
        </Grid>
        
        <Grid item xs={3} className="accessoriesColumn">
          <Typography variant="caption" fontWeight="bold" display="flex" alignItems="center">
            ACCESSORIES
            <ArrowRightAltIcon sx={{ color: "#C8102E", marginLeft: 1 }} />
          </Typography>
          <List dense>
            {accessories.map((text) => (
              <StyledListItem key={text}>
                <StyledLink component={RouterLink} to={`/${text.toLowerCase().replace(/ /g, '-')}`}>
                  <ListItemText primary={text}/>
                </StyledLink>
              </StyledListItem>
            ))}
          </List>
        </Grid>
        {/* Hit your reset button function */}
        <Grid className = "headerCaptionContainer" item xs ={3}>
          <Box className = "headerCaption">
          <Box component = "img" src = "/headerImage.webp" alt="header caption img" sx={{height:180,width:330,borderRadius:1}}/>
            <Typography variant = "h5" fontWeight = "bold">Hit your reset button.</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
          Oversized, breathable and soft, so you can come back stronger.
          </Typography>
          <Button 
          variant="text" 
          endIcon={<ArrowRightAltIcon />}
          sx={{ fontWeight: 'bold',padding:0,color:'black',
                '& .MuiButton-endIcon':{
                  color:'#C8102E',
                }

          }}>Shop Loungewear</Button>
          </Box>
        </Grid>
      </Grid>
      <Grid className = "activityBar" item xs={12}>
        <div className="i-1">
        <Typography variant="body2">ACTIVITY</Typography>
        </div>
        <div className="i-2">
        <Grid container spacing={6}>
          {activities.map((activity, index) => (
            <Grid item key={index}>
              <Typography variant="text">{activity}</Typography>
            </Grid>
          ))}
        </Grid>
        </div>
        <div className="i-3">
        <Typography variant="button" display= "flex" fontWeight="bold">
            SHOP ALL WOMEN
            <ArrowRightAltIcon sx={{ color: "#C8102E", marginLeft: 1}} />
          </Typography>
        </div>
      </Grid>
    </Box>
    
  );
}

export default DropdownMenu;


