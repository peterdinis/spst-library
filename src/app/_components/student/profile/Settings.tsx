"use client";

import { FC, useState } from "react";
import { ICookieAuthType } from "~/app/types/authTypes";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface IStettingProps {
	studentCookie: ICookieAuthType;
}

const Settings: FC<IStettingProps> = ({ studentCookie }: IStettingProps) => {
	const [isEditable, setIsEditable] = useState(false);
	return (
		<Card>
			<Button
				className="pt-4 ml-4 mt-8"
				variant={"link"}
				type="button"
				onClick={() => setIsEditable(!isEditable)}
			>
				{isEditable ? "Zrušiť" : "Upraviť profil"}
			</Button>
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
							disabled={true}
							id="name"
							readOnly={!isEditable}
							value={studentCookie?.name}
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
							disabled={true}
							id="email"
							readOnly={!isEditable}
							value={studentCookie?.email}
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
							readOnly={!isEditable}
							id="priezvisko"
							placeholder="Priezvisko"
							value={studentCookie?.lastName}
							disabled={true}
						/>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default Settings;
