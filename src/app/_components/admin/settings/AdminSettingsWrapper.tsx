import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import Header from "../../shared/Header";
import SettingsWrapper from "./SettingsWrapper";

const AdminSettingsWrapper: FC = () => {
	return (
		<>
			<Header text="Iné nastavenia" />
			<div className="mt-4 text-center">
				<Button variant={"link"}>
					<Link href={"/admin/profile"}>Späť na admin profil</Link>
				</Button>
			</div>
			<div className="mt-4">
				<SettingsWrapper />
			</div>
		</>
	);
};

export default AdminSettingsWrapper;
