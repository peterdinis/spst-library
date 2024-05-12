"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import DashboardLinks from "./dashboard/DashboardLinks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import DashboardCards from "./dashboard/DashboardCards";

const AdminProfileWrapper: FC = () => {
	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	if (!adminCheck) {
		router.push("/not-allowed");
	}
	return (
		<>
			<Header text="Admin časť" />
			<div className="flex flex-col min-h-screen w-full">
				<main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
					<div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
						<DashboardLinks />
						<DashboardCards />
					</div>
				</main>
			</div>
		</>
	);
};

export default AdminProfileWrapper;
