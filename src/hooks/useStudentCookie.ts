"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import type { ICookieAuthType } from "~/app/types/authTypes";

const useStudentCookie = (): ICookieAuthType | null => {
	const [studentCookie, setStudentCookie] = useState<ICookieAuthType | null>(
		null,
	);

	useEffect(() => {
		const fetchStudentCookie = () => {
			try {
				const cookieValue = getCookie("studentD");
				if (cookieValue) {
					const parsedCookie = JSON.parse(
						cookieValue,
					) as ICookieAuthType;
					setStudentCookie(parsedCookie);
				}
			} catch (error) {
				console.error("Error parsing student cookie:", error);
			}
		};

		fetchStudentCookie();
	}, []);

	return studentCookie;
};

export default useStudentCookie;
