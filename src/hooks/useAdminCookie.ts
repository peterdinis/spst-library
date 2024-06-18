"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import type { ICookieAuthType } from "~/app/types/authTypes";

const useAdminCookie = (): ICookieAuthType | null => {
	const [adminCookie, setAdminCookie] = useState<ICookieAuthType | null>(
		null,
	);

	useEffect(() => {
		const fetchAdminCookie = () => {
			try {
				const cookieValue = getCookie("adminD");
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
	}, []);

	return adminCookie;
};

export default useAdminCookie;
