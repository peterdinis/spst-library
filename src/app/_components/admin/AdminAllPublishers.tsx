"use client";

import { Loader2 } from "lucide-react";
import { FC } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { columns, Publisher } from "./columns/publisherColumns";

const AdminAllPublishers: FC = () => {
	const { data, isLoading, isError } =
		api.publisher.fetchPublishers.useQuery();

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Vydavateľstvá neboli nájdené"
				linkHref="/admin/publishers"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých vydavateľstiev" />
			<DataTable
				columns={columns}
				data={data as unknown as Publisher[]}
			/>
		</div>
	);
};

export default AdminAllPublishers;
