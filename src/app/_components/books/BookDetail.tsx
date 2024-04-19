"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Copy, Loader2 } from "lucide-react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import BookingModal from "../booking/BookingModal";
import { Badge } from "~/components/ui/badge";
import LongText from "../shared/LongText";
import { useCopyToClipboard } from "~/hooks/useCopy";

const BookDetail: FC = () => {
	const { id } = useParams();
	const [_, copy] = useCopyToClipboard();
	const { data, isLoading, isError } = api.book.fetchBookById.useQuery({
		id: Number(id),
	});

	if (isLoading) {
		return <Loader2 className="animate-spin" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Kniha pod týmto id neexistuje"
			/>
		);
	}

	return (
		<>
			<Header text="Detail knihy" />
			{!isLoading ? (
				<>
					<section className="body-font mt-2 overflow-hidden dark:bg-background bg-white text-gray-700">
						<div className="container mx-auto px-5 py-12">
							<div className="mx-auto flex flex-wrap lg:w-4/5">
								<img
									alt={data && data.name}
									className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
									src={data && data.image}
								/>
								<div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
									<div>
										<h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
											<span className="font-bold">
												Názov
											</span>
											: {data && data.name}{" "}
											<Copy
												className="transform scale-10"
												onClick={() =>
													copy(data?.name!)
												}
											/>
										</h1>
									</div>
									<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
										<div className="font-bold">
											Krátky popis:{" "}
										</div>
										<LongText
											text={data?.description!}
											maxLength={30}
										/>
									</div>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											Autor / ka
										</span>
										: {data && data?.author?.name}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											Kategória
										</span>
										: {data && data?.category?.name}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold"> Rok</span>:
										{data &&
											format(data.year, "dd-MM-yyyy")}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											{" "}
											Počet Strán
										</span>
										: {data && data.pages}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											Počet Kusov
										</span>
										: {data && data.itemsInStock}
									</p>

									<div>
										<p className="mb-4 mt-3 text-2xl font-light dark:text-blue-50  leading-relaxed">
											<span className="font-bold">
												{" "}
												Kniha je:
											</span>{" "}
											{data &&
											data.isAvaiable !== true ? (
												<Badge
													variant={"destructive"}
													className="text-sm"
												>
													Nedostupná
												</Badge>
											) : (
												<Badge
													className="bg-green-500 text-sm text-white"
													variant={"default"}
												>
													Dostupná
												</Badge>
											)}
											<br />
										</p>
									</div>

									<hr className="mt-6" />
									<div className="flex">
										<Button
											variant={"default"}
											size={"lg"}
											className="mt-5"
										>
											<Link href="/books">
												Návrat na knihy
											</Link>
										</Button>
										<Button
											variant={"secondary"}
											size={"lg"}
											className="ml-4 mt-5"
										>
											<BookingModal />
										</Button>
									</div>
									<br />
								</div>
							</div>
						</div>
					</section>
				</>
			) : null}
		</>
	);
};

export default BookDetail;
