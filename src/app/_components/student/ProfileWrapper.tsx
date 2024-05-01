"use client";

import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";


const ProfileWrapper: FC = ({
}) => {
	const { toast } = useToast();
	const [isEditable, setIsEditable] = useState(false);
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
							<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										rrr - rrr
									</label>
									<p>kokotisko@gmail.com</p>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium leading-none">
										Rola
									</label>
									<p className="font-bold">Študent</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
					<Button className="pt-4 ml-4 mt-8" variant={"link"} type="button" onClick={() => setIsEditable(!isEditable)}>
                        {isEditable ? 'Zrušiť' : 'Upraviť profil'}
                    </Button>
						<CardHeader>
							<h2 className="text-xl font-bold">Contact</h2>
							<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
								Your contact information
							</p>
						</CardHeader>
						<CardContent>
							<form className="space-y-4">
								<div className="space-y-2">
									<label
										className="text-sm font-medium leading-none"
										htmlFor="name"
									>
										Name
									</label>
									<Input
										defaultValue="Alice Smith"
										id="name"
										readOnly={!isEditable}
									/>
								</div>
								<div className="space-y-2">
									<label
										className="text-sm font-medium leading-none"
										htmlFor="email"
									>
										Email
									</label>
									<Input
										defaultValue="alice.smith@example.com"
										id="email"
										readOnly={!isEditable}
									/>
								</div>
								<div className="space-y-2">
									<label
										className="text-sm font-medium leading-none"
										htmlFor="phone"
									>
										Phone
									</label>
									<Input id="phone" placeholder="Phone" />
								</div>
								<div className="space-y-2">
									<label
										className="text-sm font-medium leading-none"
										htmlFor="address"
										
									>
										Address
									</label>
									<Input readOnly={!isEditable} id="address" placeholder="Address" />
								</div>
								<Button type="submit">Save</Button>
							</form>
						</CardContent>
					</Card>

				</div>
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<h2 className="text-xl font-bold">
								Borrowed Books
							</h2>
							<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
								Books you have borrowed
							</p>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<div className="flex items-center space-x-4">
									<img
										alt="Book cover"
										className="aspect-[4/5] rounded-lg object-cover"
										height={110}
										src="/placeholder.svg"
										width={80}
									/>
									<div className="grid gap-1.5">
										<h3 className="text-lg font-bold">
											To Kill a Mockingbird
										</h3>
										<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
											Harper Lee
										</p>
										<p className="text-sm font-medium leading-none">
											Due: 2023-05-15
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<img
										alt="Book cover"
										className="aspect-[4/5] rounded-lg object-cover"
										height={110}
										src="/placeholder.svg"
										width={80}
									/>
									<div className="grid gap-1.5">
										<h3 className="text-lg font-bold">
											1984
										</h3>
										<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
											George Orwell
										</p>
										<p className="text-sm font-medium leading-none">
											Due: 2023-05-15
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<img
										alt="Book cover"
										className="aspect-[4/5] rounded-lg object-cover"
										height={110}
										src="/placeholder.svg"
										width={80}
									/>
									<div className="grid gap-1.5">
										<h3 className="text-lg font-bold">
											The Great Gatsby
										</h3>
										<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
											F. Scott Fitzgerald
										</p>
										<p className="text-sm font-medium leading-none">
											Due: 2023-05-15
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ProfileWrapper;
