"use client";

import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { ICookieAuthType } from "~/app/types/authTypes";
import useStudentCookie from "~/hooks/useStudentCookie";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";
import { getCookie } from "cookies-next";

const ProfileWrapper: FC = () => {
	const studentCookie = useStudentCookie();
	const router = useRouter();
	const studentCheck = getCookie("isStudentLogin");

	if (!studentCheck) {
		router.push("/not-allowed");
	}
	return (
		<div className="grid md:grid-cols-2 md:gap-6 ml-4 mr-4">
			<div className="space-y-6">
				<Settings
					studentCookie={studentCookie as unknown as ICookieAuthType}
				/>
			</div>
			<BorrowedBooks />
		</div>
	);
};

export default ProfileWrapper;
