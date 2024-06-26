"use client";

import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { Author } from "~/app/types/tableTypes";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { columns } from "./columns/authorColumns";

const AdminAllAuthors: FC = () => {
	const { data, isLoading, isError } = api.author.fetchAuthors.useQuery();

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
				message="Spisovatelia neboli nájdení"
				linkHref="/admin/authors"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých spisovateľov" />
			<DataTable columns={columns} data={data as unknown as Author[]} />
		</div>
	);
};

export default AdminAllAuthors;
