import axios from "axios";
import {actionType} from "../const";

const proxySever= process.env.REACT_APP_PROXY_SERVER_URL;

// Action to fetch one product
const fetchOneProduct = (productId, color) => {
    return async (dispatch) => {
        try {
            // Make a POST request to the backend to fetch one product
            const res = await axios.post(`${proxySever}/api/fetch-one-product`, { productId });
            
            // Extract the product data from the response
            const product = res.data.rs;
            // console.log('product:', product);

            await Promise.all(product.images.map(async (imageObj) => {
                const images = imageObj.mainCarousel.media.split('|').map(image => image.trim());
                imageObj.mainCarousel.media = images.map(imageUrl => `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(imageUrl)}`);
                // If the component expects a string, join them back:
                imageObj.mainCarousel.media = imageObj.mainCarousel.media.join('|');
            }));

            // Modify swatch URLs to use secure backend proxy
            product.swatches.forEach(swatch => {
                swatch.swatch = `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(swatch.swatch)}`;
            });

            // Modify featurePanel iconPath URLs to be secure
            product.featurePanels.forEach(panel => {
                panel.iconPath = `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(panel.iconPath)}`;
            });

            // Modify featureTitle iconPath URLs to be secure
            product.featureTitles.forEach(title => {
                title.iconPath = `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(title.iconPath)}`;
            });

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
