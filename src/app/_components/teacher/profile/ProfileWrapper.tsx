"use client";

import { FC} from "react";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import Settings from "./Settings";
import { ICookieAuthType } from "~/app/types/authTypes";
import BorrowedBooks from "./BorrowedBooks";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

const ProfileWrapper: FC = () => {
	const teacherCookie = useTeacherCookie();
	const router = useRouter();
	const teacherCheck = Cookie.get("isTeacherLogin");

	if(!teacherCheck) {
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
