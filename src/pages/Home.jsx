import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

export default function Home() {
	const { user, setUser } = useContext(AuthContext);

	function handleLogout() {
		localStorage.removeItem('user');
		Cookies.remove('token');
		setUser(null);
	}

	return (
		<div className="h-auto p-10">
			<div
				id="kamsd"
				className="flex items-center h-full min-h-full bg-white flex-col justify-center rounded-md border-gray-400 shadow-sm place-content-center p-10 space-y-10"
			>
				<h1 className="font-bold text-2xl text-center">
					{process.env.REACT_APP_NAME}
				</h1>

				{user ? (
					<NavLink
						onClick={handleLogout}
						className="bg-gray-400 font-bold hover:bg-slate-700 px-4 py-2 rounded text-white text-center w-52"
						to="/"
					>
						Logout
					</NavLink>
				) : (
					<NavLink
						className="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white text-center w-52"
						to="/login"
					>
						Login
					</NavLink>
				)}
			</div>
		</div>
	);
}
