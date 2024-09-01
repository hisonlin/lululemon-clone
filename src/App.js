import './App.css';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import filterBarActions from "./actions/filterBarAction";
import productAction from "./actions/productAction";
import OneProduct from "./pages/OneProduct";
import MyBag from "./pages/MyBag";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";


function App() {
    const dispatch = useDispatch();
    const bodyData = useSelector(state => state.filterBarReducer.bodyData);
    // console.log('bodyData:', bodyData)

    useEffect(() => {
        dispatch(filterBarActions.fetchFilterBarData());

    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(bodyData).length > 0) {
            dispatch(productAction.fetchProducts(1, 1, bodyData));
        }
        // console.log('fetchProduct function called')
    }, [bodyData, dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:productId/:color" element={<OneProduct/>}/>
            <Route path="/mybag" element={<MyBag/>}/>
            <Route path="/checkout" element={<CheckOut/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/order-confirmation" element={<OrderConfirmation/>}/>
            <Route path="/login" element={<Login/>}/>

        </Routes>
    );
}

export default App;
