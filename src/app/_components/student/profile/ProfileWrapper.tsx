"use client";

import { FC } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";
import useStudentCookie from "~/hooks/useStudentCookie";
import { ICookieAuthType } from "~/app/types/authTypes";

const ProfileWrapper: FC = ({}) => {
	const studentCookie = useStudentCookie();

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
										{studentCookie?.name +
											" " +
											studentCookie?.lastName}
									</h3>
								</div>
							</div>
						</CardContent>
					</Card>

					<Settings
						studentCookie={
							studentCookie as unknown as ICookieAuthType
						}
					/>
				</div>
				<BorrowedBooks />
			</div>
		</>
	);
};

export default ProfileWrapper;
