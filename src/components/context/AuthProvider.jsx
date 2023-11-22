import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000";

const AuthContext = createContext();
const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
}

function authReducer(state, action) {
    switch (action.type) {
        case "loading": return {
            ...state,
            isLoading: true,
            error: null,
        }
        case "login": return {
            ...state,
            isLoading: false,
            isAuthenticated: true,
            user: action.payload,
            error: null,
        }
        case "logout": return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            error: null,
        }
        case "rejected": return {
            ...state,
            isLoading: false,
            error: "Please fill out the form carefully!"
        }
        default: throw new Error("error")
    }
}

export default function AuthProvider({ children }) {

    const [{ isAuthenticated, error, user, isLoading }, dispatch] = useReducer(authReducer, initialState);
    async function login(email, password) {
        try {
            dispatch({ type: "loading" });
            const { data } = await axios.get(`${BASE_URL}/login`);
            if (email === data.email && password === data.password) {
                dispatch({ type: "login", payload: data })
            } else {
                dispatch({ type: "rejected" })
            }
        } catch (err) {
            toast.error(err.message);
            dispatch({ type: "rejected", payload: err.message })
        }
    }

    function logout() {
        try {
            dispatch({ type: "loading" });
            dispatch({ type: "logout" })

        } catch (err) {
            toast.error(err.message);
            dispatch({ type: "rejected", payload: err.message })
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                isLoading,
                error,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}

export function useAuth() {
    return useContext(AuthContext);
}