import {actionType} from "../const";

const userState = {
    user: null,
    token: "",

}

export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return {
                ...state,
                token: action.token
            };
        case actionType.GET_USER_INFO:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};