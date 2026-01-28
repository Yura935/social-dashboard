import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Divider,
    Paper,
    Stack,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { addAccount, updateAccount } from "../../store/socialSlice";
import { Formik, type FormikErrors } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/hooks";
import type { Post, SocialAccount } from "../../types";
import { getRandomUUID } from "../../utils";

const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    followers: Yup.number()
        .min(1, "Must be at least 1")
        .required("Followers is required"),
    engagement: Yup.number()
        .min(0.1, "Must be at least 0.1")
        .max(100, "Must be less than 100")
        .required("Engagement is required"),
    posts: Yup.array().of(
        Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            createdAt: Yup.string(),
            views: Yup.number().min(0, "Must be 0 or more"),
        })
    ),
});

type FormValues = {
    name: string;
    followers: number;
    engagement: number;
    posts: Post[];
};

const emptyPost: Post = {
    title: "",
    description: "",
    createdAt: new Date().toISOString().slice(0, 10),
    views: 0,
};

interface Props {
    open: boolean;
    onClose: () => void;
    accountToEdit?: SocialAccount;
}

export default function AccountModal({ open, onClose, accountToEdit }: Props) {
    const dispatch = useAppDispatch();
    const isEdit = !!accountToEdit;

    const initialValues: FormValues = accountToEdit
        ? {
            name: accountToEdit.name,
            followers: accountToEdit.followers,
            engagement: accountToEdit.engagement,
            posts: accountToEdit.posts?.length ? [...accountToEdit.posts] : [],
        }
        : { name: "", followers: 0, engagement: 0, posts: [] };

    const onSubmit = (values: FormValues) => {
        const posts: Post[] = values.posts
            .filter((p) => p.title.trim() || p.description.trim())
            .map((p) => ({
                title: p.title.trim(),
                description: p.description.trim(),
                createdAt: p.createdAt || new Date().toISOString().slice(0, 10),
                views: Math.max(0, Number(p.views) || 0),
            }));
        const payload: SocialAccount = {
            id: accountToEdit?.id ?? getRandomUUID(),
            name: values.name,
            followers: values.followers,
            engagement: values.engagement,
            posts,
        };
        if (isEdit) {
            dispatch(updateAccount(payload));
        } else {
            dispatch(addAccount(payload));
        }
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: 520,
                    maxHeight: "90vh",
                    m: 2,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="account-modal-title"
            >
                <Box sx={{ p: 2, pb: 0, flexShrink: 0 }}>
                    <Typography id="account-modal-title" variant="h5" gutterBottom>
                        {isEdit ? "Edit Account" : "Add Account"}
                    </Typography>
                </Box>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={schema}
                    onSubmit={onSubmit}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue, submitCount, isSubmitting }) => {
                        const showError = (field: keyof FormValues) => (touched[field] || submitCount > 0) && !!errors[field];
                        const postErrors = (errors.posts ?? []) as FormikErrors<Post>[] | undefined;

                        const handleAddPost = () => {
                            setFieldValue("posts", [...values.posts, { ...emptyPost, createdAt: new Date().toISOString().slice(0, 10) }]);
                        };

                        const handleRemovePost = (index: number) => {
                            setFieldValue(
                                "posts",
                                values.posts.filter((_, i) => i !== index)
                            );
                        };

                        return (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
                                <Box sx={{ px: 2, overflowY: "auto", flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        error={showError("name")}
                                        helperText={showError("name") ? errors.name : undefined}
                                        margin="normal"
                                        size="small"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Followers"
                                        name="followers"
                                        type="number"
                                        value={values.followers}
                                        onChange={handleChange}
                                        error={showError("followers")}
                                        helperText={showError("followers") ? errors.followers : undefined}
                                        margin="normal"
                                        size="small"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Engagement (%)"
                                        name="engagement"
                                        type="number"
                                        value={values.engagement}
                                        onChange={handleChange}
                                        error={showError("engagement")}
                                        helperText={showError("engagement") ? errors.engagement : undefined}
                                        margin="normal"
                                        size="small"
                                        slotProps={{
                                            htmlInput: { min: 0, max: 100, step: 0.1 },
                                            input: {
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            },
                                        }}
                                    />

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Posts
                                        </Typography>
                                        <Button
                                            type="button"
                                            size="small"
                                            startIcon={<AddIcon />}
                                            onClick={handleAddPost}
                                            variant="outlined"
                                        >
                                            Add post
                                        </Button>
                                    </Box>

                                    {values.posts.length === 0 ? (
                                        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                                            No posts yet. Click &quot;Add post&quot; to add one.
                                        </Typography>
                                    ) : (
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
                                            {values.posts.map((post, index) => (
                                                <Paper
                                                    key={index}
                                                    variant="outlined"
                                                    sx={{ p: 1.5, bgcolor: "grey.50" }}
                                                >
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                                        <Typography variant="subtitle2">Post {index + 1}</Typography>
                                                        <IconButton
                                                            type="button"
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleRemovePost(index)}
                                                            aria-label={`Remove post ${index + 1}`}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                    <Stack gap={2}>
                                                        <TextField
                                                            fullWidth
                                                            label="Title"
                                                            name={`posts.${index}.title`}
                                                            value={post.title}
                                                            onChange={handleChange}
                                                            error={submitCount > 0 && !!(postErrors?.[index]?.title)}
                                                            helperText={submitCount > 0 ? postErrors?.[index]?.title : undefined}
                                                            margin="dense"
                                                            size="small"
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            label="Description"
                                                            name={`posts.${index}.description`}
                                                            value={post.description}
                                                            onChange={handleChange}
                                                            error={submitCount > 0 && !!(postErrors?.[index]?.description)}
                                                            helperText={submitCount > 0 ? postErrors?.[index]?.description : undefined}
                                                            margin="dense"
                                                            size="small"
                                                            multiline
                                                            minRows={2}
                                                        />
                                                    </Stack>
                                                </Paper>
                                            ))}
                                        </Box>
                                    )}
                                </Box>

                                <Box sx={{ p: 2, flexShrink: 0, borderTop: 1, borderColor: "divider" }}>
                                    <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                                        {isSubmitting ? "Saving…" : isEdit ? "Update" : "Save"}
                                    </Button>
                                </Box>
                            </form>
                        );
                    }}
                </Formik>
            </Box>
        </Modal>
    );
}
