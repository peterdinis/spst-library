"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { urlCheck } from "~/app/_constants/api";
import type { Student } from "~/app/types/tableTypes";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { columns } from "./columns/studentColumns";

const AdminAllTeachers: FC = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["allTeachers"],
		queryFn: () => {
			return axios.get(urlCheck + "auth/users/teachers");
		},
	});

	const router = useRouter();
	const adminCheck = getCookie("isAdminLogin");

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
			<DataTable columns={columns} data={data as unknown as Student[]} />
		</div>
	);
};

export default AdminAllTeachers;
