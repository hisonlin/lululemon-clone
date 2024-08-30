import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import bagAction from "../../../actions/bagAction";
import DeleteAlertBox from "../DeleteAlertBox/DeleteAlertBox";

const HoverMyBagCard = ({item, type, updateBag}) => {
    const dispatch = useDispatch();

    const handelDelete = () => {
        dispatch(bagAction.removeFromBag(item));
        let currentBag = JSON.parse(localStorage.getItem('bag')) || [];
        let newBag = currentBag.filter((i) => i.productId !== item.productId || i.color !== item.color || i.size !== item.size);
        updateBag(newBag);

    }


    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

    const showDeleteAlertBox = () => {
        setShowDeleteAlert(true);
    }
    const closeDeleteAlertBox = () => {
        setShowDeleteAlert(false);
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem 0'
        }}>
            <div style={{width: '33.33%'}}>
                <img src={item.image} alt={item.name} width={'100%'}></img>
            </div>
            <div style={{width: '55%'}}>
                <div style={{fontSize: '1rem', fontWeight: '700', marginBottom: '1rem'}}>{item.name}</div>
                <div style={{fontSize: '0.8rem'}}>
                    <div>{item.colorName}</div>
                    <div>Size {item.size}</div>
                    <div>Quantity {item.quantity}</div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                {type === 'myBag' ?
                    <CloseIcon style={{cursor: 'pointer'}} onClick={showDeleteAlertBox}/> :
                    <div>{''}</div>
                }
                <div style={{fontWeight: '700'}}>${item.price * item.quantity}</div>
            </div>
            {showDeleteAlert &&
                <DeleteAlertBox handelDelete={handelDelete} closeDeleteAlertBox={closeDeleteAlertBox} type={type}/>}

        </div>
    );
};

export default HoverMyBagCard;