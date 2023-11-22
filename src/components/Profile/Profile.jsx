import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [open, setOpen] = useState(false);

    return (
        <div className="loginBtn" style={{ position: "relative" }} >
            <button onClick={() => setOpen(!open)}>
                <CgProfile className="profileIcon" id="profile" />
            </button>
            {open && <ProfileMenu setOpen={setOpen} />}
        </div>
    )
}

export default Profile;


function ProfileMenu({ setOpen }) {
    const profileRef = useRef();
    useOutsideClick(profileRef, () => setOpen(false), "profile")
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login")
    }
    return (
        <div className="profileMenuContainer" ref={profileRef}>
            <div className="profileMenuItem">{user.name}</div>
            <div className="profileMenuItem">
                <button onClick={handleLogout}>
                    Logout &nbsp;
                    <FiLogOut />
                </button>
            </div>
        </div>
    )
}