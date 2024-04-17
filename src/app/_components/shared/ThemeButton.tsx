"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

const ThemeButton: FC = () => {
	const [mounted, setMounted] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
    
	const toggleTheme = () => {
		setTheme(resolvedTheme === "light" ? "dark" : "light");
		setIsActive(!isActive);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			onClick={toggleTheme}
			className={`
       relative w-16 h-8 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1`}
		>
			<Moon className="fill-white w-[15px] h-[15px]"></Moon>
			<div
				id="toggleBtnTheme"
				className={` bg-white
        absolute  w-6 h-6 rounded-full shadow-customShadow-md ${
					isActive
						? " transition-transform translate-x-0"
						: " transition-transform translate-x-8"
				}`}
			></div>
			<Sun className="fill-white ml-auto w-[15px] h-[15px]"></Sun>
		</div>
	);
};

export default ThemeButton;