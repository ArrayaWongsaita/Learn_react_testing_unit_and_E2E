import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import ErrorMessage from "../../../src/errorMessage/ErrorMessage";
import { expect } from "vitest";

describe("ErrorMessage", () => {
  it("renders default error state", () => {
    render(<ErrorMessage />);
    expect(screen.getByTestId("message-container")).toHaveTextContent(
      "Something went wrong"
    );
  });
  it("renders default error state", () => {
    render(<ErrorMessage message="Email is already token" />);
    expect(screen.getByTestId("message-container")).toHaveTextContent(
      "Email is already token"
    );
  });
});
