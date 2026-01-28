/** Returns a random 16-digit number as a string (for use as unique id). */
export const getRandomUUID = (): string => {
    let s = "";
    for (let i = 0; i < 16; i++) {
        s += Math.floor(Math.random() * 10);
    }
    return s;
};

export const formatNumber = (number: number) => number.toLocaleString();

export function formatDate(dateStr: string): string {
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
        return dateStr;
    }
}

function getRandomColor(): string {
    const h = Math.floor(Math.random() * 360);
    const s = 50 + Math.floor(Math.random() * 31);
    const l = 40 + Math.floor(Math.random() * 16);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export const getPlatformStyle = (name: string) => {
    const lower = name.toLowerCase();
    switch (lower) {
        case "twitter":
            return { color: "#1DA1F2", icon: "𝕏" };
        case "instagram":
            return { color: "#E1306C", icon: "📷" };
        case "youtube":
            return { color: "#FF0000", icon: "▶" };
        case "tiktok":
            return { color: "#000", icon: "♪" };
        default:
            return { color: getRandomColor(), icon: "🌐" };
    }
};

export const getEngagementColor = (engagement: number) => {
    if (engagement >= 50) return "success";
    if (engagement >= 15) return "warning";
    return "error";
};
