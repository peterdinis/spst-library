"use client";

import { FC, useEffect } from "react";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";
import useStudentCookie from "~/hooks/useStudentCookie";
import { ICookieAuthType } from "~/app/types/authTypes";
import { useRouter } from "next/navigation";

const ProfileWrapper: FC = () => {
	const studentCookie = useStudentCookie();
	const router = useRouter();

	useEffect(() => {
		if(!studentCookie) {
			router.push("/student/login");
		}
	}, [studentCookie]);
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
