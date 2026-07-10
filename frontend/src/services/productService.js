import api from "./api";

export async function getProducts(
    search = "",
    category = "",
    sort = "",
    page = 1
) {

    const response = await api.get("/products", {
        params: {
            search,
            category,
            sort,
            page
        }
    });

    return response.data;

}