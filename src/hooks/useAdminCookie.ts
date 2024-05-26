"use client";

import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import type { ICookieAuthType } from "~/app/types/authTypes";

const useAdminCookie = (): ICookieAuthType | null => {
	const [adminCookie, setAdminCookie] = useState<ICookieAuthType | null>(
		null,
	);

	useEffect(() => {
		const fetchAdminCookie = () => {
			try {
				const cookieValue = Cookie.get("adminD");
				if (cookieValue) {
					const parsedCookie = JSON.parse(
						cookieValue,
					) as ICookieAuthType;
					setAdminCookie(parsedCookie);
				}
			} catch (error) {
				console.error("Error parsing Admin cookie:", error);
			}
		};

		fetchAdminCookie();

		return () => {};
	}, []);

	return adminCookie;
};

export default useAdminCookie;
