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

const AdminAllTeachers: FC = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["allTeachers"],
		queryFn: () => {
			return axios.get(
				(process.env.NEXT_PUBLIC_AUTH_API as unknown as string) +
					"auth/users/teachers",
			);
		},
	});

	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	if (!adminCheck) {
		router.push("/not-allowed");
	}

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Učitelia neboli nájdení"
				linkHref="/admin/teachers"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých učiteľov" />
			<DataTable columns={columns} data={data as any} />
		</div>
	);
};

export default AdminAllTeachers;
