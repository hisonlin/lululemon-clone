import React, {useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    Collapse
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Store from "../../../icons/Store";
import AfterPay from "../../../icons/AfterPay";
import Klarna from "../../../icons/Klarna";
import Info from "../../../icons/Info";
import AddToBag from "../AddToBag/AddToBag";
import {useDispatch, useSelector} from "react-redux";
import bagAction from "../../../actions/bagAction";
import './ShippingOptions.css';
import {useNavigate} from "react-router-dom";

const ShippingOptions = () => {
    const [isPickupOpen, setIsPickupOpen] = useState(false);

    const [addToBag, setAddToBag] = useState(false);

    const [alert, setAlert] = useState(false);

    const reduxSelectedItem = useSelector(state => state.oneProductReducer.selectedItem);
    // console.log('reduxSelectedItem:', reduxSelectedItem);

    const dispatch = useDispatch();

    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleAddToBag = () => {
        if(!user) {
            navigate('/login', { state: { from: window.location.pathname } });

        } else if (reduxSelectedItem.size === '') {
            setAlert(true);
        } else {
            setAlert(false);
            setAddToBag(true);
            dispatch(bagAction.addToBag(reduxSelectedItem));

            // Update localStorage with the same logic as your reducer
            let currentBag = JSON.parse(localStorage.getItem('bag')) || [];

            // Check if the item already exists in the bag
            const existingItemIndex = currentBag.findIndex(
                item =>
                    item.productId === reduxSelectedItem.productId &&
                    item.color === reduxSelectedItem.color &&
                    item.size === reduxSelectedItem.size
            );

            if (existingItemIndex !== -1) {
                // Item exists, update its quantity
                currentBag[existingItemIndex].quantity += reduxSelectedItem.quantity;
            } else {
                // Item doesn't exist, add it to the bag
                currentBag.push(reduxSelectedItem);
            }

            // Update localStorage with the new bag
            localStorage.setItem('bag', JSON.stringify(currentBag));
        }
    };


    const handleCloseAddToBag = () => {
        setAddToBag(false);
    }
    return (
        <>
            {alert && <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '1rem',
                width: '100%',
                height: '50px',
                marginBottom: '1rem',

            }}>
                Please Select a Size
            </div>}
            <Paper elevation={0} sx={{maxWidth: 600, border: '1px solid #e0e0e0'}}>
                <Box sx={{p: 1}}>
                    <RadioGroup defaultValue="ship">
                        <FormControlLabel
                            value="ship"
                            control={<Radio color="error"/>}
                            sx={{alignItems: 'flex-start', margin: 0}}
                            label={
                                <Box>
                                    <Typography variant="h6" component="div" sx={{fontWeight: 'bold'}}>Ship it to
                                        me</Typography>
                                    <Typography variant="body2" color="text.secondary">Free shipping and
                                        returns</Typography>
                                </Box>
                            }
                        />
                    </RadioGroup>
                </Box>

                <Box sx={{borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0'}}>
                    <Button
                        fullWidth
                        startIcon={<Store/>}
                        endIcon={
                            <AddIcon
                                sx={{
                                    transform: isPickupOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease-in-out'
                                }}
                            />
                        }
                        onClick={() => setIsPickupOpen(!isPickupOpen)}
                        sx={{
                            justifyContent: 'space-between',
                            color: 'text.primary',
                            textTransform: 'none',
                            py: 2,
                            px: 2, // Add horizontal padding
                            '& .MuiButton-startIcon': {
                                ml: 0.1,
                            },
                            '& .MuiButton-endIcon': {
                                mr: 0.1,
                            }
                        }}
                    >
                        <Typography variant="h6" component="div"
                                    sx={{flexGrow: 1, textAlign: 'left', fontWeight: 'bold'}}>
                            Pick up in store
                        </Typography>
                    </Button>
                </Box>
                <Collapse in={isPickupOpen}>
                    <Box sx={{p: 2}}>
                        <Typography variant="body2" paragraph>
                            Available for Buy & Pick-Up at these locations in Richmond, British Columbia
                        </Typography>
                        <Typography variant="body2" sx={{textDecoration: 'underline', cursor: 'pointer', mb: 2}}>
                            Change Locations
                        </Typography>
                        <Typography variant="body2">
                            Pick up in-store within 2 hours.
                        </Typography>
                    </Box>
                </Collapse>
                <div id='addToBagBackground'>
                    <Box id='addToBagButton' sx={{p: 2}}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: '#c41230',
                                '&:hover': {bgcolor: '#a50f28'},
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                boxShadow: 'none',
                            }}
                            onClick={handleAddToBag}
                        >
                            ADD TO BAG
                        </Button>
                    </Box>
                </div>

            </Paper>
            <Typography variant="caption" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1}}>
                4 payments of $32.00 available with <AfterPay/> or <Klarna/>.<Info/>
            </Typography>
            {addToBag && <AddToBag close={handleCloseAddToBag}/>}
        </>
    );
};

export default ShippingOptions;