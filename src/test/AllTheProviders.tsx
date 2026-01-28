import { Provider } from "react-redux";
import { store } from "../store";

/** Wraps component with Redux Provider for tests */
export function AllTheProviders({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
