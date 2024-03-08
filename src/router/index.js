import Layout from "../pages/Layout"
import Login from "../pages/Login"
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
import {lazy, Suspense} from 'react'

import {
    createBrowserRouter,
} from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";


// 1. Lazy函数动态导入
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))


const router = createBrowserRouter([
    {
        path: "/",
        element:
            <AuthRoute>
                <Layout/>
            </AuthRoute>,
        children: [
            {
                path: "home",
                element: <Suspense fallback={'Loading...'}><Home/></Suspense>
            },
            {
                index: true,
                element: <Suspense fallback={'Loading...'}><Home/></Suspense>
            },
            {
                path: "article",
                element: <Suspense fallback={'Loading...'}><Article/></Suspense>

            },
            {
                path: "publish",
                element: <Suspense fallback={'Loading...'}><Publish/></Suspense>

            }
        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
])

export default router