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
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/categories"
			>
				Všetky kategórie
			</Link>
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/publishers"
			>
				Všetky vydavateľstvá
			</Link>
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/authors"
			>
				Všetci spisovatelia
			</Link>
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/students"
			>
				Všetci študenti
			</Link>
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/teachers"
			>
				Všetci učitelia
			</Link>
			<Link
				className="font-semibold text-gray-900 dark:text-gray-50"
				href="/admin/bookings"
			>
				Všetky objednávky
			</Link>
		</nav>
	);
};

export default DashboardLinks;
