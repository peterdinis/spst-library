"use client";

import { format } from "date-fns";
import { Copy, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FC, type Key, useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import useAdminCookie from "~/hooks/useAdminCookie";
import { useCopyToClipboard } from "~/hooks/useCopy";
import useStudentCookie from "~/hooks/useStudentCookie";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import LongText from "../shared/LongText";

const BookingModal = dynamic(() => import("../booking/BookingModal"), {
	ssr: false,
});

const BookSheets = dynamic(() => import("./BookSheets"), {
	ssr: false,
});

const BookDetail: FC = () => {
	const { id } = useParams();
	const teacherCookie = useTeacherCookie();
	const adminCookie = useAdminCookie();
	const studentCookie = useStudentCookie();
	//@ts-ignore
	const [_, copy] = useCopyToClipboard();

	const { data, isLoading, isError } = api.book.fetchBookById.useQuery({
		id: Number(id),
	});

	const isAvailable = data?.isAvaiable;

	const bookDetails = useMemo(() => {
		if (!data) return null;

		return (
			<div
				key={id as unknown as Key}
				className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10"
			>
				<div>
					<h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
						<span className="font-bold">Názov</span>:{" "}
						<span onClick={() => copy(data.name)}>{data.name}</span>
					</h1>
				</div>
				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Krátky popis: </div>
					<LongText text={data.description} maxLength={30} />
				</div>
				<p className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<span className="font-bold">Autor / ka</span>:{" "}
					{data.author?.name}
				</p>
				<p className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<span className="font-bold">Kategória</span>:{" "}
					{data.category?.name}
				</p>
				<p className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<span className="font-bold">Rok</span>:{" "}
					{format(data.year, "dd-MM-yyyy")}
				</p>
				<p className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<span className="font-bold">Počet Strán</span>: {data.pages}
				</p>
				<p className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<span className="font-bold">Počet Kusov</span>:{" "}
					{data.itemsInStock}
				</p>
				<div>
					<p className="mb-4 mt-3 text-2xl font-light dark:text-blue-50 leading-relaxed">
						<span className="font-bold">Kniha je:</span>
						{isAvailable ? (
							<Badge
								className="ml-4 bg-green-500 text-sm text-white"
								variant="default"
							>
								Dostupná
							</Badge>
						) : (
							<Badge
								variant="destructive"
								className="text-sm text-white ml-4"
							>
								Nedostupná
							</Badge>
						)}
						<br />
					</p>
				</div>
				<hr className="mt-6" />
				<div className="flex">
					<Button variant="default" size="lg" className="mt-5">
						<Link href="/books">Návrat na knihy</Link>
					</Button>
					{(studentCookie || teacherCookie || adminCookie) && (
						<Button
							variant="secondary"
							size="lg"
							className="ml-4 mt-5"
							disabled={!isAvailable}
						>
							<BookingModal />
						</Button>
					)}
				</div>
				<hr className="mt-6" />
				{(teacherCookie || adminCookie) && (
					<BookSheets data={data} name={data.name} />
				)}
			</div>
		);
	}, [data, teacherCookie, adminCookie, studentCookie, isAvailable, copy]);

	if (isLoading) {
		return <Loader2 className="animate-spin" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Kniha pod týmto id neexistuje"
				linkHref="/books"
				linkText="Zoznam všetkých kníh"
			/>
		);
	}

	return (
		<>
			<Header text="Detail knihy" />
			<section className="body-font mt-2 overflow-hidden dark:bg-background bg-white text-gray-700">
				<div className="container mx-auto px-5 py-12">
					<div className="mx-auto flex flex-wrap lg:w-4/5">
						<Image
							width={400}
							height={400}
							loading="lazy"
							alt={data?.name!}
							className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
							src={data?.image!}
						/>
						{bookDetails}
					</div>
				</div>
			</section>
		</>
	);
};

export default BookDetail;
