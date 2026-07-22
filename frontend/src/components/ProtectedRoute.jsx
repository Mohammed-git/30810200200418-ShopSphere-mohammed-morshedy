import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({

    children,

    adminOnly = false

}) {

    const { user } = useAuth();

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (

        adminOnly &&

        user.role !== "admin"

    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;