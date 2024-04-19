"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import LongText from "../shared/LongText";

const AuthorInfo: FC = () => {
	const { id } = useParams();
	const { data, isLoading, isError } = api.author.fetchAuthorById.useQuery({
		id: Number(id),
	});

	if (isLoading) {
		return <Loader2 className="animate-spin" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Spisovateľ / ka  pod týmto id neexistuje"
			/>
		);
	}

	return (
		<>
			<Header text="Detail o spisovateľovi / ke" />
			{!isLoading ? (
				<>
					<section className="body-font mt-2 overflow-hidden dark:bg-background text-gray-700">
						<div className="container mx-auto px-5 py-12">
							<div className="mx-auto flex flex-wrap lg:w-4/5">
								<img
									alt={data && data.name}
									className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
									src={data && data.authorImage}
								/>
								<div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
									<div>
										<h1 className="title-font dark:text-blue-50 mb-1 text-4xl font-medium text-gray-900">
											<span className="font-bold">
												Meno spisovateľa/ky
											</span>
											: {data && data.name}{" "}
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
											Dátum narodenia
										</span>
										:{" "}
										{format(data?.birthYear!, "dd-MM-yyyy")}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											Literárne obdobie
										</span>
										: {data && data.litPeriod}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											{" "}
											Počet napisaných kníh
										</span>
										:{data && data.totalBooks}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											{" "}
											Názvy autorových kníh
										</span>
										:
										{data &&
											data.books.map((item) => {
												return (
													<span className="ml-3 break-words">
														{item.name}
													</span>
												);
											})}
									</p>
									{data && data.deathYear ? (
										<>
											<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
												<span className="font-bold">
													{" "}
													Dátum úmrtia
												</span>
												:{" "}
												{
													format(
														data && data.deathYear!,
														"dd-MM-yyyy",
													) as unknown as string
												}
											</p>
										</>
									) : (
										<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
											<span className="font-bold text-green-500">
												{" "}
												Spisovateľ / Spisovateľka je
												nažive
											</span>
										</p>
									)}
									<hr className="mt-6" />
									<div className="flex">
										<Button
											variant={"default"}
											size={"lg"}
											className="mt-5"
										>
											<Link href="/books">
												Návrat na zoznam spisovateľov
											</Link>
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

export default AuthorInfo;
