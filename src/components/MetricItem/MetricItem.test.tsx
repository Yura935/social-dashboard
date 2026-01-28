import { render, screen } from "@testing-library/react";
import MetricItem from "./MetricItem";

describe("MetricItem", () => {
    it("renders label, value and icon", () => {
        render(<MetricItem label="Followers" value="12,000" icon="👥" />);
        expect(screen.getByText("Followers")).toBeInTheDocument();
        expect(screen.getByText(/12,000/)).toBeInTheDocument();
        expect(screen.getByText(/👥/)).toBeInTheDocument();
    });

    it("renders different props", () => {
        render(<MetricItem label="Posts" value="99" icon="📱" />);
        expect(screen.getByText("Posts")).toBeInTheDocument();
        expect(screen.getByText(/99/)).toBeInTheDocument();
        expect(screen.getByText(/📱/)).toBeInTheDocument();
    });
});
