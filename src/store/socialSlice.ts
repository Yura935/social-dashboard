import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchAccounts } from "../api/socialApi";
import type { SocialAccount } from "../types";

type State = {
    list: SocialAccount[];
    loading: boolean;
    error: string | null;
};

const initialState: State = {
    list: [],
    loading: true,
    error: null,
};

export const loadAccounts = createAsyncThunk(
    "accounts/load",
    async () => await fetchAccounts()
);

const slice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<SocialAccount>) => {
            state.list.push(action.payload);
        },
        updateAccount: (state, action: PayloadAction<SocialAccount>) => {
            const index = state.list.findIndex(a => a.id === action.payload.id);
            if (index !== -1) state.list[index] = action.payload;
        },
        deleteAccount: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(a => a.id !== action.payload);
        },
        /** Increment view count when user sees a post (e.g. post enters viewport) */
        incrementPostViews: (
            state,
            action: PayloadAction<{ accountId: string; postIndex: number }>
        ) => {
            const account = state.list.find(a => a.id === action.payload.accountId);
            const idx = action.payload.postIndex;
            if (account?.posts?.[idx] != null) {
                account.posts[idx].views += 1;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccounts.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.list = action.payload;
            })
            .addCase(loadAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load accounts";
            });
    },
});

export const { addAccount, updateAccount, deleteAccount, incrementPostViews } = slice.actions;
export default slice.reducer;
