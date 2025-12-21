import Header from "./Header.tsx";
import { Outlet } from "react-router";

function Layout() {
    return (
        <div className="min-h-screen pt-14">
            <Header />
            <main className="p-4">
                <Outlet /> {/* 실제 페이지 내용이 들어가는 곳 */}
            </main>
        </div>
    );
}

export default Layout;
