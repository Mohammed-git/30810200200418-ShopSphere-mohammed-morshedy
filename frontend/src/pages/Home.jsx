import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Home() {

    const {
        data: products = [],
        isLoading,
        error
    } = useQuery({

        queryKey: ["featured-products"],

        queryFn: () => getProducts()

    });

    const featuredProducts = products.slice(0, 4);

    return (

        <div className="home-page">

            <section className="hero home-hero">

                <div className="hero-content">

                    <h1>Welcome to TechStore</h1>

                    <p>

                        Build your dream computer with the latest
                        GPUs, CPUs, RAM and Storage devices.

                    </p>

                    <Link
                        to="/products"
                        className="browse-btn"
                    >
                        Browse Products
                    </Link>

                </div>

            </section>

            <section className="promotion-banner">

                <h2>
                    🔥 Summer Sale
                </h2>

                <p>

                    Up to 20% OFF on selected PC components.
                    Limited time offer!

                </p>

            </section>

            <section className="featured-section">

                <h2>
                    Featured Products
                </h2>

                {

                    isLoading &&

                    <p>Loading featured products...</p>

                }

                {

                    error &&

                    <p>Failed to load featured products.</p>

                }

                <div className="featured-grid">

                    {

                        featuredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))

                    }

                </div>

            </section>

            <section className="categories">

                <div className="category-card">

                    <div className="category-icon">
                        🎮
                    </div>

                    <h2>Graphics Cards</h2>

                    <p>

                        Latest NVIDIA & AMD GPUs
                        for gaming and creators.

                    </p>

                </div>

                <div className="category-card">

                    <div className="category-icon">
                        ⚙️
                    </div>

                    <h2>Processors</h2>

                    <p>

                        Powerful Intel & Ryzen CPUs
                        for every build.

                    </p>

                </div>

                <div className="category-card">

                    <div className="category-icon">
                        💾
                    </div>

                    <h2>Memory</h2>

                    <p>

                        Fast DDR4 & DDR5 RAM
                        for smooth performance.

                    </p>

                </div>

                <div className="category-card">

                    <div className="category-icon">
                        🚀
                    </div>

                    <h2>Storage</h2>

                    <p>

                        SSDs and HDDs with
                        high speed and reliability.

                    </p>

                </div>

            </section>

        </div>

    );

}

export default Home;