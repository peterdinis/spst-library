"use client";

import { Loader2 } from "lucide-react";
import { FC } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { columns } from "./columns/bookingColumns";

const AdminAllCategories: FC = () => {
	const { data, isLoading, isError } =
		api.booking.displayAllBooking.useQuery();

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Žiadne objednávky neboli vykonané"
				linkHref="/admin/booking"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých požičaných kníh" />
			<DataTable columns={columns} data={data} />
		</div>
	);
};

export default AdminAllCategories;
