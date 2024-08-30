import {actionType} from "../const";

const productState={
    products:[],
    currentPage:1,
    totalPage:0,
    totalProducts:0,
    imagesArray:[],
    colorImagesArray:[],
    colorNamesArray:[],
    imageIndex:0,
    productsShowing:[]
}

export const productReducer = (state = productState, action) => {
    switch (action.type) {
        case actionType.FETCH_PRODUCT_DATA:
            return {
                ...state,
                products: action.products,
                totalPage: action.totalPage,
                totalProducts: action.totalProducts,
                perPage: action.perPage
            }
        case actionType.GET_IMAGES:
            return {
                ...state,
                imagesArray: action.imagesArray
            }
        case actionType.GET_COLORS:
            return {
                ...state,
                colorImagesArray: action.colorImagesArray,
                colorNamesArray: action.colorNamesArray
            }
        case actionType.GET_IMAGE_INDEX:
            return {
                ...state,
                imageIndex: action.index
            }
        case actionType.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case actionType.SET_PRODUCTS_SHOWING:
            return {
                ...state,
                productsShowing: action.products.length > 0 ?
                    [...state.productsShowing, ...action.products] : []
            }
        default:
            return state
    }
}