"use client";

import Link from "next/link";
import { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface IMenuDropdownProps {
	profileLink: string;
	logoutFn: (...args: unknown[]) => void | Function;
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
				<DropdownMenuLabel>Môj účet</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Môj profil
						<DropdownMenuShortcut>
							<Link href={profileLink!}>Profil</Link>
						</DropdownMenuShortcut>
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
