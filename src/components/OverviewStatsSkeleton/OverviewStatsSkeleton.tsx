import { Paper, Skeleton, Box } from "@mui/material";

/** Skeleton for the overview stats block (accounts count + total followers) */
export default function OverviewStatsSkeleton() {
    return (
        <Paper
            elevation={0}
            sx={{
                mb: 3,
                p: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                alignItems: "center",
                bgcolor: "background.paper",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="text" width={24} height={24} />
                <Skeleton variant="text" width={80} height={20} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="text" width={48} height={24} />
                <Skeleton variant="text" width={100} height={20} />
            </Box>
        </Paper>
    );
}
