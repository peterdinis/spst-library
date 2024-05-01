"use client";

import { FC} from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";
import BorrowedBooks from "./BorrowedBooks";
import Settings from "./Settings";


const ProfileWrapper: FC = ({
}) => {
	const { toast } = useToast();
	const logoutFromApp = () => {
		toast({
			title: "Odhlásenie bolo úspešné",
			className: "bg-green-500",
			duration: 2000,
		});
	};

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
										rrrr
									</h3>
									<Button
										onClick={logoutFromApp}
										className="mt-4"
										size="sm"
									>
										Odhlásiť
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Settings />

				</div>
				<BorrowedBooks />
			</div>
		</>
	);
};

export default ProfileWrapper;
