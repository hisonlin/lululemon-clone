import axios from "axios";
import {actionType} from "../const";

const proxyURL=process.env.REACT_APP_PROXY_URL;
const APIKEY = process.env.REACT_APP_API_KEY;

const fetchFilterBarData = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${proxyURL}/product/filter?mykey=${APIKEY}`);
            // console.log('res:', res)
            const bodyData = res.data.rs;
            // console.log('bodyData:', bodyData);
            const filterType = [];
            const filterData = [];

            for (const key in bodyData) {
                filterType.push(key);
                filterData.push(bodyData[key]);
            }
            dispatch({
                type: actionType.FETCH_FILTER_BAR_DATA,
                bodyData,
                filterType,
                filterData
            });
        } catch (e) {
            console.log(e);
        }
    }
};

const updateBodyData = (type, key, value) => {
    return (dispatch) => {
        dispatch({
            type: actionType.UPDATE_BODY_DATA,
            payload: {type, key, value}
        });

    }
};

const setSelectedFilter = (filterType, key, value) => {
    return (dispatch) => {
        dispatch({
            type: actionType.SET_SELECTED_FILTER,
            filterType,
            key,
            value
        });
    }
}

const removeSelectedFilter = (filterType, key, value) => {
    return (dispatch) => {
        dispatch({
            type: actionType.REMOVE_SELECTED_FILTER,
            filterType,
            key,
            value
        });
    }
}


export default {
    fetchFilterBarData,
    updateBodyData,
    setSelectedFilter,
    removeSelectedFilter
}


