import { FC } from "react";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import useStudentCookie from "~/hooks/useStudentCookie";
import { api } from "~/trpc/react";

const BorrowedBooks: FC = () => {
	
	const studentCookie = useStudentCookie();
	const {data, isLoading, isError} = api.booking.displayingMyBooking.useQuery({
		borrowerEmail: studentCookie?.email as unknown as string
	});
	
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-bold">Borrowed Books</h2>
					<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
						Books you have borrowed
					</p>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="flex items-center space-x-4">
							<img
								alt="Book cover"
								className="aspect-[4/5] rounded-lg object-cover"
								height={110}
								src="/placeholder.svg"
								width={80}
							/>
							<div className="grid gap-1.5">
								<h3 className="text-lg font-bold">
									To Kill a Mockingbird
								</h3>
								<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
									Harper Lee
								</p>
								<p className="text-sm font-medium leading-none">
									Due: 2023-05-15
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<img
								alt="Book cover"
								className="aspect-[4/5] rounded-lg object-cover"
								height={110}
								src="/placeholder.svg"
								width={80}
							/>
							<div className="grid gap-1.5">
								<h3 className="text-lg font-bold">1984</h3>
								<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
									George Orwell
								</p>
								<p className="text-sm font-medium leading-none">
									Due: 2023-05-15
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<img
								alt="Book cover"
								className="aspect-[4/5] rounded-lg object-cover"
								height={110}
								src="/placeholder.svg"
								width={80}
							/>
							<div className="grid gap-1.5">
								<h3 className="text-lg font-bold">
									The Great Gatsby
								</h3>
								<p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
									F. Scott Fitzgerald
								</p>
								<p className="text-sm font-medium leading-none">
									Due: 2023-05-15
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default BorrowedBooks;
