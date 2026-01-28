import { Card, CardContent, Skeleton, Box } from "@mui/material";

export default function CardSkeleton() {
    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,
                maxWidth: "100%",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <CardContent
                sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1.5 }} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="55%" height={24} />
                        <Skeleton variant="text" width="35%" height={16} sx={{ mt: 0.25 }} />
                    </Box>
                </Box>

                <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Skeleton variant="text" width={70} height={20} />
                    <Skeleton variant="text" width={60} height={24} />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Skeleton variant="text" width={80} height={18} />
                        <Skeleton variant="text" width={36} height={18} />
                    </Box>
                    <Skeleton variant="rounded" width="100%" height={8} sx={{ borderRadius: 4 }} />
                </Box>

                <Skeleton variant="text" width={100} height={18} sx={{ mb: 1 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flexGrow: 1 }}>
                    {[1, 2, 3].map((i) => (
                        <Box key={i} sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50" }}>
                            <Skeleton variant="text" width="85%" height={20} sx={{ mb: 0.5 }} />
                            <Skeleton variant="text" width="100%" height={16} />
                            <Skeleton variant="text" width="60%" height={16} sx={{ mt: 0.25 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Skeleton variant="rounded" width={72} height={22} sx={{ borderRadius: 2 }} />
                                <Skeleton variant="text" width={56} height={16} />
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider", display: "flex", gap: 1 }}>
                    <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 1 }} />
                </Box>
            </CardContent>
        </Card>
    );
}
