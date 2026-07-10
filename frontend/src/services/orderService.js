import api from "./api";

export async function checkout() {

    const token = localStorage.getItem("token");

    const response = await api.post(

        "/orders",

        {},

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}