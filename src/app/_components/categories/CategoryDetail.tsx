"use client";

import type { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { FC, Key } from "react";
import { Button } from "~/components/ui/button";
import useAdminCookie from "~/hooks/useAdminCookie";
import useTeacherCookie from "~/hooks/useTeacherCookie";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Header from "../shared/Header";
import CategorySheets from "./CategorySheets";

const CategoryDetail: FC = () => {
	const { id } = useParams();
	const teacherCookie = useTeacherCookie();
	const adminCookie = useAdminCookie();
	const { data, isLoading, isError } =
		api.category.fetchCategoryById.useQuery({
			id: Number(id),
		});

	if (isLoading) {
		return <Loader2 className="animate-spin" />;
	}

	if (isError) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Kategória pod týmto id neexistuje"
				linkHref="/categories"
				linkText="Zoznam všetkých kategórií"
			/>
		);
	}

	return (
		<>
			<Header text="Detail kategórie" />
			<div
				key={id as unknown as Key}
				className="mt-6 overflow-hidden dark:bg-card bg-white shadow sm:rounded-lg"
			>
				<div className="dark:text-blue-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt className="text-sm font-medium text-gray-500 dark:text-blue-50">
						Meno kategórie
					</dt>
					<dd className="mt-1 text-sm dark:text-blue-50 text-gray-900 sm:col-span-2 sm:mt-0">
						{data && data.name}{" "}
					</dd>
				</div>
				<div className="dark:text-blue-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt className="text-sm font-medium text-gray-500 dark:text-blue-50">
						Popis kategórie
					</dt>
					<dd className="mt-1 text-sm dark:text-blue-50 text-gray-900 sm:col-span-2 sm:mt-0">
						{data && data.description}
					</dd>
				</div>
				<div className="dark:text-blue-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt className="text-sm font-medium text-gray-500 dark:text-blue-50">
						Knihy ktoré májú danú kategóriu
					</dt>
					<dd className="mt-1 text-sm dark:text-blue-50 text-gray-900 sm:col-span-2 sm:mt-0">
						{data &&
							data.books.map((item) => {
								return <>{item.name}</>;
							})}
					</dd>
				</div>

				<Button className="mt-5" variant={"destructive"} size={"lg"}>
					<Link href="/categories">Späť na kategórie</Link>
				</Button>
			</div>

			{teacherCookie ?? adminCookie ? (
				<CategorySheets
					data={data as unknown as Category}
					name={data!.name as unknown as string}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default CategoryDetail;
