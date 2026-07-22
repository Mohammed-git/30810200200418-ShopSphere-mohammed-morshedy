import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../services/adminService";

function Admin() {
    const { user } = useAuth();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null
    });

    useEffect(() => {
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            const list = Array.isArray(data) ? data : (data.products || []);
            setProducts(list);
            setError("");
        } catch (err) {
            setError("Failed to load products: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
            image: null
        });
        setEditingId(null);
    };

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image: null
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        try {
            if (editingId) {
                const payload = {
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    category: formData.category,
                    stock: parseInt(formData.stock, 10)
                };

                await updateProduct(editingId, payload);
                setSuccessMsg("The product has been successfully updated!");
            } else {
                const data = new FormData();
                data.append("name", formData.name);
                data.append("description", formData.description);
                data.append("price", formData.price);
                data.append("category", formData.category);
                data.append("stock", formData.stock);
                if (formData.image) {
                    data.append("image", formData.image);
                }

                await createProduct(data);
                setSuccessMsg(
    "Product added successfully!"
);
            }

            resetForm();
            fetchProductsList();
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while executing the operation.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            setError("");
            await deleteProduct(id);
            setSuccessMsg("The product has been successfully deleted!");
            fetchProductsList();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete the product.");
        }
    };

    const totalProducts = products.length;
    const totalStock = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);
    const totalValue = products.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.stock || 0)), 0);

    return (
        <div className="admin-page">
            
            {/* Header Section */}
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome, <strong>{user?.name || "Admin"}</strong></p>
            </div>

            {/* Quick Stats Bar */}
            <div className="stats-bar">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p className="stat-number">{totalProducts}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Stock</h3>
                    <p className="stat-number">{totalStock}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Inventory Value</h3>
                    <p className="stat-number">EGP{totalValue.toFixed(2)}</p>
                </div>
            </div>

            {/* Alerts Section */}
            {error && <div className="alert alert-error">{error}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            {/* Form Section */}
            <div className="admin-card">
                <h2>{editingId ? "Edit Product Details" : "Add New Product"}</h2>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Product Description:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required 
                            rows="3"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (EGP):</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label>Category:</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="GPU">GPU</option>
                                <option value="CPU">CPU</option>
                                <option value="RAM">RAM</option>
                                <option value="Storage">Storage</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                type="number" 
                                name="stock" 
                                value={formData.stock} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    {!editingId && (
                        <div className="form-group">
                            <label>Product image:</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                required
                            />
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {editingId ? "Save Changes" : "Add Product"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} className="btn-secondary">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Products Table Section */}
            <div className="admin-card">
                <h2>Manage Store Products</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <p>No products added yet.</p>
                ) : (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((prod) => (
                                    <tr key={prod.id}>
                                        <td>#{prod.id}</td>
                                        <td><strong>{prod.name}</strong></td>
                                        <td>{prod.category}</td>
                                        <td>EGP{prod.price.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${prod.stock > 0 ? "badge-success" : "badge-danger"}`}>
                                                {prod.stock} units
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                onClick={() => handleEditClick(prod)} 
                                                className="btn-edit"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(prod.id)} 
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;