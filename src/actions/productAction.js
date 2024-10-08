import axios from "axios";
import {actionType} from "../const";
// import { saveAs } from 'file-saver';

const proxySever= process.env.REACT_APP_PROXY_SERVER_URL;

const fetchProducts = (sortingID, page, bodyData) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        try {
            const res = await axios.post(`${proxySever}/api/fetch-products`, {
                sortingID,
                page,
                bodyData,
            });
            let products = res.data.rs.products;
            // console.log('products:', products);
            const currentPage = page;
            const totalPage = res.data.rs.pageParams.totalPage;
            const totalProducts = res.data.rs.pageParams.totalProducts;
            
            // Dispatch actions
            dispatch({
                type: actionType.FETCH_PRODUCT_DATA,
                products,
                currentPage,
                totalPage,
                totalProducts,
            });
            dispatch(setProductsShowing(products));
            // addFilter(products,'Women');


            // // Save products to a file
            // saveProductsToFile(products);
        } catch (e) {
            console.log(e);
        }
    }
};

// // Function to save products as a JSON file
// const saveProductsToFile = (products) => {
//     const fileContent = JSON.stringify(products, null, 2);
//     const blob = new Blob([fileContent], { type: 'application/json' });
//     saveAs(blob, 'productsData.json');
// };

// Action to fetch images securely via backend
const getImages = (products) => {
    return async (dispatch) => {
        try {
            // Create a new array to hold images fetched through the proxy
            const imagesArray = await Promise.all(products.map(async (product) => {
                const productImages = await Promise.all(product.images?.map(async (imageObj) => {
                    // Extract and split the main carousel media URLs
                    const images = imageObj.mainCarousel.media.split('|').map(image => image.trim());
                    
                    // Fetch each image securely via the backend proxy
                    const secureImages = await Promise.all(images.map(async (imageUrl) => {
                        // Fetch image through the proxy endpoint
                        const proxyImageUrl = `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(imageUrl)}`;
                        return proxyImageUrl; // Return the secure proxy URL
                    }));
                    
                    return secureImages;
                }) || []); // Ensure it handles cases where images might be undefined
                
                return productImages;
            }));

            // Dispatch action with the fetched images
            dispatch({
                type: actionType.GET_IMAGES,
                imagesArray,
            });
        } catch (error) {
            console.error('Error fetching images through proxy:', error.message);
            // Optionally, handle errors or dispatch an error-specific action
        }
    };
};

// Action to fetch color information securely via backend
const getColorInfo = (products) => {
    return async (dispatch) => {
        try {
            // Create arrays for color images and names
            const colorImagesArray = await Promise.all(products.map(async (product) => {
                // Fetch each swatch image securely via the backend proxy
                const colorImages = await Promise.all(product.swatches?.map(async (color) => {
                    const proxyImageUrl = `${proxySever}/proxy-image?imageUrl=${encodeURIComponent(color.swatch)}`;
                    return proxyImageUrl; // Return the secure proxy URL
                }) || []); // Handle cases where swatches might be undefined

                return colorImages;
            }));

            const colorNamesArray = products.map(product => 
                product.swatches?.map(color => color.swatchAlt) || [] // Extract color names
            );

            // Dispatch action with the fetched color images and names
            dispatch({
                type: actionType.GET_COLORS,
                colorImagesArray,
                colorNamesArray
            });
        } catch (error) {
            console.error('Error fetching color images through proxy:', error.message);
            // Optionally, handle errors or dispatch an error-specific action
        }
    };
};

const setCurrentPage = (page) => {
    return ({
        type: actionType.SET_CURRENT_PAGE,
        page
    });
}

const setProductsShowing = (products) => {
    return ({
        type: actionType.SET_PRODUCTS_SHOWING,
        products
    });
}




export default {
    fetchProducts,
    getImages,
    getColorInfo,
    setCurrentPage,
    setProductsShowing,
}
