"use client"

import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { ICookieAuthType } from "~/app/types/authTypes";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";
import { getCookie } from "cookies-next";

const ProfileWrapper: FC = () => {
	const teacherCookie = useTeacherCookie();
	const router = useRouter();
	const teacherCheck = getCookie("isTeacherLogin");

	if (!teacherCheck) {
		router.push("/not-allowed");
	}
	return (
		<>
			<div className="grid md:grid-cols-2 md:gap-6">
				<div className="space-y-6">
					<Settings
						teacherCookie={
							teacherCookie as unknown as ICookieAuthType
						}
					/>
				</div>
				<BorrowedBooks />
			</div>
		</>
	);
};

export default ProfileWrapper;
