import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetchInquiries, type Inquiry } from "../../api/inquiry";
import Button from "../../components/ui/Button";
import dayjs from "dayjs";

export default function InquiryList() {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await fetchInquiries(1, 10);
            setInquiries(data.inquiries);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-text-default">1:1 문의</h1>
                <Button onClick={() => navigate("/inquiries/new")}>문의하기</Button>
            </div>

            <div className="bg-background-paper border border-divider rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-background-default border-b border-divider text-sm font-medium text-text-disabled">
                    <div className="col-span-1 text-center">상태</div>
                    <div className="col-span-8">제목</div>
                    <div className="col-span-3 text-center">날짜</div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-text-disabled">로딩 중...</div>
                ) : inquiries.length === 0 ? (
                    <div className="p-8 text-center text-text-disabled">문의 내역이 없습니다.</div>
                ) : (
                    inquiries.map(inquiry => (
                        <div
                            key={inquiry.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-divider last:border-none hover:bg-background-default/50 transition-colors items-center">
                            <div className="col-span-1 text-center">
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${inquiry.isAnswered ? "bg-success-main/10 text-success-main" : "bg-text-disabled/10 text-text-disabled"}`}>
                                    {inquiry.isAnswered ? "답변완료" : "대기중"}
                                </span>
                            </div>
                            <div className="col-span-8">
                                <Link
                                    to={`/inquiries/${inquiry.id}`}
                                    className="text-text-default hover:text-primary-main font-medium transition-colors line-clamp-1">
                                    {inquiry.title}
                                </Link>
                            </div>
                            <div className="col-span-3 text-center text-text-disabled text-sm">
                                {dayjs(inquiry.createdAt).format("YYYY.MM.DD")}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
