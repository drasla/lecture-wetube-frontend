import { useModalStore } from "../../store/ModalStore.ts";
import Backdrop from "./Backdrop.tsx";
import { MdClose } from "react-icons/md";

export default function GlobalModal() {
    const { isOpen, type, props, closeModal } = useModalStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 1. 백드롭 (클릭 시 닫힘) */}
            <Backdrop onClose={closeModal} className="bg-black/60 backdrop-blur-sm" />

            {/* 2. 모달 컨텐츠 (실제 팝업창) */}
            <div className="relative z-10 animate-fade-in-up">
                {/* 닫기 버튼 (공통) */}
                <button
                    onClick={closeModal}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors">
                    <MdClose size={32} />
                </button>

                {/* 타입에 따른 컨텐츠 렌더링 */}
                {type === "LOGIN_REQUIRED" && <LoginRequiredModal onClose={closeModal} />}
                {/* {type === 'VIDEO_DETAIL' && <VideoDetailModal videoId={props.videoId} />} */}
            </div>
        </div>
    );
}

const LoginRequiredModal = ({ onClose }: { onClose: VoidFunction }) => (
    <div className="bg-background-paper p-6 rounded-lg shadow-xl w-80 text-center border border-divider">
        <h2 className="text-xl font-bold mb-2 text-text-default">로그인 필요</h2>
        <p className="text-text-disabled mb-4">이 기능을 사용하려면 로그인이 필요합니다.</p>
        <div className="flex justify-center gap-2">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-text-default/10 rounded hover:bg-text-default/20 text-text-default">
                닫기
            </button>
            <a
                href="/sign-in"
                className="px-4 py-2 bg-primary-main text-white rounded hover:opacity-90">
                로그인하기
            </a>
        </div>
    </div>
);