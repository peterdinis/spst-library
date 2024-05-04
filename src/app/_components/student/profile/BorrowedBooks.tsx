import { Loader2 } from "lucide-react";
import { FC } from "react";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import useStudentCookie from "~/hooks/useStudentCookie";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../../shared/GlobalErrorComponent";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import ReturnBookingModal from "../../booking/ReturnBookingModal";
import ExtendedBookingModal from "../../booking/ExtendedBookingModal";

const BorrowedBooks: FC = () => {
	const studentCookie = useStudentCookie();
	const { data, isLoading, isError } =
		api.booking.displayingMyBooking.useQuery({
			userEmail: studentCookie?.email as unknown as string,
		});

	if (isLoading) {
		return <Loader2 className="animate-bounce w-8 h-8" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				message="Nepodarilo sa načítať požičané knihy"
				statusCode="404"
			/>
		);
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-bold">Moje požičané knihy</h2>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{data &&
							data.map((item) => {
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
											<Button
												size={"lg"}
												className="ml-5"
												variant={"secondary"}
											>
												<ExtendedBookingModal />
											</Button>
										</div>
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
