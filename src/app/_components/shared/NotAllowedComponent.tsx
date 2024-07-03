"use client";

import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";

const NotAllowedComponent: FC = () => {
	const router = useRouter();

	useEffect(() => {
		const redirectTimeout = setTimeout(() => {
			router.push("/");
		}, 3000);
		return () => clearTimeout(redirectTimeout);
	}, [router]);

	return (
		<main className="flex h-screen w-full flex-col items-center justify-center">
			<h1 className="dark:text-blue-50 text-9xl font-extrabold tracking-widest text-black">
				Zákazaný prístup
			</h1>
			<div className="mt-4 px-2 absolute rotate-12 rounded bg-[#FF6A3D] text-sm">
				K tejto stránke nemáte prístup.
			</div>
		</main>
	);
};

export default NotAllowedComponent;
