import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";
import { checkout } from "../services/orderService";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCart();
                setCart(data || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        
        fetchCart();
    }, []);

    async function handleCheckout() {
        try {
            const order = await checkout();
            alert("Order placed successfully!");
            console.log(order);
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Checkout failed");
        }
    }

    const total = cart.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    );

    return (
        <div className="container">
            <div className="cart-page">
                <h1>Your Shopping Cart</h1>
                {
                    cart.length === 0 ? (
                        <p className="empty-cart">
                            🛒 Your cart is empty
                        </p>
                    ) : (
                        <>
                            {
                                cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <img
                                            src={`http://localhost:5000/uploads/${item.product?.image}`}
                                            alt={item.product?.name}
                                            className="cart-image"
                                        />
                                        <div className="cart-info">
                                            <h3>{item.product?.name}</h3>
                                            <p>Category: {item.product?.category}</p>
                                            <p>Price: {item.product?.price} EGP</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="cart-summary">
                                <h2>Total: {total.toLocaleString()} EGP</h2>
                                <button className="checkout-btn" onClick={handleCheckout}>
                                    Checkout
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Cart;