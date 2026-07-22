import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    const {
        data: rawData = [],
        isLoading,
        isFetching,
        error
    } = useQuery({

        queryKey: [
            "products",
            search,
            category,
            sort,
            page
        ],

        queryFn: () =>
            getProducts(
                search,
                category,
                sort,
                page
            ),

        // الخاصية دي بتمنع إخفاء الشاشة والـ Refresh السريع عند تغيير السيرش أو الفلترة
        placeholderData: keepPreviousData

    });

    // التعامل مع راجع البيانات سوا كانت Array مباشرة أو Object
    const products = Array.isArray(rawData) ? rawData : (rawData.products || []);

    // التحميل أول مرة خالص فقط عند فتح الصفحة
    if (isLoading) {
        return (
            <div className="container">
                <h2>Loading Products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <h2>Failed to load products.</h2>
            </div>
        );
    }

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

                        <option value="name_asc">
                            Name A → Z
                        </option>

                        <option value="name_desc">
                            Name Z → A
                        </option>

                    </select>

                </div>

            </div>

            {/* أثناء التحميل في الخلفية بنعمل شفافية بسيطة بدون ما نخفي المنتجات */}
            <div style={{ opacity: isFetching ? 0.7 : 1, transition: "opacity 0.2s" }}>
                {
                    products.length === 0

                        ? <p>No products found.</p>

                        : products.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))
                }
            </div>

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
                disabled={products.length === 0}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

        </div>

    );

}

export default Products;