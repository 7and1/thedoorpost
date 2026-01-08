import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressStepper from "./ProgressStepper";

it("renders progress message", () => {
  render(<ProgressStepper progress={40} message="Testing" />);
  expect(screen.getByText("Testing")).toBeInTheDocument();
});
