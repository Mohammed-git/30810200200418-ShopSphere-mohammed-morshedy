import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchProduct() {

            try {

                const response = await api.get(`/products/${id}`);

                setProduct(response.data);

            } catch {

                setError("Product not found.");

            } finally {

                setLoading(false);

            }

        }

        fetchProduct();

    }, [id]);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="container">

            <h1>{product.name}</h1>

            <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                width="350"
            />

            <p>{product.description}</p>

            <h2>{product.price} EGP</h2>

            <p>Category : {product.category}</p>

            <p>Stock : {product.stock}</p>

        </div>

    );

}

export default ProductDetails;