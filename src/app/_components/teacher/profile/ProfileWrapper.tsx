"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import Settings from "./Settings";
import { ICookieAuthType } from "~/app/types/authTypes";
import BorrowedBooks from "./BorrowedBooks";

const ProfileWrapper: FC = ({
}) => {
	const teacherCookie = useTeacherCookie();

	return (
		<>
			<div className="grid md:grid-cols-2 md:gap-6">
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<h2 className="text-xl font-bold">Profil</h2>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="space-y-1.5">
									<h3 className="text-lg font-bold leading-none">
									{teacherCookie?.name + " " + teacherCookie?.lastName}
									</h3>
								</div>
							</div>
						</CardContent>
					</Card>
					<Settings teacherCookie={teacherCookie as unknown as ICookieAuthType} />
				</div>
				<BorrowedBooks />
			</div>
		</>
	);
};

export default ProfileWrapper;
