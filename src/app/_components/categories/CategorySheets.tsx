"use client";

import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FC, type FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import SheetHelper from "../shared/SheetHelper";

interface ICategorySheetsProps {
	name: string;
	data: Category;
}

const CategorySheets: FC<ICategorySheetsProps> = ({
	name,
	data,
}: ICategorySheetsProps) => {
	const deleteCategoryMut = api.category.deleteCategory.useMutation();
	const updateCategoryMut = api.category.updateCategory.useMutation();
	const { toast } = useToast();
	const router = useRouter();

	const [categoryName, setCategoryName] = useState(data?.name || "");
	const [categoryDescription, setCategoryDescription] = useState(
		data?.description || "",
	);

	const deleteCategoryFn = async (e: FormEvent) => {
		e.preventDefault();

		await deleteCategoryMut.mutateAsync({
			id: data?.id,
		});

		toast({
			title: "Kategória bola úspešne zmazaná",
			duration: 2000,
			className: "bg-green-500",
		});
		router.push("/categories");
	};

	const updateCategoryFn = async (e: FormEvent) => {
		e.preventDefault();

		await updateCategoryMut.mutateAsync({
			id: data?.id,
			name: categoryName,
			description: categoryDescription,
		});

		toast({
			title: "Kategória bola úspešne upravená",
			duration: 2000,
			className: "bg-green-500",
		});
		router.push("/categories");
	};

	return (
		<div className="flex mt-5">
			<SheetHelper
				variantProp="default"
				title={"Upraviť kategóriu"}
				secondTitle={"Upraviť kategóriu"}
			>
				<span className="mt-2 font-bold text-xl">
					Úprava kategórie: {name}
				</span>
				<div>
					<form onSubmit={updateCategoryFn}>
						<Input
							type="text"
							className="mt-5"
							placeholder="Meno"
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Popis"
							value={categoryDescription}
							onChange={(e) =>
								setCategoryDescription(e.target.value)
							}
						/>

						<Button
							className="mt-6"
							variant={"secondary"}
							size={"lg"}
							type="submit"
						>
							Upraviť kategóriu
						</Button>
					</form>
				</div>
			</SheetHelper>
			<div className="ml-4">
				<SheetHelper
					variantProp="outline"
					title="Zmazať kategóriu"
					secondTitle="Chcete zmazať kategóriu"
				>
					<span className="mt-2 font-bold text-xl">
						Chcete zmazať kategóriu: {name}
					</span>
					<div className="p-5 mt-5">
						<form onSubmit={deleteCategoryFn}>
							<Button variant={"destructive"} size={"lg"}>
								Zmazať
							</Button>
						</form>
					</div>
				</SheetHelper>
			</div>
		</div>
	);
};

export default CategorySheets;
