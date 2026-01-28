import { useRef, useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Visibility as ViewsIcon } from "@mui/icons-material";
import type { Post } from "../../types";
import { formatNumber, formatDate } from "../../utils";
import { useAppDispatch } from "../../store/hooks";
import { incrementPostViews } from "../../store/socialSlice";

type Props = {
    post: Post;
    accountId: string;
    postIndex: number;
};

/** Renders a single post; counts a view when the post enters the viewport (once per mount) */
export default function PostItem({ post, accountId, postIndex }: Props) {
    const dispatch = useAppDispatch();
    const rootRef = useRef<HTMLDivElement>(null);
    const hasCountedRef = useRef(false);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry.isIntersecting || hasCountedRef.current) return;
                hasCountedRef.current = true;
                dispatch(incrementPostViews({ accountId, postIndex }));
            },
            { threshold: 0.5, rootMargin: "0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [dispatch, accountId, postIndex]);

    return (
        <Box
            ref={rootRef}
            sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "grey.200",
            }}
        >
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }} noWrap>
                {post.title}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.4,
                }}
            >
                {post.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1, flexWrap: "wrap", gap: 0.5 }}>
                <Chip
                    size="small"
                    label={formatDate(post.createdAt)}
                    sx={{ fontSize: "0.7rem", height: 22 }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }} aria-label={`${formatNumber(post.views)} views`}>
                    <ViewsIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                        {formatNumber(post.views)} views
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
