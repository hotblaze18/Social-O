import Dashboard from "../components/pages/Dashboard";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import Home from "../components/pages/Home";

export default [
    {
        path: "/",
        component: Home
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/signup",
        component: Signup 
    },
    {
        path: "/login",
        component: Login
    },
]