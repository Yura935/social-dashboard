import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import { render } from "../../test/test-utils";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const onDeleted = jest.fn();
const onClose = jest.fn();

describe("DeleteConfirmationModal", () => {
    beforeEach(() => {  
        jest.clearAllMocks();
    });
    
    it("renders title and message when open", () => {
        render(
            <DeleteConfirmationModal
                open
                onClose={onClose}
                deleteConfirmId="1"
                onDeleted={onDeleted}
            />
        );
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to delete this account\?/)).toBeInTheDocument();
    });

    it("calls onClose when Cancel is clicked", async () => {
        render(
            <DeleteConfirmationModal
                open
                onClose={onClose}
                deleteConfirmId="1"
                onDeleted={onDeleted}
            />
        );
        await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onDeleted and onClose when Delete is clicked", async () => {
        render(
            <DeleteConfirmationModal
                open
                onClose={onClose}
                deleteConfirmId="1"
                onDeleted={onDeleted}
            />
        );
        await userEvent.click(screen.getByRole("button", { name: /^delete$/i }));
        expect(onDeleted).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not render dialog when open is false", () => {
        render(
            <DeleteConfirmationModal
                open={false}
                onClose={onClose}
                deleteConfirmId={null}
                onDeleted={onDeleted}
            />
        );
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("does not call onDeleted when deleteConfirmId is null and Delete clicked", async () => {
        render(
            <DeleteConfirmationModal
                open
                onClose={onClose}
                deleteConfirmId={null}
                onDeleted={onDeleted}
            />
        );
        await userEvent.click(screen.getByRole("button", { name: /^delete$/i }));
        expect(onDeleted).not.toHaveBeenCalled();
    });
});
