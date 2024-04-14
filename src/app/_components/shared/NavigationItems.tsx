import Link from "next/link";

export default async function NavigationItems() {
	return (
		<>
			<li className="text-xl text-black">
				<Link href="/">Domov</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/books">Knihy</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/categories">Kategórie</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/publishers">Vydavateľstvá</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/authors">Spisovatelia</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/student/login">Žiak</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/teacher/login">Učiteľ</Link>
			</li>
		</>
	);
}
