import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/test-utils";
import Dashboard from "./Dashboard";
import { store } from "../../store";
import { loadAccounts } from "../../store/socialSlice";
import * as socialApi from "../../api/socialApi";
import type { SocialAccount } from "../../types";

const mockAccounts: SocialAccount[] = [
    {
        id: "1",
        name: "Twitter",
        followers: 12000,
        engagement: 4.5,
        posts: [],
    },
    {
        id: "2",
        name: "Instagram",
        followers: 45000,
        engagement: 22,
        posts: [],
    },
];

describe("Dashboard", () => {
    beforeEach(async () => {
        jest.restoreAllMocks();
        jest.spyOn(socialApi, "fetchAccounts").mockResolvedValue(mockAccounts);
        await store.dispatch(loadAccounts());
    });

    it("renders Add Account button", () => {
        render(<Dashboard />);
        expect(screen.getByRole("button", { name: /add account/i })).toBeInTheDocument();
    });

    it("shows account cards after load", () => {
        render(<Dashboard />);
        expect(screen.getByText("Twitter")).toBeInTheDocument();
        expect(screen.getByText("Instagram")).toBeInTheDocument();
    });

    it("filters accounts by search query", async () => {
        render(<Dashboard />);
        expect(screen.getByText("Twitter")).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText("Search accounts…");
        await userEvent.type(searchInput, "Twitter");

        await waitFor(() => {
            expect(screen.getByText("Twitter")).toBeInTheDocument();
            expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
        });
    });

    it("shows overview stats when accounts loaded", () => {
        render(<Dashboard />);
        const overview = screen.getByTestId("dashboard-overview-stats");
        const accountStats = within(overview).getAllByText((_, el) => (el?.textContent ?? "").replace(/\s+/g, " ").includes("2 account"));
        expect(accountStats.length).toBeGreaterThan(0);
        expect(within(overview).getByText(/57[\s,]?000/)).toBeInTheDocument();
    });

    it("shows error and Retry when load fails", async () => {
        jest.spyOn(socialApi, "fetchAccounts").mockRejectedValueOnce(new Error("Network error"));
        await store.dispatch(loadAccounts());
        render(<Dashboard />);
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
        const retryButton = screen.getByRole("button", { name: /retry/i });
        expect(retryButton).toBeInTheDocument();
        await userEvent.click(retryButton);
        expect(socialApi.fetchAccounts).toHaveBeenCalled();
    });

    it("after Retry, accounts load and list appears", async () => {
        jest.spyOn(socialApi, "fetchAccounts")
            .mockRejectedValueOnce(new Error("Network error"))
            .mockResolvedValueOnce(mockAccounts);
        await store.dispatch(loadAccounts());
        render(<Dashboard />);
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: /retry/i }));
        await waitFor(() => {
            expect(screen.getByText("Twitter")).toBeInTheDocument();
            expect(screen.getByText("Instagram")).toBeInTheDocument();
        });
    });

    it("shows empty state when no accounts", async () => {
        jest.spyOn(socialApi, "fetchAccounts").mockResolvedValueOnce([]);
        await store.dispatch(loadAccounts());
        render(<Dashboard />);
        expect(screen.getByText(/no accounts yet/i)).toBeInTheDocument();
        expect(screen.getByText(/add one to get started/i)).toBeInTheDocument();
        expect(screen.getAllByRole("button", { name: /add account/i }).length).toBeGreaterThan(0);
    });

    it("shows no match message when search has no results", async () => {
        render(<Dashboard />);
        const searchInput = screen.getByPlaceholderText("Search accounts…");
        await userEvent.type(searchInput, "Nonexistent");
        expect(screen.getByText(/no accounts match/i)).toBeInTheDocument();
        expect(screen.getByText(/Nonexistent/)).toBeInTheDocument();
    });

    it("add account flow: open modal, fill form, submit, new account appears", async () => {
        render(<Dashboard />);
        await userEvent.click(screen.getByRole("button", { name: /add account/i }));
        await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
        await userEvent.type(screen.getByLabelText(/^name$/i), "LinkedIn");
        await userEvent.clear(screen.getByLabelText(/followers/i));
        await userEvent.type(screen.getByLabelText(/followers/i), "10000");
        await userEvent.clear(screen.getByLabelText(/engagement/i));
        await userEvent.type(screen.getByLabelText(/engagement/i), "5");
        await userEvent.click(screen.getByRole("button", { name: /save/i }));
        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
            expect(screen.getByText("LinkedIn")).toBeInTheDocument();
        });
    });

    it("delete account flow: confirm delete removes card", async () => {
        render(<Dashboard />);
        expect(screen.getByText("Twitter")).toBeInTheDocument();
        const deleteButtons = screen.getAllByRole("button", { name: /delete account/i });
        await userEvent.click(deleteButtons[0]);
        await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
        expect(screen.getByText(/confirm delete/i)).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: /^delete$/i }));
        await waitFor(() => {
            expect(screen.queryByText("Twitter")).not.toBeInTheDocument();
            expect(screen.getByText("Instagram")).toBeInTheDocument();
        });
    });
});
