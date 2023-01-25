import React, { useReducer } from "react";
//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

// Domain : dev-pn68ajbpebnb6hx6.us.auth0.com
// ClientID : BelaK2lR11y0NZgAObJTd2HuW8cbCD5q
//const root = ReactDOM.createRoot(document.getElementById("root"));
// LAST LESSON HERE, APP WONT WORK LOGIN STUFF IS BROKEN
// https://www.udemy.com/course/react-tutorial-and-projects-course/learn/lecture/23715800#overview

//root.render(
ReactDOM.render(
    <Auth0Provider
        domain="dev-pn68ajbpebnb6hx6.us.auth0.com"
        clientId="BelaK2lR11y0NZgAObJTd2HuW8cbCD5q"
        redirect_uri={window.location.origin}
        cacheLocation="localstorage"
    >
        <UserProvider>
            {/* // wrap app with ProducsProvider to pass down context (open side bar step 1)*/}
            <ProductsProvider>
                {/* we want to get data from our ProductsProvider inside of the FilterProvider so we need to wrap FilterProvider with ProductsProvider */}
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>,
    document.getElementById("root")
);
