import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import { vi } from "vitest";

// Mock للـ authService
vi.mock("../services/authService", () => ({
    login: vi.fn()
}));

describe("Login Component", () => {

    test("renders login form", () => {

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(
    screen.getByRole("heading", { name: "Login" })
).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Email")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Password")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument();

    });

});