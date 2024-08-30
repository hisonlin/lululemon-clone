import axios from "axios";
import {actionType} from "../const";

const proxyURL=process.env.REACT_APP_PROXY_URL;
const APIKEY = process.env.REACT_APP_API_KEY;

const fetchOneProduct = (productId, color) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${proxyURL}/product${productId}?&mykey=${APIKEY}`);
            const product = res.data.rs;
            // console.log('product:', product);
            const initialColorIndex = product.swatches.findIndex(swatch => swatch.swatchAlt === color);
            // console.log('initialColorIndex:', initialColorIndex);
            dispatch({
                type: actionType.FETCH_ONE_PRODUCT,
                product,
                initialColorIndex
            });


        } catch (e) {
            console.log(e);
        }
    }
}

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
