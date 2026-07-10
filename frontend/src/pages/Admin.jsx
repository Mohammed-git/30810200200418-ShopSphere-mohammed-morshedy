function Admin() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div className="admin-page">

            <div className="admin-card">

                <h1>Admin Dashboard</h1>

                <p>

                    Welcome,

                    <strong>
                        {" "}
                        {user?.name || "Admin"}
                    </strong>

                </p>

                <hr />

                <h3>Store Management</h3>

                <p>

                    ✔ Add Products

                </p>

                <p>

                    ✔ Update Products

                </p>

                <p>

                    ✔ Delete Products

                </p>

                <p>

                    ✔ Manage Inventory

                </p>

                <button
    onClick={() => alert("Use the Backend API to add products.")}
>
    Add New Product
</button>

            </div>

        </div>

    );

}

export default Admin;