import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout.tsx";
import SignUp from "../pages/SignUp.tsx";
import SignIn from "../pages/SignIn.tsx";

const Home = () => <div className="text-2xl font-bold">홈 화면</div>;
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "sign-in", element: <SignIn /> },
            { path: "sign-up", element: <SignUp /> },
        ],
    },
]);

export default router;
