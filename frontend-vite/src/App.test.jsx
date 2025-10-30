import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  // Snapshot test
  it("matches snapshot", () => {
    // Render the App component
    const { asFragment } = render(<App />);
    // Capture the rendered output as a fragment and compare it to the saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
