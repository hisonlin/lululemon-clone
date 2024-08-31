import axios from "axios";
import {actionType} from "../const";

const proxySever= process.env.REACT_APP_PROXY_SERVER_URL;

// Action to fetch one product
const fetchOneProduct = (productId, color) => {
    console.log('fetchOneProduct:', productId, color);
    return async (dispatch) => {
        try {
            // Make a POST request to the backend to fetch one product
            const res = await axios.post(`${proxySever}/api/fetch-one-product`, { productId });
            
            // Extract the product data from the response
            const product = res.data.rs;
            console.log('product:', product);

            // Find the initial color index based on the provided color
            const initialColorIndex = product.swatches.findIndex(swatch => swatch.swatchAlt === color);

            // Dispatch the action with the product data and the initial color index
            dispatch({
                type: actionType.FETCH_ONE_PRODUCT,
                product,
                initialColorIndex
            });

        } catch (error) {
            // Error handling
            console.error('Error fetching one product:', error.message);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
    };
};

const selectedItem = (item) => {
    return {
        type: actionType.SELECTED_ITEM,
        item
    }
}

export default {
    fetchOneProduct,
    selectedItem,
}
