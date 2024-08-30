import {combineReducers} from "redux";
import {filterBarReducer} from "./filterBarReducer";
import {productReducer} from "./productReducer";
import {oneProductReducer} from "./oneProductReducer";
import {reviewsReducer} from "./reviewsReducer";
import {bagReducer} from "./bagReducer";
import {checkoutReducer} from "./CheckoutReducer";

export default combineReducers({
  filterBarReducer,
  productReducer,
  oneProductReducer,
  reviewsReducer,
  bagReducer,
  checkoutReducer,

})