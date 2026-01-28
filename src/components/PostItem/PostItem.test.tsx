import { screen } from "@testing-library/dom";

import { render } from "../../test/test-utils";
import PostItem from "./PostItem";
import type { Post } from "../../types";

const mockPost: Post = {
    title: "Test post",
    description: "Short description",
    createdAt: "2024-01-15",
    views: 42,
};

describe("PostItem", () => {
    it("renders post title, description, date and views", () => {
        render(
            <PostItem post={mockPost} accountId="acc-1" postIndex={0} />
        );
        expect(screen.getByText("Test post")).toBeInTheDocument();
        expect(screen.getByText("Short description")).toBeInTheDocument();
        expect(screen.getByText(/Jan.*15.*2024/)).toBeInTheDocument();
        expect(screen.getByText(/42/)).toBeInTheDocument();
    });

    it("has accessible views label", () => {
        render(
            <PostItem post={mockPost} accountId="acc-1" postIndex={0} />
        );
        expect(screen.getByLabelText("42 views")).toBeInTheDocument();
    });
});
