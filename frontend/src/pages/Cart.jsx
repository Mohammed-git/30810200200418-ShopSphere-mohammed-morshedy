import { useEffect, useState } from "react";
import {
    getCart,
    updateQuantity,
    removeFromCart
} from "../services/cartService";
import { checkout } from "../services/orderService";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCart(true);
    }, []);

    async function fetchCart(showLoading = true) {

        try {

            if (showLoading) {
                setLoading(true);
            }

            setError("");

            const data = await getCart();

            setCart(data.items || []);

        } catch (error) {

            console.error("Error fetching cart:", error);

            setError("Failed to load cart.");

        } finally {

            if (showLoading) {
                setLoading(false);
            }

        }

    }

    async function handleUpdate(cartId, quantity) {

        if (quantity < 1) return;

        try {

            await updateQuantity(cartId, quantity);

            await fetchCart(false);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleRemove(cartId) {

        try {

            await removeFromCart(cartId);

            await fetchCart(false);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleCheckout() {

        try {

            const order = await checkout();

            alert("Order placed successfully!");

            console.log(order);

            setCart([]);
            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Checkout failed");

        }

    }

    const total = cart.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
    );

    if (loading) {

        return (

            <div className="container">

                <h2>Loading Cart...</h2>

            </div>

        );

    }

    if (error) {

        return (

            <div className="container">

                <h2>{error}</h2>

            </div>

        );

    }

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

                                    <div
                                        key={item.id}
                                        className="cart-item"
                                    >

                                        <img
                                            src={`http://localhost:5000/uploads/${item.product?.image}`}
                                            alt={item.product?.name}
                                            className="cart-image"
                                        />

                                        <div className="cart-info">

                                            <h3>{item.product?.name}</h3>

                                            <p>
                                                Category: {item.product?.category}
                                            </p>

                                            <p>
                                                Price: {item.product?.price} EGP
                                            </p>

                                            <div>

                                                <button
                                                    onClick={() =>
                                                        handleUpdate(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span
                                                    style={{
                                                        margin: "0 10px"
                                                    }}
                                                >
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        handleUpdate(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <br />

                                            <button
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))
                            }

                            <div className="cart-summary">

                                <h2>
                                    Total: {total.toLocaleString()} EGP
                                </h2>

                                <button
                                    className="checkout-btn"
                                    onClick={handleCheckout}
                                >
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