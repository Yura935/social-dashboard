import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { AllTheProviders } from "./AllTheProviders";

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
