import Link from "next/link";
import { FC } from "react";

const DashboardLinks: FC = () => {
	return (
		<nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/books"
			>
				Všetky knihy
			</Link>
			<Link href="/admin/categories">Všetky kategórie</Link>
			<Link href="/admin/publishers">Všetky vydavateľstvá</Link>
			<Link href="/admin/authors">Všetci spisovatelia</Link>
			<Link href="/admin/students">Všetci študenti</Link>
			<Link href="/admin/teachers">Všetci učitelia</Link>
			<Link href="/admin/bookings">Všetky objednávky</Link>
		</nav>
	);
};

export default DashboardLinks;
