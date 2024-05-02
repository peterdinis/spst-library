"use client";

import { FC, useState } from "react";
import { ICookieAuthType } from "~/app/types/authTypes";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface IStettingProps {
	teacherCookie: ICookieAuthType;
}

const Settings: FC<IStettingProps> = ({teacherCookie}: IStettingProps) => {
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
							defaultValue="Alice Smith"
							id="name"
							readOnly={!isEditable}
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
							readOnly={!isEditable}
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
							readOnly={!isEditable}
							id="priezvisko"
							placeholder="Priezvisko"
							value={teacherCookie?.lastName}
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
							value={teacherCookie?.lastName}
						/>
					</div>
					<Button type="submit">Uložiť</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default Settings;
