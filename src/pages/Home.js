import React, {useState, useEffect} from 'react';
import ProductContainer from "../components/product/ProductContainer/ProductContainer";
import FilterBar from "../components/FilterBar/FilterBar";
import './Home.css';
import {Footer} from "../components/Footer/Footer";
import MainHeader from "../components/Header/MainHeader";
import SmallScreenHeader from "../components/Header/SmallScreenHeader/SmallScreenHeader";
import SmallerFooter from "../components/Footer/SmallFooter/SmallerFooter";
import {useSelector} from "react-redux";
import CircularIndeterminate from "../components/Progress/Progress";

const Home = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 985);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 985);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    

    const productsShowing = useSelector(state => state.productReducer.productsShowing);

    return (
        <div className={'homeContainer'}>
            {isSmallScreen ? <SmallScreenHeader/> : <MainHeader/>}
            {productsShowing.length>0?<div className={'mainBody'}>
                {!isSmallScreen && <FilterBar/>}
                <ProductContainer/>
            </div>:CircularIndeterminate()}
            {isSmallScreen ? <SmallerFooter/> : <Footer/>}
        </div>
    );
};

export default Home;
