import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import './ProductContainer.css';
import productAction from "../../../actions/productAction";
import SortList from "../SortList/SortList";
import filterBarAction from "../../../actions/filterBarAction";
import ClearIcon from '@mui/icons-material/Clear';
import FilterBar from "../../FilterBar/FilterBar";
import {Box, Drawer} from "@mui/material";

const ProductContainer = () => {

    const dispatch = useDispatch();

    const productsShowing = useSelector(state => state.productReducer.productsShowing);
    // console.log('productsShowing:', productsShowing);

    const imagesArray = useSelector(state => state.productReducer.imagesArray);
    // console.log('imagesArray:', imagesArray);

    useEffect(() => {
        if (productsShowing.length > 0) {
            dispatch(productAction.getImages(productsShowing));
            dispatch(productAction.getColorInfo(productsShowing));
        }
    }, [productsShowing, dispatch]);

    const bodyData = useSelector(state => state.filterBarReducer.bodyData);
    const totalProducts = useSelector(state => state.productReducer.totalProducts);
    const currentPage = useSelector(state => state.productReducer.currentPage);
    const totalPage = useSelector(state => state.productReducer.totalPage);
    const colorImagesArray = useSelector(state => state.productReducer.colorImagesArray);
    // console.log('colorImagesArray:', colorImagesArray);
    const selectedFilter = useSelector(state => state.filterBarReducer.selectedFilter);
    // console.log('selectedFilter:', selectedFilter);


    const handleViewMore = () => {
        dispatch(productAction.fetchProducts(1, currentPage + 1, bodyData));
    }

    const removeSelectedFilter = (type, key, value) => {
        dispatch(filterBarAction.removeSelectedFilter(type, key, value));
        dispatch(productAction.setProductsShowing([]));
        dispatch(filterBarAction.updateBodyData(type, key, value));

    }

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


    const [open, setOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(window.innerWidth - 50);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            setDrawerWidth(window.innerWidth - 100);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const DrawerList = (
        <Box sx={{width: drawerWidth}} role="presentation">
            <FilterBar/>
            <div style={{display:'flex', justifyContent:'center'}}>
                <button className={'viewMoreBtn'} style={{width: '80%'}} onClick={toggleDrawer(false)}>VIEW ITEMS ({totalProducts})
                </button>
            </div>
        </Box>
    )

    return (
        <div className={'mainContainer'}>
            {isSmallScreen &&
                <div style={{alignSelf: 'self-start'}}>Showing {productsShowing.length} of {totalProducts} results
                    for:</div>}

            <div className="productHeader">

                <div className="allItems">
                    All Items {!isSmallScreen && `(${totalProducts})`}
                </div>
                {!isSmallScreen && <SortList/>}

            </div>
            {isSmallScreen &&
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button className={'viewMoreBtn'} onClick={toggleDrawer(true)}>
                        FILTER & SORT ({selectedFilter.length})
                    </button>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>}

            {!isSmallScreen && <div className="selectedFilterContainer">
                {selectedFilter.length > 0 && selectedFilter.map((filter, index) => (
                    <div key={index} className="selectedFilter"
                         onClick={() => removeSelectedFilter(filter[0], filter[1], filter[2])}>
                        <div className="selectedFilterName">
                            <div>{filter[2]}</div>
                            <ClearIcon/>
                        </div>
                    </div>
                ))}
            </div>}
            <div className={'cardContainer'}>
                {productsShowing.length > 0 && productsShowing.map((product, index) => (
                    <ProductCard key={index}
                                 product={product}
                                 images={imagesArray.length > 0 ? imagesArray[index] : undefined}
                                 colorImages={colorImagesArray[index]}
                                 index={index}
                                 isSmallScreen={isSmallScreen}
                    />
                ))}
            </div>

            <div className={'viewMore'}>
                <div className={'viewMoreText'}>Viewing {productsShowing.length} of {totalProducts}</div>
                {currentPage === totalPage ? null :
                    <button className={'viewMoreBtn'}
                            onClick={handleViewMore}>
                        VIEW MORE PRODUCTS
                    </button>}
            </div>
        </div>
    );
};

export default ProductContainer;