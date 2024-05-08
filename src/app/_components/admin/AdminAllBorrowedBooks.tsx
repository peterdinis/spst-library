"use client";

import { Loader2 } from "lucide-react";
import { FC, useEffect } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import { DataTable } from "../shared/GlobalTable";
import { Booking, columns } from "./columns/bookingColumns";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie"

const AdminAllCategories: FC = () => {
	const { data, isLoading, isError } =
		api.booking.displayAllBooking.useQuery();

	const router = useRouter();
	const adminCheck = Cookie.get("isAdminLogin");

	if(!adminCheck) {
		router.push("/not-allowed");
	}

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
			<DataTable columns={columns} data={data as unknown as Booking[]} />
		</div>
	);
};

export default AdminAllCategories;
