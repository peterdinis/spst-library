"use client";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { FC, Key } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import useAdminCookie from "~/hooks/useAdminCookie";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import LongText from "../shared/LongText";
import PublisherSheets from "./PublisherSheets";

const PublisherInfo: FC = () => {
	const { id } = useParams();
	const teacherCookie = useTeacherCookie();
	const adminCookie = useAdminCookie();
	const { data, isLoading, isError } =
		api.publisher.fetchPublisherById.useQuery({
			id: Number(id),
		});

	if (isLoading) {
		return <Loader2 className="animate-spin" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Vydavateľstvo pod týmto id neexistuje"
				linkHref="/publishers"
				linkText="Zoznam všetkých vydavateľstiev"
			/>
		);
	}

	return (
		<>
			<Header text="Detail o vydavateľstve" />
			{!isLoading ? (
				<>
					<section key={id as unknown as Key} className="body-font mt-2 overflow-hidden dark:bg-background text-gray-700">
						<div className="container mx-auto px-5 py-12">
							<div className="mx-auto flex flex-wrap lg:w-4/5">
								<Image
									alt={data?.name!}
									className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
									src={data?.image!}
									width={400}
									height={400}
									loading="lazy"
								/>
								<div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
									<div>
										<h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
											<span className="font-bold">
												Názov
											</span>
											: {data && data.name}{" "}
										</h1>
									</div>
									<div>
										<div className="title-font mb-1 mt-5 text-4xl font-medium dark:text-blue-50 text-gray-900">
											<span className="font-bold">
												Knihy
											</span>
											:{" "}
											{data &&
												data.books.map((item) => {
													return <>{item.name}</>;
												})}
										</div>
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
											Dátum založenia
										</span>
										:{" "}
										{format(
											data?.createdDated!,
											"dd-MM-yyyy",
										)}
									</p>
									<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
										<span className="font-bold">
											Riaditeľ
										</span>
										: {data && data.bossName}
									</p>

									{data && data.isActive === true ? (
										<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
											<span className="font-bold">
												Vydavateľstvo je
											</span>
											:{" "}
											<Badge className="bg-green-500 ml-4 text-white text-sm">
												Aktívne
											</Badge>
										</p>
									) : (
										<p className="mb-4 mt-3 text-2xl font-light  leading-relaxed dark:text-blue-50 text-gray-800">
											<span className="font-bold">
												Vydavateľstvo je:
											</span>
											:{" "}
											<Badge
												variant={"destructive"}
												className="ml-4 text-white text-sm"
											>
												Neaktívne:{" "}
												{
													format(
														data?.endDate!,
														"dd-MM-yyyy",
													) as unknown as string
												}
											</Badge>
										</p>
									)}
									<hr className="mt-6" />
									<div className="flex">
										<Button
											variant={"default"}
											size={"lg"}
											className="mt-5"
										>
											<Link href="/publishers">
												Návrat na zoznam vydavateľstiev
											</Link>
										</Button>
									</div>
									<br />
									<hr />
									{teacherCookie || adminCookie ? (
										<>
											<PublisherSheets
												name={data?.name!}
												data={data as any}
											/>
										</>
									) : (
										<></>
									)}
								</div>
							</div>
						</div>
					</section>
				</>
			) : null}
		</>
	);
};

export default PublisherInfo;
