import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Loader from '../Loader/Loader';
import { LoaderIcon } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();
    const { login, isLoading, isAuthenticated, error } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, passwordInput);
    }
    useEffect(() => {
        if (isAuthenticated) navigate("/", { replace: true })
    }, [isAuthenticated, navigate])

    return (
        <div className='loginForm'>
            <h2>Login</h2>
            <form action="" className='form' onSubmit={handleLogin}>
                <div className='formControl'>
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='formControl'>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                </div>
                <span className='error'>{error}</span>
                <button
                    className='primaryBtn'
                    disabled={!email || !passwordInput || isLoading}
                >
                    {isLoading ? <LoaderIcon style={{ width: "1.3rem", height: "1.3rem", margin: "0 auto" }} /> : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login