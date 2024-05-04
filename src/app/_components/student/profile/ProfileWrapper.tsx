"use client";

import { FC } from "react";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";
import useStudentCookie from "~/hooks/useStudentCookie";
import { ICookieAuthType } from "~/app/types/authTypes";

const ProfileWrapper: FC = () => {
	const studentCookie = useStudentCookie();

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
