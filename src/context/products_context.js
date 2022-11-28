import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

// (open side bar step 3)
const initialState = {
    isSidebarOpen: true,
};

// (open side bar step 2)
const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
    // pass in function and object to useReducer
    // (open side bar step 4)
    const [state, dispatch] = useReducer(reducer, initialState);

    // (open side bar step 5 define function calls)
    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN });
    };
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE });
    };

    return (
        // (open side bar step 7 pass state, openSidebar, closeSidebar down app)
        <ProductsContext.Provider
            value={{ ...state, openSidebar, closeSidebar }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
// make sure use
export const useProductsContext = () => {
    return useContext(ProductsContext);
};
