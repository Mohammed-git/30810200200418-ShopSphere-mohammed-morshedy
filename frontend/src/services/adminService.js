import api from "./api";

export async function getProducts() {
    const response = await api.get("/products", {
        params: { limit: 1000 }
    });
    return response.data;
}


export async function createProduct(formData) {
    const response = await api.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}

// تعديل منتج قائم
export async function updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
}

// حذف منتج
export async function deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}