import { addToCart } from "../services/cartService";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    
    async function handleAddToCart() {
        try {
            await addToCart(product.id);
            alert("Added to cart!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed");
        }
    }


    const getImageUrl = () => {
        if (!product?.image) {
            return "https://via.placeholder.com/300x200?text=No+Image";
        }


        if (product.image.startsWith("http://") || product.image.startsWith("https://")) {
            return product.image;
        }


        if (product.image.startsWith("uploads/") || product.image.startsWith("/uploads/")) {
            const cleanPath = product.image.replace(/^\/?uploads\//, "");
            return `http://localhost:5000/uploads/${cleanPath}`;
        }

  
        return `http://localhost:5000/uploads/${product.image}`;
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <img
                    src={getImageUrl()}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    }}
                />
            </Link>

            <div className="product-info">
                <Link to={`/products/${product.id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> {product.price} EGP</p>

                <button onClick={handleAddToCart}>
                    Add To Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;