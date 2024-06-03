"use client";

import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import type { ICookieAuthType } from "~/app/types/authTypes";

const useTeacherCookie = (): ICookieAuthType | null => {
	const [teacherCookie, setTeacherCookie] = useState<ICookieAuthType | null>(
		null,
	);

	useEffect(() => {
		const fetchTeacherCookie = () => {
			try {
				const cookieValue = Cookie.get("teacherD");
				if (cookieValue) {
					const parsedCookie = JSON.parse(
						cookieValue,
					) as ICookieAuthType;
					setTeacherCookie(parsedCookie);
				}
			} catch (error) {
				console.error("Error parsing Teacher cookie:", error);
			}
		};

		fetchTeacherCookie();
	}, []);

	return teacherCookie;
};

export default useTeacherCookie;
