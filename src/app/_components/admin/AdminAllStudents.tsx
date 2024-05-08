"use client";

import { Loader2 } from "lucide-react";
import { FC } from "react";
import axios from "axios";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { columns } from "./columns/studentColumns";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

const AdminAllStudents: FC = () => {
	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	if (!adminCheck) {
		router.push("/not-allowed");
	}

	const { data, isLoading, isError } = useQuery({
		queryKey: ["allStudents"],
		queryFn: () => {
			return axios.get(
				(process.env.NEXT_PUBLIC_AUTH_API as unknown as string) +
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
