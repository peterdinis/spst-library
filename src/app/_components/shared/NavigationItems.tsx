"use client"

import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { FC } from "react";

const NavigationItems: FC = () => {
	return (
		<>
			<li className="text-xl dark:text-blue-50  text-black">
				<Link href="/">Domov</Link>
			</li>
			<li className="text-xl dark:text-blue-50  text-black">
				<Link href="/books">Knihy</Link>
			</li>
			<li className="text-xl dark:text-blue-50  text-black">
				<Link href="/categories">Kategórie</Link>
			</li>
			<li className="text-xl dark:text-blue-50  text-black">
				<Link href="/publishers">Vydavateľstvá</Link>
			</li>
			<li className="text-xl dark:text-blue-50  text-black">
				<Link href="/authors">Spisovatelia</Link>
			</li>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/student/login">Žiak</Link>
			</li>
			<li className="text-xl dark:text-blue-50 text-black">
				<Link href="/teacher/login">Učiteľ</Link>
			</li>
			<li className="text-xl text-black">
				<ThemeButton />
			</li>
		</>
	);
}

export default NavigationItems;