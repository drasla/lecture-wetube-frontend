import Header from "./Header.tsx";
import { Outlet } from "react-router";
import { useThemeStore } from "../../store/themeStore.ts";
import { useEffect } from "react";

function Layout() {
    const theme = useThemeStore((state) => state.theme);

    // ✨ 테마 변경 감지 및 HTML 클래스 적용
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

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
