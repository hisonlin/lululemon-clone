import axios from "axios";
import {actionType} from "../const";
// import { saveAs } from 'file-saver';

const productAPIURL=process.env.REACT_APP_PRODUCT_API_URL;
const APIKEY=process.env.REACT_APP_API_KEY;
const corsProxy = 'https://cors-anywhere.herokuapp.com/';


const fetchProducts = (sortingID, page, bodyData) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        try {
            const res = await axios.post(
                `${corsProxy}${productAPIURL}sortingId=${sortingID}&page=${page}&mykey=${APIKEY}`,
                bodyData
            );
            const products = res.data.rs.products;
            // console.log('products:', products);
            const currentPage = page;
            const totalPage = res.data.rs.pageParams.totalPage;
            const totalProducts = res.data.rs.pageParams.totalProducts;

            // console.log('products:', products);

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

const getImages = (products) => {
    return (dispatch) => {
        const imagesArray = [];
        products.forEach(product => {
            const productImages = product.images?.map(imageObj => {
                const images = imageObj.mainCarousel.media;
                return images.split('|').map(image => image.trim());
            });
            imagesArray.push(productImages);
        });
        dispatch({
            type: actionType.GET_IMAGES,
            imagesArray
        });
    };
};

const getColorInfo = (products) => {
    return (dispatch) => {
        const colorImagesArray = [];
        const colorNamesArray = [];
        products.forEach(product => {
            const colorImages = product.swatches?.map(color => color.swatch);
            const colorNames = product.swatches?.map(color => color.swatchAlt);
            colorImagesArray.push(colorImages);
            colorNamesArray.push(colorNames);
        });

        dispatch({
            type: actionType.GET_COLORS,
            colorImagesArray,
            colorNamesArray
        });
    }
}

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
