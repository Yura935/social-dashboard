import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Avatar,
    LinearProgress,
    Tooltip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { SocialAccount } from "../../types";
import { formatNumber, getEngagementColor, getPlatformStyle } from "../../utils";
import MetricItem from "../MetricItem";
import PostItem from "../PostItem";

type Props = {
    account: SocialAccount;
    onEdit: () => void;
    onDelete: (id: string) => void;
};

export default function AccountCard({ account, onEdit, onDelete }: Props) {
    const { color, icon } = getPlatformStyle(account.name);
    const engagementColor = getEngagementColor(account.engagement);

    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,
                maxWidth: "100%",
                borderRadius: 3,
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                borderTop: "4px solid",
                borderTopColor: color,
                bgcolor: "background.paper",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
                },
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
                    <Avatar
                        sx={{
                            bgcolor: color,
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 },
                            fontSize: { xs: 20, md: 24 },
                            fontWeight: "bold",
                            mr: 1.5,
                        }}
                    >
                        {icon}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="h6" component="div" noWrap fontWeight={600}>
                            {account.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Social Account
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <MetricItem
                        label="Followers"
                        value={formatNumber(account.followers)}
                        icon="👥"
                    />
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                            Engagement
                        </Typography>
                        <Typography variant="body2" fontWeight={700} color={`${engagementColor}.main`}>
                            {account.engagement.toFixed(1)}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={Math.min(account.engagement, 100)}
                        color={engagementColor}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "grey.200",
                            "& .MuiLinearProgress-bar": { borderRadius: 4 },
                        }}
                    />
                </Box>

                <Box sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 1, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}
                    >
                        Recent posts
                    </Typography>
                    {account.posts?.length > 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                                maxHeight: { xs: 220, sm: 260 },
                                overflowY: "auto",
                                pr: 0.5,
                                "&::-webkit-scrollbar": { width: 6 },
                                "&::-webkit-scrollbar-thumb": { borderRadius: 3, bgcolor: "grey.400" },
                            }}
                        >
                            {account.posts.slice(0, 5).map((post, i) => (
                                <PostItem key={i} post={post} accountId={account.id} postIndex={i} />
                            ))}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                py: 3,
                                px: 2,
                                textAlign: "center",
                                bgcolor: "grey.50",
                                borderRadius: 2,
                                border: "1px dashed",
                                borderColor: "grey.300",
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                No posts yet
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
                                Edit account to add posts
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider", display: "flex", gap: 1, flexShrink: 0 }}>
                    <Tooltip title="Edit account">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={onEdit}
                            sx={{ border: 1, borderColor: "divider" }}
                            aria-label="Edit account"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete account">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(account.id)}
                            sx={{ border: 1, borderColor: "error.light" }}
                            aria-label="Delete account"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    );
}
