import { Link } from "react-router";
import {
    MdDarkMode,
    MdLightMode,
    MdMenu,
    MdNotifications,
    MdSearch,
    MdVideoCall,
} from "react-icons/md";
import { FaRegUserCircle, FaYoutube } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore.ts";
import { useThemeStore } from "../../store/themeStore.ts";

function Header() {
    const user = useAuthStore((state) => state.user);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const logout = useAuthStore((state) => state.logout);

    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-background-paper border-b border-divider flex items-center justify-between px-4 z-50 transition-colors duration-200">
            {/* 1. 왼쪽: 메뉴 및 로고 */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-text-default/10 rounded-full transition-colors text-text-default">
                    <MdMenu className="w-6 h-6" />
                </button>
                <Link to="/" className="flex items-center gap-1">
                    {/* Primary Color (Youtube Red) 적용 */}
                    <FaYoutube className="w-8 h-8 text-primary-main" />
                    <span className="text-xl font-bold tracking-tighter text-text-default font-sans relative bottom-[1px]">
                        WeTube
                    </span>
                </Link>
            </div>

            {/* 2. 중앙: 검색창 */}
            <div className="hidden sm:flex flex-1 max-w-[600px] items-center mx-4">
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="검색"
                        className="w-full bg-background-default border border-divider rounded-l-full px-4 py-2 text-text-default placeholder:text-text-disabled focus:outline-none focus:border-secondary-main ml-8 shadow-inner"
                    />
                    <button className="bg-background-paper border border-l-0 border-divider rounded-r-full px-5 py-2 hover:bg-text-default/5 transition-colors">
                        <MdSearch className="w-6 h-6 text-text-default" />
                    </button>
                </div>
            </div>

            {/* 3. 오른쪽: 로그인 버튼 */}
            {/* 3. 오른쪽: 로그인 상태에 따라 분기 처리 */}
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-text-default/10 rounded-full text-text-default transition-colors"
                    title={theme === 'dark' ? "라이트 모드로 변경" : "다크 모드로 변경"}
                >
                    {theme === 'dark' ? (
                        <MdLightMode className="w-6 h-6" />
                    ) : (
                        <MdDarkMode className="w-6 h-6" />
                    )}
                </button>
                {isLoggedIn && user ? (
                    /* ✨ 로그인 했을 때 보여줄 UI */
                    <>
                        <Link
                            to="/upload"
                            className="p-2 hover:bg-text-default/10 rounded-full text-text-default inline-flex items-center justify-center"
                            title="만들기"
                        >
                            <MdVideoCall className="w-7 h-7" />
                        </Link>
                        <button className="p-2 hover:bg-text-default/10 rounded-full text-text-default" title="알림">
                            <MdNotifications className="w-6 h-6" />
                        </button>

                        {/* 프로필 아바타 (클릭 시 로그아웃 임시 구현) */}
                        <button
                            onClick={logout}
                            className="ml-2 w-8 h-8 rounded-full bg-primary-main text-white flex items-center justify-center text-sm font-bold hover:opacity-90 overflow-hidden"
                            title="로그아웃"
                        >
                            {user.profileImage ? (
                                <img src={`http://127.0.0.1:4000${user.profileImage}`} alt="profile" className="w-full h-full object-cover" />
                            ) : (
                                user.nickname[0].toUpperCase()
                            )}
                        </button>
                    </>
                ) : (
                    /* ☁️ 로그인 안 했을 때 (기존) */
                    <Link
                        to="/sign-in" // 경로 수정 반영
                        className="flex items-center gap-2 p-2 px-4 border border-divider rounded-full text-secondary-main font-medium hover:bg-secondary-main/10 transition-colors"
                    >
                        <FaRegUserCircle className="w-5 h-5" />
                        <span className="text-sm">로그인</span>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
