import React, {useEffect, useState} from 'react';
import {createBrowserRouter, Outlet, RouterProvider, useNavigate} from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import RegisterForm from "./pages/register/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {callFetchAccount, callRegister} from "./services/api.js";
import {doGetAccountAction} from "./redux/account/accountSlice.js";
import Header from "./components/Header/index..jsx";
import Footer from "./components/Footer/index.jsx";
import Home from "./components/Home/index.jsx";
import Loading from "./components/Loading/index.jsx";
import LayoutAdmin from "./components/Admin/LayoutAdmin.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ManageUserPage from "./pages/admin/user/index.jsx";
import ManageCategory from "./pages/admin/category/index.jsx";
import ManageProduct from "./pages/admin/product/index.jsx";
import About from "./components/About/index.jsx";
import Contact from "./components/Contact.jsx";
import Product from "./pages/admin/product/index.jsx";
import ProductDetail from "./components/ProductDetail/index.jsx";
import ForgotForm from "./pages/forgot/index.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import Cart from "./components/Cart/index.jsx";
import HistoryPage from "./pages/history/index.jsx";
import ManageOrderPage from "./pages/admin/order/index.jsx";


const Layout = () => {
    return (
        <div className="layout-app">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default function App() {


    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.account.isLoading)

    const getAccount = async() =>{
        if (window.location.pathname === "/login"
            || window.location.pathname === "/register"

        ) {
            return;
        }
        const res = await callFetchAccount();
        console.log('this is r', res.statusCode);

        if(res && res.statusCode===200) {
            dispatch(doGetAccountAction(res))
        }
    }
    useEffect(() => {
        getAccount();
    }, []);

    const router =createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            errorElement: <NotFound/>,
            children:[
                {
                    index: true,
                    element: <Home/>,
                },
                {
                    path: "/about",
                    element: <About/>,
                },
                {
                    path: "/contact",
                    element: <Contact/>
                },
                {
                    path: "/product",
                    element: <ProductDetail/>,
                },
                {
                    path: "/edit-profile",
                    element: <EditProfile/>,
                },
                {
                    path: "/cart",
                    element: <Cart/>
                },
                {
                    path:"/order",
                    element: <HistoryPage/>,
                },
            ]

        },
        {
            path:"/login",
            element: <LoginPage/>,
        },
        {
            path:"/register",
            element: <RegisterForm/>,
        },
        {
            path:"/forgot",
            element: <ForgotForm/>,
        },

        {
            path: "/admin",
            element: <ProtectedRoute><LayoutAdmin/></ProtectedRoute> ,
            errorElement: <NotFound/>,
            children: [
                {
                    index: true,
                    element: <AdminPage/>
                },
                {
                    path: "user",
                    element: <ManageUserPage/>
                },
                {
                    path: "category",
                    element: <ManageCategory/>,
                },
                {
                    path: "product",
                    element: <ManageProduct/>,
                },
                {
                    path: "order",
                    element: <ManageOrderPage/>
                }
            ]
        },
    ])

    return (
        <>
            {
                !isLoading
                || window.location.pathname === '/login'
                || window.location.pathname === '/register'
                || window.location.pathname === '/'
                    ? <RouterProvider router={router}/>
                    :
                    <Loading/>
            }
        </>
    );
}

