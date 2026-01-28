import type { SocialAccount } from "../types";

const data: SocialAccount[] = [
    {
        id: "1",
        name: "Twitter",
        followers: 12000,
        engagement: 4.5,
        posts: [
            { title: "New product launch thread", description: "We're excited to announce the launch of our new product. This is a great opportunity to showcase our latest features and benefits.", createdAt: "2024-01-01", views: 500 },
            { title: "Weekly tips #5", description: "We're excited to announce the launch of our new product. This is a great opportunity to showcase our latest features and benefits.", createdAt: "2024-01-01", views: 1000 },
            { title: "AMA recap", description: "We're excited to announce the launch of our new product. This is a great opportunity to showcase our latest features and benefits.", createdAt: "2024-01-01", views: 69},
        ],
    },
    {
        id: "2",
        name: "Instagram",
        followers: 45000,
        engagement: 22,
        posts: [
            { title: "Sunset at the beach", description: "We're excited to announce the launch of our new product. This is a great opportunity to showcase our latest features and benefits.", createdAt: "2024-01-01", views: 233 },
            { title: "Behind the scenes", description: "We're excited to announce the launch of our new product. This is a great opportunity to showcase our latest features and benefits.", createdAt: "2024-01-01", views: 231 },
            { title: "Collaboration announcement", description: "We're excited to announce the launch of our new product. This is a great opportunity to showcase our latest features and benefits.", createdAt: "2024-01-01", views: 111 },
        ],
    },
];

/** Returns a deep copy so the store never mutates the mock data; reload resets to initial data. */
export const fetchAccounts = async (): Promise<SocialAccount[]> => {
    return new Promise((resolve) =>
        setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), 800)
    );
};
