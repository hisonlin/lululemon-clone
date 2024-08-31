import axios from "axios";
import {actionType, proxyServerURL} from "../const";

const fetchFilterBarData = () => {
    return async (dispatch) => {
        try {
            // Make a GET request to the backend proxy server
            const res = await axios.get(`${proxyServerURL}/api/filter`);

            // Extract response data
            const bodyData = res.data.rs;

            // Prepare filterType and filterData arrays
            const filterType = Object.keys(bodyData);
            const filterData = Object.values(bodyData);

            // Secure the swatch image URLs using proxy endpoint
            filterData.forEach((itemArray) => {
                itemArray.forEach((item) => {
                    if (item.swatch) {
                        // Secure the swatch image URL using proxy endpoint
                        item.swatch = `${proxyServerURL}/proxy-image?imageUrl=${encodeURIComponent(item.swatch)}`;
                    }
                });
            });

            console.log('filterData:', filterData);

            // Dispatch action with fetched data
            dispatch({
                type: actionType.FETCH_FILTER_BAR_DATA,
                bodyData,
                filterType,
                filterData
            });
        } catch (error) {
            // Improved error handling
            console.error('Error fetching filter bar data:', error.message);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };
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


