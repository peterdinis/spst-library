"use client";

import Cookie from "js-cookie";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC} from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { type Booking, columns } from "./columns/bookingColumns";

const AdminAllCategories: FC = () => {
	const { data, isLoading, isError } =
		api.booking.displayAllBooking.useQuery();

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
