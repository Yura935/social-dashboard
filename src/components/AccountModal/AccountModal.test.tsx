import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { render } from "../../test/test-utils";
import AccountModal from "./AccountModal";
import type { SocialAccount } from "../../types";
import { store } from "../../store";
import { addAccount } from "../../store/socialSlice";

jest.mock("../../utils", () => ({
    ...jest.requireActual("../../utils"),
    getRandomUUID: () => "new-account-uuid",
}));

describe("AccountModal", () => {
    it("renders Add Account title when no accountToEdit", () => {
        render(<AccountModal open={true} onClose={jest.fn()} />);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Add Account")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    it("renders Edit Account title when accountToEdit provided", () => {
        const account: SocialAccount = {
            id: "1",
            name: "Twitter",
            followers: 1000,
            engagement: 5,
            posts: [],
        };
        render(<AccountModal open={true} onClose={jest.fn()} accountToEdit={account} />);
        expect(screen.getByText("Edit Account")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Twitter")).toBeInTheDocument();
        expect(screen.getByDisplayValue("1000")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
    });

    it("does not render when open is false", () => {
        render(<AccountModal open={false} onClose={jest.fn()} />);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("shows Add post button and posts section", () => {
        render(<AccountModal open={true} onClose={jest.fn()} />);
        expect(screen.getByRole("button", { name: /add post/i })).toBeInTheDocument();
        expect(screen.getByText(/No posts yet/)).toBeInTheDocument();
    });

    it("shows validation errors when submitting empty form", async () => {
        const onClose = jest.fn();
        render(<AccountModal open={true} onClose={onClose} />);
        await userEvent.click(screen.getByRole("button", { name: /save/i }));
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(onClose).not.toHaveBeenCalled();
    });

    it("adds post when Add post is clicked", async () => {
        render(<AccountModal open={true} onClose={jest.fn()} />);
        await userEvent.click(screen.getByRole("button", { name: /add post/i }));
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    });

    it("removes post when remove button is clicked", async () => {
        const account: SocialAccount = {
            id: "1",
            name: "Twitter",
            followers: 1000,
            engagement: 5,
            posts: [{ title: "First", description: "Desc", createdAt: "2024-01-01", views: 0 }],
        };
        render(<AccountModal open={true} onClose={jest.fn()} accountToEdit={account} />);
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        await userEvent.click(screen.getByLabelText(/remove post 1/i));
        expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
        expect(screen.getByText(/No posts yet/)).toBeInTheDocument();
    });

    it("submits new account and dispatches addAccount", async () => {
        const onClose = jest.fn();
        render(<AccountModal open={true} onClose={onClose} />);
        await userEvent.type(screen.getByLabelText(/^name$/i), "New Account");
        const followersInput = screen.getByLabelText(/followers/i);
        await userEvent.clear(followersInput);
        await userEvent.type(followersInput, "5000");
        const engagementInput = screen.getByLabelText(/engagement/i);
        await userEvent.clear(engagementInput);
        await userEvent.type(engagementInput, "8");
        await userEvent.click(screen.getByRole("button", { name: /save/i }));
        expect(store.getState().accounts.list.some((a) => a.name === "New Account")).toBe(true);
        expect(onClose).toHaveBeenCalled();
    });

    it("submits update and dispatches updateAccount", async () => {
        const account: SocialAccount = {
            id: "edit-1",
            name: "Twitter",
            followers: 1000,
            engagement: 5,
            posts: [],
        };
        store.dispatch(addAccount(account));
        const onClose = jest.fn();
        render(<AccountModal open={true} onClose={onClose} accountToEdit={account} />);
        const nameInput = screen.getByLabelText(/^name$/i);
        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, "X");
        await userEvent.click(screen.getByRole("button", { name: /update/i }));
        expect(store.getState().accounts.list.find((a) => a.id === "edit-1")?.name).toBe("X");
        expect(onClose).toHaveBeenCalled();
    });
});
