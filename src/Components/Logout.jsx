import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		try {
			// Clear any persisted auth
			localStorage.removeItem("token");
			localStorage.removeItem("admin");

			// Optionally: clear other caches/state if used
			// sessionStorage.clear();

			// Redirect to login
			navigate("/", { replace: true });
		} catch (e) {
			// Even if cleanup fails, try to navigate to login
			navigate("/", { replace: true });
		}
	}, [navigate]);

	return (
		<div className="w-full h-screen flex items-center justify-center text-white">
			<p>Signing you out…</p>
		</div>
	);
};

export default Logout;

// Reusable button for placing inline in UIs
export const LogoutButton = ({ className = "bg-[#1DCD9F] cursor-pointer hover:bg-[#17b58b] text-black py-2 px-4 rounded-lg font-semibold transition-all" }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		try {
			localStorage.removeItem("token");
			localStorage.removeItem("admin");
		} finally {
			navigate("/", { replace: true });
		}
	};

	return (
		<button onClick={handleLogout} className={className}>
			Logout
		</button>
	);
};
