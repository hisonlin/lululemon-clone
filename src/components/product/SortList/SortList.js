import React, {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useDispatch, useSelector} from "react-redux";
import productAction from "../../../actions/productAction";
import './SortList.css';

const SortList = () => {

    const [selectedSort, setSelectedSort] = useState('Featured');
    const[isOpened, setIsOpened] = useState(false);
    const dispatch = useDispatch();

    const bodyData = useSelector(state => state.filterBarReducer.bodyData);

    const handleSortItemClick = (sort) => {
        setSelectedSort(sort);
        let sortID='';
        if(sort==='Featured')
            sortID=1;
        else if(sort==='New Arrivals')
            sortID=2;
        else if(sort==='Top Rated')
            sortID=3;
        dispatch(productAction.setProductsShowing([]));
        dispatch(productAction.fetchProducts(sortID, 1, bodyData));
        setIsOpened(false);
    }

    const handleSortListClick = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div className={'sortListContainer'}>
            <div className={'sortListTitle'}>
                <div>Sort by</div>
                <div className={'sortListMainBtn'} onClick={handleSortListClick}>
                    <div>{selectedSort}</div>
                    <KeyboardArrowDownIcon/>
                </div>
            </div>
            {isOpened&&<div className={'sortList'}>
                <div className={'sortItem'} onClick={()=>handleSortItemClick('Featured')}>Featured</div>
                <div className={'sortItem'} onClick={()=>handleSortItemClick('New Arrivals')}>New Arrivals</div>
                <div className={'sortItem'} onClick={()=>handleSortItemClick('Top Rated')}>Top Rated</div>
            </div>}


        </div>
    );
};

export default SortList;