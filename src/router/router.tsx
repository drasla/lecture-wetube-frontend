import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout.tsx";
import SignUp from "../pages/SignUp.tsx";
import SignIn from "../pages/SignIn.tsx";
import Upload from "../pages/Upload.tsx";
import ProfileEdit from "../pages/ProfileEdit.tsx";
import NoticeList from "../pages/notice/NoticeList.tsx";
import NoticeDetail from "../pages/notice/NoticeDetail.tsx";
import NoticeCreate from "../pages/notice/NoticeCreate.tsx";
import NoticeEdit from "../pages/notice/NoticeEdit.tsx";
import InquiryList from "../pages/inquiry/InquiryList.tsx";
import InquiryCreate from "../pages/inquiry/InpuiryCreate.tsx";
import InquiryDetail from "../pages/inquiry/InquiryDetail.tsx";

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
            { path: "notices", element: <NoticeList /> },
            { path: "notices/create", element: <NoticeCreate /> },
            { path: "notices/:id", element: <NoticeDetail /> },
            { path: "notices/:id/edit", element: <NoticeEdit /> },
            { path: "inquiries", element: <InquiryList /> },
            { path: "inquiries/new", element: <InquiryCreate /> },
            { path: "inquiries/:id", element: <InquiryDetail /> },
        ],
    },
]);

export default router;
