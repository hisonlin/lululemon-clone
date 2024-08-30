import {actionType} from "../const";

const bagState = {
    bag: [],
    saveForLater: [],
}

export const bagReducer = (state = bagState, action) => {
    switch (action.type) {
        case actionType.ADD_TO_BAG: {
            //Check if the item already exists in the bag and find its index
            const existingItemIndex = state.bag.findIndex(
                item =>
                    item.productId === action.item.productId &&
                    item.color === action.item.color &&
                    item.size === action.item.size
            );


            if (existingItemIndex !== -1) {
                // Item exists, update its quantity
                const updatedBag = state.bag.map((item, index) =>
                    index === existingItemIndex
                        ? {...item, quantity: item.quantity + action.item.quantity}
                        : item
                );
                return {
                    ...state,
                    bag: updatedBag
                };
            } else {
                // Item doesn't exist, add to the bag
                return {
                    ...state,
                    bag: [...state.bag, action.item]
                };
            }
        }
        case actionType.REMOVE_FROM_BAG:
            return {
                ...state,
                bag: state.bag.filter(item => item.productId !== action.item.productId || item.color !== action.item.color || item.size !== action.item.size)
            }
        case actionType.GET_ALL_FROM_BAG:
            return {
                ...state
            }
        case actionType.MODIFY_QUANTITY:
            const updatedBag = state.bag.map(item =>
                item.productId === action.item.productId &&
                item.color === action.item.color &&
                item.size === action.item.size
                    ? {...item, quantity: action.quantity}
                    : item
            );
            return {
                ...state,
                bag: updatedBag
            }
        case actionType.ADD_TO_SAVE_FOR_LATER:
            return {
                ...state,
                saveForLater: [...state.saveForLater, action.item]
            }
        case actionType.REMOVE_FROM_SAVE_FOR_LATER:
            return {
                ...state,
                saveForLater: state.saveForLater.filter(item => item.productId !== action.item.productId || item.color !== action.item.color || item.size !== action.item.size)
            }
        case actionType.CLEAR_BAG:
            return {
                ...state,
                bag: []
            }
        default:
            return state
    }
}