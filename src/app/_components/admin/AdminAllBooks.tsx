"use client";

import { Loader2 } from "lucide-react";
import { FC } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { columns } from "./columns/bookColumns";

const AdminAllBooks: FC = () => {
	const { data, isLoading, isError } = api.book.fetchBooks.useQuery();

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Knihy neboli nájdené"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých kníh" />
			<DataTable columns={columns} data={data} />
		</div>
	);
};

export default AdminAllBooks;
