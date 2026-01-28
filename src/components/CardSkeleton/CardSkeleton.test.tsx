import { render } from "@testing-library/react";
import CardSkeleton from "./CardSkeleton";

describe("CardSkeleton", () => {
    it("renders without crashing", () => {
        const { container } = render(<CardSkeleton />);
        expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
    });

    it("renders multiple skeleton elements", () => {
        const { container } = render(<CardSkeleton />);
        const skeletons = container.querySelectorAll(".MuiSkeleton-root");
        expect(skeletons.length).toBeGreaterThan(5);
    });
});
