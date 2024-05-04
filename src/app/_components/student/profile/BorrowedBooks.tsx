"use client";

import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import useStudentCookie from "~/hooks/useStudentCookie";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../../shared/GlobalErrorComponent";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import ReturnBookingModal from "../../booking/ReturnBookingModal";
import { IBorrowedBookingTypes } from "~/app/types/bookingTypes";
import GlobalPagination from "../../shared/GlobalPagination";

const BorrowedBooks: FC = () => {
	const [page, setPage] = useState(0);

	const limit = 6 as const;
	const studentCookie = useStudentCookie();

	const {
		data: paginatedData,
		fetchNextPage,
		isFetchingNextPage,
		isLoading: paginatedLoading,
		isError: paginatedError,
	} = api.booking.paginatedBoooking.useInfiniteQuery(
		{
			limit,
			userEmail: studentCookie?.email as unknown as string,
		},
		{
			//@ts-ignore
			getNextPageParam: (lastPage: { nextCursor: any }) =>
				lastPage.nextCursor,
		},
	);

	if (isFetchingNextPage || paginatedLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	if (paginatedError) {
		return (
			<GlobalErrorComponent
				message="Nepodarilo sa načítať požičané knihy"
				statusCode="404"
				linkHref="/student/profile"
				linkText="Načítať znova"
			/>
		);
	}

	const toShow = paginatedData?.pages[page]?.items;
	const nextCursor = paginatedData?.pages[page]?.nextCursor;

	const handleFetchNextPage = async () => {
		await fetchNextPage();
		setPage((prev) => prev + 1);
	};

	const handleFetchPreviousPage = () => {
		setPage((prev) => prev - 1);
	};

	console.log("To show", toShow);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-bold">Moje požičané knihy</h2>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{!paginatedLoading &&
							toShow &&
							toShow.map((item: IBorrowedBookingTypes) => {
								return (
									<>
										<div className="flex items-center space-x-4">
											<div className="grid gap-1.5">
												<h3 className="text-lg font-bold">
													{item.bookName}
												</h3>
												<p className="text-sm font-medium leading-none">
													Od:{" "}
													{format(
														item.from,
														"dd-MM-yyyy",
													)}
												</p>
												<p className="text-sm font-medium leading-none">
													Do:{" "}
													{format(
														item.to,
														"dd-MM-yyyy",
													)}
												</p>
											</div>
											<Button
												size={"lg"}
												className="ml-5"
												variant={"default"}
											>
												<ReturnBookingModal />
											</Button>
										</div>
										<GlobalPagination
											handleFetchNextPage={
												handleFetchNextPage
											}
											page={page}
											nextCursor={
												nextCursor as unknown as number
											}
											handleFetchPreviousPage={
												handleFetchPreviousPage
											}
										/>
									</>
								);
							})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default BorrowedBooks;
