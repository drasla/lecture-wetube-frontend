import api from "./axios.ts";

export interface Video {
    id: number;
    createdAt: string;

    title: string;
    description: string;
    videoPath: string;
    thumbnailPath: string;
    views: number;
    likeCount: number;
    isLiked?: boolean;
    author: {
        id: number;
        nickname: string;
        profileImage: string;
    };
}

// 전체 목록 조회
export const fetchVideos = async () => {
    const response = await api.get<Video[]>("/videos");
    return response.data;
};

// 상세 조회
export const fetchVideoDetail = async (id: number) => {
    const response = await api.get<Video>(`/videos/${id}`);
    return response.data;
};

// ✨ 좋아요 토글 API
export const toggleVideoLike = async (videoId: number) => {
    // 결과로 { isLiked: true/false } 가 옴
    const response = await api.post<{ isLiked: boolean }>(`/videos/${videoId}/like`);
    return response.data;
};
