import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { BrowserRouter } from "react-router-dom";

// Wrapper untuk BrowserRouter
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Dashboard Component", () => {
  test("renders header text", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("What's RPIC?")).toBeInTheDocument();
  });

  test("shows Sign Up and Login buttons", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("navbar links are visible", () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Facilities")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
  });

  test("renders YouTube iframe", () => {
    renderWithRouter(<Dashboard />);
    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
  });
});
