import { addToCart } from "../services/cartService";
function ProductCard({ product }) {
    
    async function handleAddToCart() {

    try {

        await addToCart(product.id);

        alert("Added to cart!");

    } catch (error) {

        alert(error.response?.data?.message || "Failed");

    }

}
    return (

        <div className="product-card">

    <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        className="product-image"
    />

    <div className="product-info">

        <h2>{product.name}</h2>

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