import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    // wrap app with ProducsProvider to pass down context (open side bar step 1)
    <ProductsProvider>
        {/* we want to get data from our ProductsProvider inside of the FilterProvider so we need to wrap FilterProvider with ProductsProvider */}
        <FilterProvider>
            <App />
        </FilterProvider>
    </ProductsProvider>
);
