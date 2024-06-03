"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { columns } from "./columns/studentColumns";

const AdminAllStudents: FC = () => {
	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	const urlCheck = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_AUTH_API as unknown as string : process.env.NEXT_DEPLOY_AUTH_API as unknown as string;

	if (!adminCheck) {
		router.push("/not-allowed");
	}

	const { data, isLoading, isError } = useQuery({
		queryKey: ["allStudents"],
		queryFn: () => {
			return axios.get(
				(urlCheck) +
					"auth/users/students",
			);
		},
	});

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Študenti neboli nájdení"
				linkHref="/admin/students"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých študentov" />
			<DataTable columns={columns} data={data as any} />
		</div>
	);
};

export default AdminAllStudents;
