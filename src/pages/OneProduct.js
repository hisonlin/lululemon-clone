import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import oneProductAction from "../actions/oneProductAction";
import OneProductMain from "../components/OneProduct/OneProductMain/OneProductMain";
import { Footer } from "../components/Footer/Footer";
import './OneProduct.css';
import WhyWeMadeThis from "../components/OneProduct/WhyWeMadeThis/WhyWeMadeThis";
import Feature from "../components/OneProduct/Feature/Feature";
import YouMayAlsoLike from "../components/OneProduct/YouMayAlsoLike/YouMayAlsoLike";
import ReviewsContainer from "../components/OneProduct/Reviews/ReviewsContainer";
import MainHeader from "../components/Header/MainHeader";
import SmallScreenHeader from "../components/Header/SmallScreenHeader/SmallScreenHeader";
import SmallScreenOneProductMain
    from "../components/OneProduct/OneProductMain/SmallScreenOneProductMain/SmallScreenOneProductMain";
import SmallerFooter from "../components/Footer/SmallFooter/SmallerFooter";

const OneProduct = () => {

    const { productId, color } = useParams();
    const formattedColor = color.replace(/-/g, ' ');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(oneProductAction.fetchOneProduct(productId, formattedColor));

    }, [dispatch, productId, formattedColor]);

    const product = useSelector(state => state.oneProductReducer.product);
    const initialColorIndex = useSelector(state => state.oneProductReducer.initialColorIndex);

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
    return (
        <div>
            {isSmallScreen ? <SmallScreenHeader/> : <MainHeader/>}
            {!isSmallScreen?<div className={'oneProductContainer'}>
                <OneProductMain product={product} initialColorIndex={initialColorIndex} isSmallScreen={isSmallScreen}/>
                <WhyWeMadeThis product={product} initialColorIndex={initialColorIndex} />
                <Feature product={product} />
                <YouMayAlsoLike productId={productId} />
                <ReviewsContainer productId={productId} />
                {isSmallScreen ? <SmallerFooter/> : <Footer/>}
            </div>:<div className={'smallScreenOneProductContainer'}>
                <SmallScreenOneProductMain product={product} initialColorIndex={initialColorIndex} isSmallScreen={isSmallScreen} productId={productId}/>
            </div>}

        </div>
    );
};

export default OneProduct;

