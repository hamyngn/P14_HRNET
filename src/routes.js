import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Employee from "./pages/Employee";

const routes = createBrowserRouter([
    {
        path:"/", 
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/employee-list",
                element: <Employee />
            },
        ]
    }
])
export default routes;
