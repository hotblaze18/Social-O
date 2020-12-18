import Dashboard from "../components/pages/Dashboard";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import Home from "../components/pages/Home";
import AddPost from "../components/pages/AddPost.vue";

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
    {
        path: "/add-post",
        component: AddPost
    }
]