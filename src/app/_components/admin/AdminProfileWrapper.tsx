"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { Settings, ShieldCheck, ShieldBan } from "lucide-react";
import AdminRemoveRightsModal from "./settings/modals/AdminRemoveRightsModal";
import AdminRightsModal from "./settings/modals/AdminRightsModal";
import DeactivateAccountModal from "./settings/modals/DeactivateAccountModal";
import RemoveAccountModal from "./settings/modals/RemoveAccountModal";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";

const items = [
	{
		title: "Nastaviť admin práva emailu",
		description: "Tu sa nastavuju admin práva pre učiteľský účet",
		icon: <Settings className="h-4 w-4 text-neutral-500" />,
		button: <AdminRightsModal />,
	},
	{
		title: "Vymazať účet",
		description: "Vymazanie jedného účtu",
		icon: <ShieldCheck className="h-4 w-4 text-neutral-500" />,
		button: <RemoveAccountModal />,
	},
	{
		title: "Dekativovať účet",
		description: "Deaktivovanie jedného účtu",
		icon: <ShieldBan className="h-4 w-4 text-neutral-500" />,
		button: <DeactivateAccountModal />,
	},
	{
		title: "Odobrať admin práva",
		description: "Tu sa odoberajú admin práva.",
		icon: <Settings className="h-4 w-4 text-neutral-500" />,
		button: <AdminRemoveRightsModal />,
	},
];

const AdminProfileWrapper: FC = () => {
	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	if (!adminCheck) {
		router.push("/not-allowed");
	}
	return (
		<>
			<Header text="Admin časť" />
			<BentoGrid className="mt-12 max-w-4xl mx-auto">
			{items.map((item, i) => (
				<BentoGridItem
					key={i}
					title={item.title}
					description={item.description}
					icon={item.icon}
					button={item.button}
					className={i === 3 || i === 6 ? "md:col-span-2" : ""}
				/>
			))}
		</BentoGrid>
		</>
	);
};

export default AdminProfileWrapper;
