import {actionType} from "../const";

const filterState = {
    bodyData: {},
    filterType: [],
    filterData: [],
    selectedFilter: [],
    type:'',
    value:''
}

export const filterBarReducer = (state = filterState, action) => {
    switch (action.type) {
        case actionType.FETCH_FILTER_BAR_DATA:
            return {
                ...state,
                bodyData: {...action.bodyData},
                filterType: action.filterType,
                filterData: action.filterData
            }
        case actionType.UPDATE_BODY_DATA:
            const {type, key, value} = action.payload;
            return {
                ...state,
                bodyData: {
                    ...state.bodyData,
                    [type]: state.bodyData[type].map(item => {
                        if (item[key] === value) {
                            return {...item, isChecked: !item.isChecked};
                        }
                        return item;
                    })
                }
            };
        case actionType.SET_SELECTED_FILTER:
            const filterInfoArray = [];
            filterInfoArray.push(action.filterType);
            filterInfoArray.push(action.key);
            filterInfoArray.push(action.value);
            return {
                ...state,
                selectedFilter: [...state.selectedFilter, filterInfoArray],
                type: action.filterType,
                value: action.value

            };
        case actionType.REMOVE_SELECTED_FILTER:
            const newSelectedFilter = state.selectedFilter.filter(filter => {
                return filter[0] !== action.filterType || filter[1] !== action.key || filter[2] !== action.value;
            });
            return {
                ...state,
                selectedFilter: newSelectedFilter
            }
        default:
            return state
    }
}