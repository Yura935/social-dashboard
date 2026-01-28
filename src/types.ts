export type Post = {
    title: string;
    description: string;
    createdAt: string;
    views: number;
};

export type SocialAccount = {
    id: string;
    name: string;
    followers: number;
    engagement: number;
    posts: Post[];
};