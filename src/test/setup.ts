import "@testing-library/jest-dom";

// IntersectionObserver is not available in jsdom; mock it for PostItem (view-count) tests.
class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
}
(window as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
