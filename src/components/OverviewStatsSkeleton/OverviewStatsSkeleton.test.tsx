import { render } from "@testing-library/react";
import OverviewStatsSkeleton from "./OverviewStatsSkeleton";

describe("OverviewStatsSkeleton", () => {
    it("renders without crashing", () => {
        const { container } = render(<OverviewStatsSkeleton />);
        expect(container.querySelector(".MuiPaper-root")).toBeInTheDocument();
    });

    it("renders skeleton placeholders", () => {
        const { container } = render(<OverviewStatsSkeleton />);
        const skeletons = container.querySelectorAll(".MuiSkeleton-root");
        expect(skeletons.length).toBeGreaterThanOrEqual(4);
    });
});
