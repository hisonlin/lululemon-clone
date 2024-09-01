import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './FilterBar.scss';
import filterBarAction from "../../actions/filterBarAction";
import productAction from "../../actions/productAction";
import ClearIcon from "@mui/icons-material/Clear";

const FilterBar = () => {
    const dispatch = useDispatch();
    const filterType = useSelector(state => state.filterBarReducer.filterType);
    const filterData = useSelector(state => state.filterBarReducer.filterData);
    const selectedFilter = useSelector(state => state.filterBarReducer.selectedFilter); // Corrected typo here
// console.log('selectedFilter:', selectedFilter)
    const [collapsed, setCollapsed] = useState({});
    const [viewMore, setViewMore] = useState({});

    const handleButtonClick = (type, data) => {
        const key = type === 'Colour' ? 'alt' : 'name';
        const isSelected = selectedFilter.some(([filterType, filterKey, filterValue]) =>
            filterType === type && filterKey === key && filterValue === data[key]
        );

        if (isSelected) {
            // Remove filter if already selected

            dispatch(filterBarAction.removeSelectedFilter(type, key, data[key]));
        } else {
            // Add filter if not selected
            console.log('type', type, 'key', key, 'data[key]', data[key])
            dispatch(filterBarAction.setSelectedFilter(type, key, data[key]));

        }

        // reset products showing and update the body data
        dispatch(productAction.setProductsShowing([]));
        // console.log('setProductsShowing function called')
        dispatch(filterBarAction.updateBodyData(type, key, data[key]));
        // console.log('updateBodyData function called')

    };

    const toggleCollapse = (index) => {
        setCollapsed(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const toggleViewMore = (index) => {
        setViewMore(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };


    const removeSelectedFilter = (type, key, value) => {
        dispatch(filterBarAction.removeSelectedFilter(type, key, value));
        dispatch(productAction.setProductsShowing([]));
        dispatch(filterBarAction.updateBodyData(type, key, value));

    }

    return (
        <div className="FilterBar-container">
            <div>
                <h2>What's New</h2>

                {<div id={'selectedFilters'}>
                    <div id="selectedFilterContainer">
                        {selectedFilter.length > 0 && selectedFilter.map((filter, index) => (
                            <div key={index} id="selectedFilter"
                                 onClick={() => removeSelectedFilter(filter[0], filter[1], filter[2])}>
                                <div id="selectedFilterName">
                                    <div>{filter[2]}</div>
                                    <ClearIcon  style={{fontSize:'0.8rem'}}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
            {filterType.map((type, index) => (
                <div key={index} style={{borderTop: '1px solid lightgray', padding: '10px'}}>
                    <div className="filter-title">
                        <h3 style={{margin: '0'}}>{type}</h3>
                        <span style={{cursor: 'pointer', width: "auto"}}
                              onClick={() => toggleCollapse(index)}>{collapsed[index] ? '+' : '-'}
                        </span>
                    </div>
                    {!collapsed[index] && (
                        <div>
                            <div className={`filter-items ${type === 'Size' ? 'size-filter' : ''}`}>
                                {filterData[index].slice(0, viewMore[index] ? filterData[index].length : 5).map((data, dataIndex) => {
                                    const key = type === 'Colour' ? 'alt' : 'name';
                                    const isChecked = selectedFilter.some(([filterType, filterKey, filterValue]) =>
                                        filterType === type && filterKey === key && filterValue === data[key]
                                    );

                                    return (
                                        <div key={dataIndex} style={{display: 'flex', flexDirection: 'row'}}>
                                            {type !== 'Colour' && (
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleButtonClick(type, data)}
                                                />
                                            )}
                                            <label style={{
                                                cursor: 'pointer',
                                                marginLeft: '10px',
                                                marginBottom: '10px'
                                            }}
                                                   onClick={() => handleButtonClick(type, data)}>
                                                {type !== 'Colour' ?
                                                    <div>{data.name}</div> :
                                                    <div className='color-container'
                                                         style={{
                                                             display: 'flex',
                                                             alignItems: 'center',
                                                             gap: '10px'
                                                         }}>
                                                        <img src={data.swatch} alt="" style={{
                                                            borderRadius: '50%',
                                                            width: '24px',
                                                            height: '24px',
                                                            objectFit: 'cover',
                                                        }}/>
                                                        <div>{data.alt}</div>
                                                    </div>}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            {filterData[index].length > 5 && (
                                <button className={'filterBarViewMoreBtn'} style={{cursor: 'pointer'}}
                                        onClick={() => toggleViewMore(index)}>
                                    {viewMore[index] ? 'View Less -' : 'View More +'}
                                </button>)}
                        </div>)}
                </div>
            ))}
        </div>
    );
};

export default FilterBar;