import React from 'react';
import './MyBagSmallCard.css';
import {useDispatch} from "react-redux";
import bagAction from "../../../actions/bagAction";
import EditItem from "../EditItem/EditItem";
import DeleteAlertBox from "../DeleteAlertBox/DeleteAlertBox";

const MyBagSmallCard = ({item, type, updateBag, updateSaveForLate}) => {
    const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

    const showDeleteAlertBox = () => {
        setShowDeleteAlert(true);
    }

    const closeDeleteAlertBox = () => {
        setShowDeleteAlert(false);
    }
    const dispatch = useDispatch();

    const handelDelete = () => {
        if (type === 'bag') {
            dispatch(bagAction.removeFromBag(item));
            let currentBag = JSON.parse(localStorage.getItem('bag')) || [];
            let newBag = currentBag.filter((i) => i.productId !== item.productId || i.color !== item.color || i.size !== item.size);
            updateBag(newBag);
        } else {
            dispatch(bagAction.removeFromSaveForLater(item));
        }
        setShowDeleteAlert(false);
    }

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        dispatch(bagAction.modifyQuantity(item, newQuantity));
        const currentBag = JSON.parse(localStorage.getItem('bag')) || [];
        const newBag = currentBag.map((i) => {
            if (i.productId === item.productId && i.color === item.color && i.size === item.size) {
                i.quantity = newQuantity;
            }
            return i;
        });
        updateBag(newBag);
    }

    const [showEdit, setShowEdit] = React.useState(false);

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    }


    const handelLaterOrBag = () => {
        if (type === 'bag') {
            dispatch(bagAction.saveForLater(item));
            const currentSaveForLater = JSON.parse(localStorage.getItem('saveForLater')) || [];
            const newSaveForLater = [...currentSaveForLater, item];
            localStorage.setItem('saveForLater', JSON.stringify(newSaveForLater));
            updateSaveForLate(newSaveForLater); // Update the saveForLater state in the parent component

            let currentBag = JSON.parse(localStorage.getItem('bag')) || [];
            let newBag = currentBag.filter((i) => i.productId !== item.productId || i.color !== item.color || i.size !== item.size);
            localStorage.setItem('bag', JSON.stringify(newBag));
            updateBag(newBag); // Update the bag state in the parent component
        } else {
            dispatch(bagAction.moveToBag(item));
            let currentSaveForLater = JSON.parse(localStorage.getItem('saveForLater')) || [];
            let newSaveForLater = currentSaveForLater.filter((i) => i.productId !== item.productId || i.color !== item.color || i.size !== item.size);
            localStorage.setItem('saveForLater', JSON.stringify(newSaveForLater));
            updateSaveForLate(newSaveForLater); // Update the saveForLater state in the parent component

            let currentBag = JSON.parse(localStorage.getItem('bag')) || [];
            const newBag = [...currentBag, item];
            localStorage.setItem('bag', JSON.stringify(newBag));
            updateBag(newBag); // Update the bag state in the parent component
        }
    };



    return (
        <>
            <div className={'myBagSmallCardContainer'}>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <div className={'myBagSmallCardLeft'}>
                        <img src={item.image} alt={item.name} width={'100%'}/>
                    </div>
                    <div className={'myBagSmallCardRight'}>
                        <div style={{fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem'}}>{item.name}</div>
                        <div style={{marginBottom: '0.5rem'}}>{item.colorName}</div>
                        <div>Size {item.size}</div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '0.5rem'}}>
                            <div>Quantity</div>
                            <select
                                value={item.quantity}
                                onChange={handleQuantityChange}
                                style={{padding: '0.5rem', borderRadius: '4px'}}
                            >
                                {Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                            <div>${item.price * item.quantity}</div>

                        </div>
                        <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                            <div id='editBtn' onClick={handleShowEdit}>Edit</div>
                            <div>|</div>

                            {type === 'bag' ?
                                <div className={'textButton'} onClick={handelLaterOrBag}>Save for Later</div> :
                                <div className={'textButton'} onClick={handelLaterOrBag}>Move to Bag</div>
                            }
                        </div>

                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>Free Shipping + Free Returns</div>
                    <div className={'textButton'} onClick={showDeleteAlertBox}>Remove</div>
                </div>

            </div>


            {showEdit && <EditItem item={item} handleShowEdit={handleShowEdit} updateBag={updateBag}/>}
            {showDeleteAlert &&
                <DeleteAlertBox handelDelete={handelDelete} closeDeleteAlertBox={closeDeleteAlertBox} type={type}/>}
        </>
    );
};

export default MyBagSmallCard;