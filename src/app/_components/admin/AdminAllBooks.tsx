"use client";

import Cookie from "js-cookie";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { type Book, columns } from "./columns/bookColumns";

const AdminAllBooks: FC = () => {
	const { data, isLoading, isError } = api.book.fetchBooks.useQuery();

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
				message="Knihy neboli nájdené"
				linkHref="/admin/books"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých kníh" />
			<DataTable columns={columns} data={data as unknown as Book[]} />
		</div>
	);
};

export default AdminAllBooks;
