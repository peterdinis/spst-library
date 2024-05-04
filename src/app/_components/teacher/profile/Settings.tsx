"use client";

import { FC } from "react";
import { ICookieAuthType } from "~/app/types/authTypes";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface IStettingProps {
	teacherCookie: ICookieAuthType;
}

const Settings: FC<IStettingProps> = ({ teacherCookie }: IStettingProps) => {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-bold">Môj profil</h2>
			</CardHeader>
			<CardContent>
				<form className="space-y-4">
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none"
							htmlFor="name"
						>
							Meno
						</label>
						<Input
							defaultValue="Alice Smith"
							id="name"
							disabled={true}
							value={teacherCookie?.name}
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
							disabled={true}
							value={teacherCookie?.email}
						/>
					</div>
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none"
							htmlFor="priezvisko"
						>
							Priezvisko
						</label>
						<Input
							disabled={true}
							id="priezvisko"
							placeholder="Priezvisko"
							value={teacherCookie?.lastName}
						/>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default Settings;
