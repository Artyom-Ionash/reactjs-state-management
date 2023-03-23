import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/The Star Wars API/i);
  expect(linkElement).toBeInTheDocument();
});

// "Cannot use import statement outside a module" with Axios
// https://stackoverflow.com/a/75191899/5070569
