import {actionType} from "../const";

const checkoutState = {
    userInfo: {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
    },
}

export const checkoutReducer = (state = checkoutState, action) => {
    switch (action.type) {
        case actionType.UPDATE_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state
    }
}