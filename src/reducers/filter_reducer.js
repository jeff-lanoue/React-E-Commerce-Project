import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
    /* 
        Using the spread operator for action payload will create a copy of the unfiltered products in memory.
        We are copying the value so we don't point to the same memory location
        */
    if (action.type === LOAD_PRODUCTS) {
        return {
            ...state,
            all_products: [...action.payload],
            filtered_products: [...action.payload],
        };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
