import {actionType} from "../const";

const oneProductState = {
    product: {},
    initialColorIndex: 0,
    selectedItem: {},
}

export const oneProductReducer = (state = oneProductState, action) => {
    switch (action.type) {
        case actionType.FETCH_ONE_PRODUCT:
            return {
                ...state,
                product: action.product,
                initialColorIndex: action.initialColorIndex
            }

        case actionType.SELECTED_ITEM:
            return {
                ...state,
                selectedItem: action.item
            }
        default:
            return state
    }
}