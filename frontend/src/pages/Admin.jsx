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
    onClick={() => alert("This feature will be implemented in the next phase or use the api")}
>
    Coming Soon
</button>

            </div>

        </div>

    );

}

export default Admin;