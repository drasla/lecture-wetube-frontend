import { useEffect, useState } from "react";
import { fetchVideos, type Video } from "../api/video";
import VideoCard from "../components/video/VideoCard";
import { twMerge } from "tailwind-merge";

export default function Home() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const data = await fetchVideos();
                setVideos(data);
            } catch (error) {
                console.error("Failed to load videos", error);
            } finally {
                setLoading(false);
            }
        };
        loadVideos();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-text-disabled">로딩 중...</div>;
    }

    if (videos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-text-disabled">
                <p className="text-lg">등록된 영상이 없습니다.</p>
                <p className="text-sm">첫 번째 영상을 업로드해보세요!</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6">
            {/* 반응형 flexbox: 모바일 1열, 태블릿 2~3열, 데스크탑 4열 */}
            <div className={twMerge(["flex", "flex-wrap"])}>
                {videos.map(video => (
                    <div
                        key={video.id}
                        className={twMerge([
                            "w-full",
                            "sm:w-1/2",
                            "lg:w-1/3",
                            "xl:w-1/4",
                            "px-2",
                            "mb-8",
                        ])}>
                        <VideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
    );
}
