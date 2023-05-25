import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { AuthContext } from '../context/AuthContext';
import Auth from '../helpers/Auth';
import TopBar from './Menu/TopBar';
import Sidebar from './Menu/Sidebar';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Root() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!user) {
			Auth.readUser().then((value) => {
				setUser(value);
			});
		}
	}, [user]);

	return (
		<div className="h-screen bg-gray-300">
			<BrowserRouter>
				<AuthContext.Provider value={{ user, setUser }}>
					{user == null ? (
						<div>
							<TopBar />
							<div>
								<Sidebar />
								<div className="p-4 md:ml-64">
									<Routes>
										<Route
											path="/"
											element={<Home />}
										></Route>
										<Route
											path="*"
											element={<NotFound />}
										></Route>
									</Routes>
								</div>
							</div>
						</div>
					) : (
						<Routes>
							<Route
								path="/auth/login"
								element={<Login />}
							></Route>
							<Route
								path="*"
								element={
									<Navigate
										to="/auth/login"
										replace
									/>
								}
							></Route>
						</Routes>
					)}
				</AuthContext.Provider>
			</BrowserRouter>
		</div>
	);
}
