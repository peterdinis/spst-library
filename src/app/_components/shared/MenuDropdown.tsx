"use client";

import Link from "next/link";
import type { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface IMenuDropdownProps {
	profileLink: string;
	logoutFn: (...args: unknown[]) => void;
	children?: ReactNode;
}

const MenuDropdown: FC<IMenuDropdownProps> = ({
	profileLink,
	logoutFn,
	children,
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Profil</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel className="flex justify-center align-top">Môj účet</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link className="font-bold text-base prose prose-a:" href={profileLink}>
							Profil
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Button onClick={logoutFn} variant={"ghost"} size={"sm"}>
						Odhlásiť sa
					</Button>
				</DropdownMenuItem>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MenuDropdown;
