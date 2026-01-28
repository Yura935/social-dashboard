import AccountCard from "../../components/AccountCard";
import AccountModal from "../../components/AccountModal";
import { useState, useMemo } from "react";
import { Box, Button, Typography, Paper, TextField, InputAdornment, Stack } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import type { SocialAccount } from "../../types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { loadAccounts } from "../../store/socialSlice";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import CardSkeleton from "../../components/CardSkeleton";
import OverviewStatsSkeleton from "../../components/OverviewStatsSkeleton";
import { formatNumber } from "../../utils";
import { SKELETON_CARD_COUNT } from "../../constants";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { list: accounts, loading, error } = useAppSelector(s => s.accounts);

    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState<SocialAccount>();
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const filteredAccounts = useMemo(() => {
        if (!searchQuery.trim()) return accounts;
        const q = searchQuery.trim().toLowerCase();
        return accounts.filter((a) => a.name.toLowerCase().includes(q));
    }, [accounts, searchQuery]);

    const totalFollowersFiltered = filteredAccounts.reduce((sum, a) => sum + a.followers, 0);

    const handleOpenAdd = () => {
        setAccountToEdit(undefined);
        setOpen(true);
    };

    const handleOpenEdit = (acc: SocialAccount) => {
        setAccountToEdit(acc);
        setOpen(true);
    };

    const handleDeleteClick = (id: string) => setDeleteConfirmId(id);

    const handleDeleted = () => setDeleteConfirmId(null);

    return (
        <>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="contained" onClick={handleOpenAdd} disabled={loading}>
                    Add Account
                </Button>
            </div>

            {error && (
                <Paper
                    role="alert"
                    elevation={0}
                    sx={{ py: 2, px: 2, mb: 2, bgcolor: "error.light", color: "error.contrastText", borderRadius: 2, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}
                >
                    <Typography sx={{ flex: 1, minWidth: 200 }}>{error}</Typography>
                    <Button variant="contained" color="inherit" onClick={() => dispatch(loadAccounts())} sx={{ color: "error.dark" }}>
                        Retry
                    </Button>
                </Paper>
            )}

            {!loading && !error && accounts.length > 0 && (
                <Paper
                    data-testid="dashboard-overview-stats"
                    elevation={0}
                    sx={{
                        mb: 3,
                        p: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack direction="row" gap={2} flexWrap="wrap" sx={{ minWidth: 0, flexShrink: 0 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>{filteredAccounts.length}</strong> account{filteredAccounts.length !== 1 ? "s" : ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>{formatNumber(totalFollowersFiltered)}</strong> total followers
                        </Typography>
                    </Stack>
                    <Box sx={{ minWidth: 0, width: { xs: "100%", sm: "300px" } }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search accounts…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            aria-label="Search accounts by name"
                        />
                    </Box>
                </Paper>
            )}

            {loading && <OverviewStatsSkeleton />}

            {loading ? (
                <div className="row g-3 g-md-4">
                    {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                            <CardSkeleton />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row g-3 g-md-4">
                    {accounts.length === 0 ? (
                        <Box textAlign="center" py={5} width="100%">
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                No accounts yet.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Add one to get started.
                            </Typography>
                            <Button variant="contained" onClick={handleOpenAdd}>
                                Add Account
                            </Button>
                        </Box>
                    ) : filteredAccounts.length === 0 ? (
                        <Box textAlign="center" py={5} width="100%">
                            <Typography variant="body2" color="text.secondary">
                                No accounts match &quot;{searchQuery}&quot;.
                            </Typography>
                        </Box>
                    ) : (
                        filteredAccounts.map((acc) => (
                            <div key={acc.id} className="col-12 col-md-6 col-lg-4 d-flex">
                                <AccountCard account={acc} onEdit={() => handleOpenEdit(acc)} onDelete={handleDeleteClick} />
                            </div>
                        ))
                    )}
                </div>
            )}

            <AccountModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setAccountToEdit(undefined);
                }}
                accountToEdit={accountToEdit}
            />

            <DeleteConfirmationModal open={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)} deleteConfirmId={deleteConfirmId} onDeleted={handleDeleted} />
        </>
    );
}
