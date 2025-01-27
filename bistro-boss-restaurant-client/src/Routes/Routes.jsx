import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import Secret from "../Shared/Secret";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/Dashboard/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoute>
                    <Secret></Secret>
                </PrivateRoute>
            },
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashBoard></DashBoard>
        </PrivateRoute>,
        children: [
            // Normal user routes //
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            // Admin related routes //
            {
                path: 'adminHome',
                element: <AdminRoute>
                    <AdminHome></AdminHome>
                </AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute>
                    <AddItems></AddItems>
                </AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute>
                    <ManageItems></ManageItems>
                </AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute>
                    <UpdateItem></UpdateItem>
                </AdminRoute>,
                loader: ({params}) => fetch(`https://y-sand-pi.vercel.app/menu/${params.id}`)
            },
            {
                path: 'users',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
        ]
    }
]);