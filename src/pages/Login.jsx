import React, { useEffect, useRef, useState } from 'react';
import './../css/tabs.css';
import { concatClassNames as cn } from '../helpers/concatClassNames';
import useRipple from '../hooks/useRipple';
import { app_name } from '../config/variables';

export default function Login() {
	const [activeTab, setActiveTab] = useState('login');

	useEffect(() => {}, [activeTab]);

	const loginRef = useRef(null);
	const registerRef = useRef(null);

	//pass the ref to the useRipple hook
	const loginRippels = useRipple(loginRef);
	const registerRippels = useRipple(registerRef);

	return (
		<div className="w-screen h-screen bg-white p-10 flex flex-col items-center">
			<div className="text-2xl text-center font-bold">{app_name}</div>
			<div className="bg-gray-50 shadow-xl h-full p-10 w-full lg:w-3/4 xl:w-2/5 shadow-gray-500/50 rounded-2xl">
				<div className="flex w-full justify-around bg-white">
					<button
						type="button"
						ref={loginRef}
						className={cn(
							'tab relative cursor-pointer overflow-hidden',
							activeTab === 'login' && 'border-purple-900'
						)}
						onClick={() => setActiveTab('login')}
					>
						{loginRippels}
						Login
					</button>
					<button
						type="button"
						ref={registerRef}
						className={cn(
							'tab relative cursor-pointer overflow-hidden',
							activeTab === 'register' && 'border-purple-900'
						)}
						onClick={() => setActiveTab('register')}
					>
						{registerRippels}
						Register
					</button>
				</div>
				{activeTab === 'register' && (
					<div className="flex">Register</div>
				)}

				{activeTab === 'login' && <div className="flex">Login</div>}
			</div>
		</div>
	);
}
