import axios from "axios";
import {actionType} from "../const";

const proxySever= process.env.REACT_APP_PROXY_SERVER_URL;

const fetchFilterBarData = () => {
    return async (dispatch) => {
        try {
            // Make a GET request to the backend proxy server
            const res = await axios.get(`${proxySever}/api/filter`);

            // Extract response data
            const bodyData = res.data.rs;

            
            const filterType = [];
            const filterData = [];

            for (const key in bodyData) {
                filterType.push(key);
                filterData.push(structuredClone(bodyData[key]));
            }

            // Secure the swatch image URLs using proxy endpoint
            filterData.forEach((itemArray) => {
                itemArray.forEach((item) => {
                    if (item.swatch) {
                        // Secure the swatch image URL using proxy endpoint
                        item.swatch = `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(item.swatch)}`;
                    }
                });
            });

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


