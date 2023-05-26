import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { AuthContext } from '../context/AuthContext';
import Auth from '../helpers/Auth';
import TopBar from './Menu/TopBar';
import Sidebar from './Menu/Sidebar';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { SidebarContext } from '../context/SidebarContext';
import { concatClassNames as cn } from '../helpers/concatClassNames';
import { useToggle } from 'usehooks-ts';

export default function Root() {
	const [user, setUser] = useState(null);
	const [open, toggleOpen, setOpen] = useToggle(true);

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
								<SidebarContext.Provider
									value={{ open, toggleOpen, setOpen }}
								>
									<Sidebar />
									<div
										className={cn(
											'p-4',
											open ? 'md:ml-64' : 'md:ml-12'
										)}
									>
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
								</SidebarContext.Provider>
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
