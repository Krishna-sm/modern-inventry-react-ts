import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import History from "./pages/History";
import Draft from "./pages/Draft";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:App,
        children:[
            {
                path:'',
                Component:Home
            },
            {
                path:'create',
                Component:Orders
            },
            {
                path:'history',
                Component:History
            },
            {
                path:'draft',
                Component:Draft
            }
        ]
    }
])