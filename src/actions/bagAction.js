import {actionType} from "../const";

const addToBag = (item) => {
    return {
        type: actionType.ADD_TO_BAG,
        item
    }
}

const removeFromBag = (item) => {
    return {
        type: actionType.REMOVE_FROM_BAG,
        item
    }

}

const getAllFromBag = () => {
    return {
        type: actionType.GET_ALL_FROM_BAG
    }

}

const modifyQuantity=(item, quantity)=>{
    return{
        type:actionType.MODIFY_QUANTITY,
        item,
        quantity
    }

}

const modifyColorAndSize=(item, selectedItem)=>{
    return(dispatch)=>{
        dispatch(removeFromBag(item));
        dispatch(addToBag(selectedItem));
    }

}

const addToSaveForLater = (item) => {
    return {
        type: actionType.ADD_TO_SAVE_FOR_LATER,
        item
    }
}

const removeFromSaveForLater = (item) => {
    return {
        type: actionType.REMOVE_FROM_SAVE_FOR_LATER,
        item
    }
}

const saveForLater = (item) => {
    return (dispatch) => {
        dispatch(removeFromBag(item));
        dispatch(addToSaveForLater(item));
    }
}

const moveToBag = (item) => {
    return (dispatch) => {
        dispatch(removeFromSaveForLater(item));
        dispatch(addToBag(item));
    }

}

const clearBag = () => {
    return {
        type: actionType.CLEAR_BAG
    }
}


export default {
    addToBag,
    removeFromBag,
    getAllFromBag,
    modifyQuantity,
    modifyColorAndSize,
    addToSaveForLater,
    removeFromSaveForLater,
    saveForLater,
    moveToBag,
    clearBag
}
