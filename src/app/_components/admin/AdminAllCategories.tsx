"use client";

import { Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { columns } from "./columns/categoryColumns";
import { Category } from "~/app/types/categoryTypes";
import useAdminCookie from "~/hooks/useAdminCookie";
import { useRouter } from "next/navigation";

const AdminAllCategories: FC = () => {
	const { data, isLoading, isError } =
		api.category.fetchCategories.useQuery();

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	const router = useRouter();
	const adminCookie = useAdminCookie();

	useEffect(() => {
		if(!adminCookie) {
			router.push("/not-allowed");
		}
	}, [adminCookie]);

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Kategórie nenájdené"
				linkHref="/admin/categories"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých kategórií" />
			<DataTable columns={columns} data={data as unknown as Category[]} />
		</div>
	);
};

export default AdminAllCategories;
