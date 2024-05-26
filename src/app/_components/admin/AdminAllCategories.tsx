"use client";

import Cookie from "js-cookie";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import type { Category } from "~/app/types/categoryTypes";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { columns } from "./columns/categoryColumns";

const AdminAllCategories: FC = () => {
	const { data, isLoading, isError } =
		api.category.fetchCategories.useQuery();

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	if (!adminCheck) {
		router.push("/not-allowed");
	}

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
