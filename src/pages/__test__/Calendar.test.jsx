import { render, screen, fireEvent } from "@testing-library/react";

import Calendar from "../Calendar";

describe("Calendar Component", () => {
  it("Should render calendar heading", () => {
    render(<Calendar />);
    expect(screen.getByText(/^calendar/i)).toBeInTheDocument();
  });

  it("Should show reminder button", () => {
    render(<Calendar />);
    const buttonElement = screen.getByText(/^Add Reminder/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("Should show reminder modal and input fields on click of add reminder button", () => {
    render(<Calendar />);
    fireEvent.click(screen.getByRole("button", { name: "Add Reminder" }));
    expect(screen.queryByText("Add New Reminder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Remind me to...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Reminder Description")
    ).toBeInTheDocument();
    expect(screen.queryByText("Pick date and time")).toBeInTheDocument();
  });

  it("Should be able to type in the input", () => {
    render(<Calendar />);
    fireEvent.click(screen.getByRole("button", { name: "Add Reminder" }));
    const titleInputElement = screen.getByPlaceholderText("Remind me to...");
    const descInputElement = screen.getByPlaceholderText(
      "Reminder Description"
    );
    fireEvent.change(titleInputElement, {
      target: { value: "New reminder title" },
    });
    fireEvent.change(descInputElement, {
      target: { value: "New reminder description" },
    });

    expect(titleInputElement.value).toBe("New reminder title");
    expect(descInputElement.value).toBe("New reminder description");
  });

  it("should close modal component", () => {
    render(<Calendar />);
    fireEvent.click(screen.getByRole("button", { name: "Add Reminder" }));

    fireEvent.click(screen.getByText("Close"));
  });
  // it("should add new reminder", () => {
  // })
});
