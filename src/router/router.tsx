import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout.tsx";
import SignUp from "../pages/SignUp.tsx";
import SignIn from "../pages/SignIn.tsx";
import Upload from "../pages/Upload.tsx";
import ProfileEdit from "../pages/ProfileEdit.tsx";

const Home = () => <div className="text-2xl font-bold">홈 화면</div>;
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "sign-in", element: <SignIn /> },
            { path: "sign-up", element: <SignUp /> },
            { path: "upload", element: <Upload /> },
            { path: "profile/edit", element: <ProfileEdit /> },
        ],
    },
]);

export default router;
