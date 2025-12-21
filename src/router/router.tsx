import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout.tsx";
import SignUp from "../pages/SignUp.tsx";

const Home = () => <div className="text-2xl font-bold">홈 화면</div>;
const Login = () => <div className="text-2xl font-bold">로그인 화면</div>;

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <SignUp /> },
        ],
    },
]);

export default router;
