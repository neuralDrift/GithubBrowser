import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UserSearch from "./components/UserSearch.jsx";
import { BrowserRouter } from "react-router-dom";

// Group of tests for UserSearch component
describe("UserSearch component", () => {
  // Test input box and search button render correctly
  it("renders input and button", () => {
    render(
      <BrowserRouter>
        <UserSearch />
      </BrowserRouter>
    );

    // Select input element with placeholder text
    const input = screen.getByPlaceholderText(/search github users/i);

    // Select button using role and name
    const button = screen.getByRole("button", { name: /search/i });

    // Expect both elements to exist
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  // Test input typing value update
  it("allows typing in input", () => {
    render(
      <BrowserRouter>
        <UserSearch />
      </BrowserRouter>
    );

    // Select input element
    const input = screen.getByPlaceholderText(/search github users/i);
    // Simulate typing octocat
    fireEvent.change(input, { target: { value: "octocat" } });

    // Expect input values to update
    expect(input.value).toBe("octocat");
  });
});
