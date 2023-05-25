import React, { useEffect, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import './../../css/menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faArrowCircleRight,
	faChartPie,
	faExchange,
	faFileInvoiceDollar,
	faGear,
	faHouse,
	faScaleBalanced,
} from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

export default function Sidebar() {
	const [open, toggleOpen, setOpen] = useToggle(true);

	const [fontColor, setFontColor] = useState(() => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? `#fff`
			: `#000`;
	});

	const sidebar_class_base = 'group sidebar';

	const sidebar_class = open
		? `${sidebar_class_base} w-64`
		: `${sidebar_class_base} w-16`;

	useEffect(() => {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', ({ matches }) => {
				if (matches) {
					setFontColor(() =>
						window.matchMedia('(prefers-color-scheme: dark)')
							.matches
							? `#fff`
							: `#000`
					);
				}
			});
	}, []);

	return (
		<div className="hidden md:block">
			<aside
				id="default-sidebar"
				className={sidebar_class}
				aria-label="Sidebar"
			>
				<div className="sidebar_menu">
					<button
						data-drawer-target="default-sidebar"
						data-drawer-toggle="default-sidebar"
						aria-controls="default-sidebar"
						onClick={toggleOpen}
						type="button"
						className="sidebar_toggle_button"
					>
						<span className="">
							{open ? (
								<FontAwesomeIcon
									className="dark:text-white text-black"
									icon={faArrowCircleLeft}
								/>
							) : (
								<FontAwesomeIcon
									className="dark:text-white text-black"
									icon={faArrowCircleRight}
								/>
							)}
						</span>
					</button>
					<ul className="space-y-2 font-medium">
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faHouse}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Dashboard
									</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faFileInvoiceDollar}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Accounts
									</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faExchange}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Transactions
									</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faCreditCard}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Credit Card
									</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faScaleBalanced}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Budgets
									</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faChartPie}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Reports
									</span>
								)}
							</a>
						</li>
						<li>
							<a
								href="/"
								className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FontAwesomeIcon
									className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									icon={faGear}
								/>
								{open && (
									<span className="flex-1 ml-3 whitespace-nowrap">
										Settings
									</span>
								)}
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
}
