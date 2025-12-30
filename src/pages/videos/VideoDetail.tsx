import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchVideoDetail, type Video } from "../../api/video.ts";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function VideoDetail() {
    const { id } = useParams();
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        if (id) {
            fetchVideoDetail(Number(id)).then(setVideo).catch(console.error);
        }
    }, [id]);

    if (!video) return <div className="pt-20 text-center">로딩 중...</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-[1600px] mx-auto min-h-screen">
            {/* 왼쪽: 메인 영상 영역 */}
            <div className="flex-1">
                {/* 1. 비디오 플레이어 */}
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                    <video src={video.videoPath} controls autoPlay className="w-full h-full" />
                </div>

                {/* 2. 영상 정보 */}
                <div className="mt-4 pb-4 border-b border-divider">
                    <h1 className="text-xl font-bold text-text-default mb-2">{video.title}</h1>
                    <div className="flex items-center justify-between">
                        {/* 작성자 정보 */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={
                                        video.author.profileImage.startsWith("http")
                                            ? video.author.profileImage
                                            : `http://127.0.0.1:4000${video.author.profileImage}`
                                    }
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-text-default text-sm">
                                    {video.author.nickname}
                                </p>
                                <p className="text-xs text-text-disabled">구독자 0명</p>
                            </div>
                            <button className="ml-4 px-4 py-2 bg-text-default text-background-default rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                                구독
                            </button>
                        </div>

                        {/* 좋아요/공유 버튼 (UI만) */}
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-full bg-background-default border border-divider hover:bg-background-paper text-sm font-medium transition-colors">
                                👍 좋아요
                            </button>
                            <button className="px-4 py-2 rounded-full bg-background-default border border-divider hover:bg-background-paper text-sm font-medium transition-colors">
                                공유
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. 설명란 */}
                <div className="mt-4 p-3 bg-background-paper rounded-xl text-sm">
                    <div className="font-semibold text-text-default mb-2">
                        조회수 {video.views}회 • {dayjs(video.createdAt).format("YYYY. MM. DD.")}
                    </div>
                    <p className="text-text-default whitespace-pre-wrap leading-relaxed">
                        {video.description}
                    </p>
                </div>
            </div>

            {/* 오른쪽: 추천 영상 목록 (일단 빈 공간) */}
            <div className="lg:w-[350px] hidden lg:block">
                <p className="text-text-default font-bold mb-4">다음 동영상</p>
                <div className="space-y-3">
                    {/* 여기에 VideoCard(가로형) 컴포넌트를 나중에 추가하면 됩니다 */}
                    <div className="h-24 bg-background-paper rounded-lg border border-divider flex items-center justify-center text-text-disabled text-sm">
                        추천 영상 영역
                    </div>
                    <div className="h-24 bg-background-paper rounded-lg border border-divider flex items-center justify-center text-text-disabled text-sm">
                        추천 영상 영역
                    </div>
                </div>
            </div>
        </div>
    );
}
