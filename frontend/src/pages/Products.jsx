import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {

        async function fetchProducts() {

            try {

                const data = await getProducts(
                    search,
                    category,
                    sort,
                    page
                );

                setProducts(data);

            } catch (error) {

                console.error(error);

            }

        }

        fetchProducts();

    }, [search, category, sort, page]);

    return (

    <div className="container">

        <section className="hero">

            <div className="hero-content">

                <h1>Build Your Dream PC</h1>

                <p>
                    High Performance Components at Competitive Prices
                </p>

            </div>

        </section>

           <div className="products-header">

    <h1>Products</h1>

    <input
        type="text"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
        }}
    />

    <div className="filters">

        <select
            value={category}
            onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
            }}
        >

            <option value="">All Categories</option>
            <option value="GPU">GPU</option>
            <option value="CPU">CPU</option>
            <option value="RAM">RAM</option>
            <option value="Storage">Storage</option>

        </select>

        <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
        >

            <option value="">Newest</option>

            <option value="price_asc">
                Price Low → High
            </option>

            <option value="price_desc">
                Price High → Low
            </option>

        </select>

    </div>

</div>

            {

                products.length === 0 ?

                    <p>No products found.</p>

                    :

                    products.map((product) => (

                        <ProductCard

                            key={product.id}

                            product={product}

                        />

                    ))

            }

            <br />

            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>

            <span
                style={{
                    margin: "0 15px"
                }}
            >
                Page {page}
            </span>

            <button
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>
            

        </div>

    );

}

export default Products;