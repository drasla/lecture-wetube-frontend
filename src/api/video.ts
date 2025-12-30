import api from "./axios.ts";

export interface Video {
    id: number;
    title: string;
    description: string;
    videoPath: string;
    thumbnailPath: string;
    views: number;
    createdAt: string;
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
