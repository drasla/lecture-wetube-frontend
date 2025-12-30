import { useEffect, useState, FormEvent } from "react";
import { fetchComments, createComment, deleteComment, type Comment } from "../../api/comment";
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/ModalStore.ts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface CommentListProps {
    videoId: number;
}

export default function CommentList({ videoId }: CommentListProps) {
    const { user, isLoggedIn } = useAuthStore();
    const { openModal } = useModalStore();

    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    // 댓글 불러오기
    useEffect(() => {
        loadComments();
    }, [videoId]);

    const loadComments = async () => {
        try {
            const data = await fetchComments(videoId);
            setComments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 댓글 등록
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) return openModal("LOGIN_REQUIRED");
        if (!content.trim()) return;

        try {
            const newComment = await createComment(videoId, content);
            setComments([newComment, ...comments]); // 최신 댓글을 맨 앞에 추가
            setContent(""); // 입력창 초기화
        } catch (error) {
            alert("댓글 등록에 실패했습니다.");
        }
    };

    // 댓글 삭제
    const handleDelete = async (commentId: number) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
        try {
            await deleteComment(commentId);
            setComments(comments.filter(c => c.id !== commentId));
        } catch (error) {
            alert("삭제 실패");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold text-text-default mb-4">댓글 {comments.length}개</h3>

            {/* 댓글 입력 폼 */}
            <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-background-paper border border-divider overflow-hidden flex-shrink-0">
                    {user ? (
                        <img
                            src={user.profileImage || ""}
                            alt="me"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-secondary-main/10" />
                    )}
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="댓글 추가..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        onFocus={() => {
                            if (!isLoggedIn) openModal("LOGIN_REQUIRED");
                        }}
                        className="w-full bg-transparent border-b border-divider pb-1 text-text-default focus:border-text-default focus:outline-none transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            disabled={!content.trim()}
                            className="px-4 py-2 bg-text-default text-background-default rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90">
                            댓글 달기
                        </button>
                    </div>
                </div>
            </form>

            {/* 댓글 리스트 */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-background-paper border border-divider overflow-hidden flex-shrink-0">
                            <img
                                src={comment.author.profileImage || ""}
                                alt={comment.author.nickname}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-text-default">
                                    {comment.author.nickname}
                                </span>
                                <span className="text-xs text-text-disabled">
                                    {dayjs(comment.createdAt).fromNow()}
                                </span>
                            </div>
                            <p className="text-sm text-text-default whitespace-pre-wrap">
                                {comment.content}
                            </p>
                        </div>
                        {/* 삭제 버튼 (작성자 본인일 때만) */}
                        {user?.id === comment.author.id && (
                            <button
                                onClick={() => handleDelete(comment.id)}
                                className="text-xs text-text-disabled hover:text-error-main opacity-0 group-hover:opacity-100 transition-opacity">
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
