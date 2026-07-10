import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import { vi } from "vitest";


vi.mock("../services/cartService", () => ({
    addToCart: vi.fn()
}));

describe("ProductCard Component", () => {

    test("renders product information", () => {

        const product = {
            id: 1,
            name: "RTX 5090",
            price: 200000,
            category: "GPU"
        };

        render(<ProductCard product={product} />);

        expect(screen.getByText("RTX 5090")).toBeInTheDocument();

        expect(screen.getByText("Price: 200000")).toBeInTheDocument();

        expect(screen.getByText("Category: GPU")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /Add To Cart/i })
        ).toBeInTheDocument();

    });

});