import {actionType} from "../const";

const updateUserInfo = (userInfo) => {
    return {
        type: actionType.UPDATE_USER_INFO,
        userInfo
    }
}

export default {
    updateUserInfo
}