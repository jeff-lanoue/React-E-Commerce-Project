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
        let maxPrice = action.payload.map((p) => p.price);
        maxPrice = Math.max(...maxPrice);

        return {
            ...state,
            all_products: [...action.payload],
            filtered_products: [...action.payload],
            filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
        };
    }

    if (action.type === SET_GRIDVIEW) {
        return {
            ...state,
            grid_view: true,
        };
    }
    if (action.type === SET_LISTVIEW) {
        return {
            ...state,
            grid_view: false,
        };
    }
    if (action.type === UPDATE_SORT) {
        return { ...state, sort: action.payload };
    }

    if (action.type === SORT_PRODUCTS) {
        const { sort, filtered_products } = state;
        let tempProducts = [...filtered_products];

        if (sort === "price-lowest") {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        }
        if (sort === "price-highest") {
            tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        }
        if (sort === "name-a") {
            tempProducts = tempProducts.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        }
        if (sort === "name-z") {
            tempProducts = tempProducts.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
        }

        return { ...state, filtered_products: tempProducts };
    }
    if (action.type === UPDATE_FILTERS) {
        // destructure from payload
        const { name, value } = action.payload;
        // using spread we preserver other values in the state, we dynamically access the prop via [name].
        return { ...state, filters: { ...state.filters, [name]: value } };
    }
    if (action.type === FILTER_PRODUCTS) {
        console.log(state.filters.text);
        console.log("FILTERING...");
        return { ...state };
        // jlanoue
        // https://www.udemy.com/course/react-tutorial-and-projects-course/learn/lecture/23657404#overview
    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                ...state.filters, // override the values below with values from state
                text: "",
                company: "all",
                category: "all",
                color: "all",
                price: state.filters.max_price,
                shipping: false,
            },
        };
    }
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
