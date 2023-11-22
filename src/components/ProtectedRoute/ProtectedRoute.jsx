import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) navigate("/login")
    }, [isAuthenticated, navigate])
    return (
        <div>{isAuthenticated ? children : ""}</div>
    )
}

export default ProtectedRoute