import api from "./api";

export async function addToCart(productId) {

    const token = localStorage.getItem("token");

    const response = await api.post(

        "/cart",

        {
            productId,
            quantity: 1
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}

export async function getCart() {

    const token = localStorage.getItem("token");

    const response = await api.get(

        "/cart",

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}

export async function updateQuantity(cartId, quantity) {

    const token = localStorage.getItem("token");

    const response = await api.put(

        `/cart/${cartId}`,

        {
            quantity
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}

export async function removeFromCart(cartId) {

    const token = localStorage.getItem("token");

    const response = await api.delete(

        `/cart/${cartId}`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}