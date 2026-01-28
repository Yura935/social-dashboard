import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/test-utils";
import AccountCard from "./AccountCard";
import type { SocialAccount } from "../../types";

const mockAccount: SocialAccount = {
    id: "1",
    name: "Twitter",
    followers: 12000,
    engagement: 4.5,
    posts: [
        {
            title: "Test post",
            description: "Description",
            createdAt: "2024-01-01",
            views: 100,
        },
    ],
};

describe("AccountCard", () => {
    it("renders account name and metrics", () => {
        const onEdit = jest.fn();
        const onDelete = jest.fn();
        render(<AccountCard account={mockAccount} onEdit={onEdit} onDelete={onDelete} />);

        expect(screen.getByText("Twitter")).toBeInTheDocument();
        expect(screen.getByText("Social Account")).toBeInTheDocument();
        expect(screen.getByText(/12[\s,]?000/)).toBeInTheDocument();
        expect(screen.getByText(/4\.5%/)).toBeInTheDocument();
        expect(screen.getByText("Test post")).toBeInTheDocument();
    });

    it("calls onEdit when edit button is clicked", async () => {
        const onEdit = jest.fn();
        const onDelete = jest.fn();
        render(<AccountCard account={mockAccount} onEdit={onEdit} onDelete={onDelete} />);

        const editButton = screen.getByRole("button", { name: /edit account/i });
        await userEvent.click(editButton);
        expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it("calls onDelete with account id when delete button is clicked", async () => {
        const onEdit = jest.fn();
        const onDelete = jest.fn();
        render(<AccountCard account={mockAccount} onEdit={onEdit} onDelete={onDelete} />);

        const deleteButton = screen.getByRole("button", { name: /delete account/i });
        await userEvent.click(deleteButton);
        expect(onDelete).toHaveBeenCalledWith("1");
    });

    it("shows Recent posts section and empty state when no posts", () => {
        const accountNoPosts: SocialAccount = { ...mockAccount, posts: [] };
        render(
            <AccountCard
                account={accountNoPosts}
                onEdit={jest.fn()}
                onDelete={jest.fn()}
            />
        );
        expect(screen.getByText(/recent posts/i)).toBeInTheDocument();
        expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
    });
});
