import Link from "next/link";
import { validateRequest } from "~/server/lucia/validate-request";

export default async function NavigationItems() {
	/* const { user } = await validateRequest(); */

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
				<Link href="/authors">Spistovatelia</Link>
			</li>
			{/* {user ? (
				<li className="text-xl text-black">
					<Link href="/student/profile">Profil</Link>
				</li>
			) : (
				<> */}
			<li className="text-xl text-black">
				<Link href="/student/login">Žiak</Link>
			</li>
			<li className="text-xl text-black">
				<Link href="/teacher/login">Učiteľ</Link>
			</li>
			{/* 	</>
			)} */}
		</>
	);
}
