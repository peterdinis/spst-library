"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import NavigationItems from "./NavigationItems";

const Navigation: FC = () => {
	const [navbar, setNavbar] = useState(false);

	return (
		<nav className="w-full bg-white dark:bg-background">
			<div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
				<div>
					<div className="flex items-center justify-between py-3 md:block md:py-5">
						<Link href="/">
							<h2 className="text-xl dark:text-blue-50 font-bold text-black">
								SPŠT Knižnica
							</h2>
						</Link>
						<div className="md:hidden">
							<button
								className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
								onClick={() => setNavbar(!navbar)}
							>
								{navbar ? (
									<X className="text-black dark:text-blue-50 h-6 font-bold" />
								) : (
									<Menu className="text-black dark:text-blue-50 h-6 font-bold" />
								)}
							</button>
						</div>
					</div>
				</div>
				<div>
					<div
						className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
							navbar ? "block" : "hidden"
						}`}
					>
						<ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
							<NavigationItems />
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
