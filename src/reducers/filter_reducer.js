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
        const { all_products } = state;
        const { text, company, category, color, price, shipping } =
            state.filters;
        let tempProducts = [...all_products]; // get freash set of data form the state ( unfiltered )

        // text
        if (text) {
            tempProducts = tempProducts.filter((product) => {
                return product.name.toLowerCase().startsWith(text);
            });
        }
        // company
        if (company !== "all") {
            tempProducts = tempProducts.filter(
                (product) => product.company === company
            );
        }
        // category
        if (category !== "all") {
            tempProducts = tempProducts.filter(
                (product) => product.category === category
            );
        }
        // color
        if (color !== "all") {
            tempProducts = tempProducts.filter((product) => {
                return product.colors.find((c) => c === color);
            });
        }
        // price
        tempProducts = tempProducts.filter((product) => product.price <= price);
        // shipping
        if (shipping) {
            tempProducts = tempProducts.filter(
                (product) => product.shipping === true
            );
        }
        // no filtering so return everything
        return { ...state, filtered_products: tempProducts };
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
