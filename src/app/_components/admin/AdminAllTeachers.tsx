"use client";

import { Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import axios from "axios";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { columns } from "./columns/studentColumns";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAdminCookie from "~/hooks/useAdminCookie";

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
	const adminCookie = useAdminCookie();

	useEffect(() => {
		if(!adminCookie) {
			router.push("/not-allowed");
		}
	}, [adminCookie]);

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
