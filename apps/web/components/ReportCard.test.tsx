import React from "react";
import { render, screen } from "@testing-library/react";
import ReportCard from "./ReportCard";

const report = {
  overall_score: 80,
  summary: "Looks good",
  metrics: { value_prop: 75, cta_visibility: 85, trust_design: 80 },
  fixes: [
    { title: "Fix A", description: "Do A" },
    { title: "Fix B", description: "Do B" },
    { title: "Fix C", description: "Do C" },
  ],
};

it("renders score and fixes", () => {
  render(<ReportCard report={report} />);
  expect(screen.getByText("80/100")).toBeInTheDocument();
  expect(screen.getByText("Fix A")).toBeInTheDocument();
});
