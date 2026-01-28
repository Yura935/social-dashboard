import { Box, Typography } from "@mui/material";

type Props = {
    label: string;
    value: string;
    icon: string;
};

export default function MetricItem({ label, value, icon }: Props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                {label}
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1, textAlign: "right" }}>
                {icon} {value}
            </Typography>
        </Box>
    );
}
