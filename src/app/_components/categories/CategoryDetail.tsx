"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Header from "../shared/Header";
import CategorySheets from "./CategorySheets";
import { Category } from "@prisma/client";

const CategoryDetail: FC = () => {
	const { id } = useParams();
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
			/>
		);
	}

	return (
		<>
			<Header text="Detail kategórie" />
			<div className="mt-6 overflow-hidden dark:bg-card bg-white shadow sm:rounded-lg">
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

			<CategorySheets data={data as unknown as Category} name={data?.name!} />
		</>
	);
};

export default CategoryDetail;
