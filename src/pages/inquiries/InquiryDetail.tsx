import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchInquiryDetail, answerInquiry, type Inquiry } from "../../api/inquiry";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/ui/Button";
import dayjs from "dayjs";

export default function InquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);

    const [inquiry, setInquiry] = useState<Inquiry | null>(null);
    const [answerText, setAnswerText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id) loadData(Number(id));
    }, [id]);

    const loadData = async (inquiryId: number) => {
        try {
            const data = await fetchInquiryDetail(inquiryId);
            setInquiry(data);
        } catch (error) {
            alert("불러오기 실패");
            navigate("/inquiries");
        }
    };

    const handleAnswerSubmit = async () => {
        if (!id || !answerText.trim()) return;
        setIsSubmitting(true);
        try {
            await answerInquiry(Number(id), answerText);
            alert("답변이 등록되었습니다.");
            window.location.reload();
        } catch (error) {
            alert("답변 등록 실패");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!inquiry) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* 질문 영역 */}
            <div className="bg-background-paper border border-divider rounded-lg p-8 mb-6 shadow-sm">
                <div className="border-b border-divider pb-4 mb-4">
                    <div className="flex gap-2 mb-2">
                        <span
                            className={`text-xs px-2 py-1 rounded-full ${inquiry.isAnswered ? "bg-success-main/10 text-success-main" : "bg-text-disabled/10 text-text-disabled"}`}>
                            {inquiry.isAnswered ? "답변완료" : "대기중"}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-text-default mb-2">{inquiry.title}</h1>
                    <div className="text-sm text-text-disabled">
                        작성자: {inquiry.author.nickname} |{" "}
                        {dayjs(inquiry.createdAt).format("YYYY.MM.DD HH:mm")}
                    </div>
                </div>
                <div className="whitespace-pre-wrap text-text-default min-h-[100px]">
                    {inquiry.content}
                </div>
            </div>

            {/* 답변 영역 */}
            <div className="bg-background-default border border-divider rounded-lg p-8 shadow-inner">
                <h3 className="text-lg font-bold text-text-default mb-4">
                    {inquiry.isAnswered ? "관리자 답변" : "답변 대기중"}
                </h3>

                {inquiry.isAnswered ? (
                    // 1. 답변이 달렸을 때
                    <div className="whitespace-pre-wrap text-text-default">
                        {inquiry.answer}
                        <div className="mt-4 text-xs text-text-disabled text-right">
                            답변일: {dayjs(inquiry.answeredAt).format("YYYY.MM.DD HH:mm")}
                        </div>
                    </div>
                ) : // 2. 답변이 없을 때
                user?.role === "ADMIN" ? (
                    // 관리자는 입력창 노출
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-40 p-3 rounded-md border border-divider bg-background-paper text-text-default focus:border-secondary-main outline-none resize-none"
                            placeholder="답변 내용을 입력하세요."
                            value={answerText}
                            onChange={e => setAnswerText(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleAnswerSubmit} disabled={isSubmitting}>
                                답변 등록
                            </Button>
                        </div>
                    </div>
                ) : (
                    // 유저는 안내 문구 노출
                    <p className="text-text-disabled">아직 답변이 등록되지 않았습니다.</p>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <Button variant="secondary" onClick={() => navigate("/inquiries")}>
                    목록으로
                </Button>
            </div>
        </div>
    );
}
