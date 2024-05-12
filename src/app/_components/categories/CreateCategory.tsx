"use client"

import { FC } from "react";
import Header from "../shared/Header";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useForm, FieldValues } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

const CreateCategory: FC = () => {
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const addCategoryMut = api.category.createCategory.useMutation({
		onSuccess: () => {
			toast({
				title: "Nová kategória bola vytvorená",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			router.push("/categories");
		},

		onError: () => {
			toast({
				title: "Nová kategória nebola vytvorená",
				duration: 2000,
				className: "bg-red-500 text-white",
			});
		},
	});

	const onSubmit = async (data: FieldValues) => {
		await addCategoryMut.mutateAsync({
			name: data.name,
			description: data.description,
		});
		reset();
	};

	return (
		<>
			<Header text="Tvorba novej kategórie" />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mx-auto mt-10 max-w-2xl"
			>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno kategórie"
						{...register("name", {
							required: true,
							minLength: 5,
						})}
					/>
					{errors.name && errors.name.type === "required" && (
						<span className="text-red-500">
							Meno kategórie je povinné
						</span>
					)}
					{errors.name && errors.name.type === "minLength" && (
						<span className="text-red-500">
							Meno kategórie musí mať minimálne 5 znakov
						</span>
					)}
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 dark:text-blue-50 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Popis kategórie"
						{...register("description", {
							required: true,
							minLength: 5,
						})}
					/>
					{errors.description &&
						errors.description.type === "required" && (
							<span className="text-red-500">
								Popis kategórie je povinný
							</span>
						)}
					{errors.description &&
						errors.description.type === "minLength" && (
							<span className="text-red-500">
								Popis kategórie musí mať minimálne 5 znakov
							</span>
						)}
				</div>
				<div className="flex justify-center align-top">
					<Button variant={"default"} size={"lg"}>
						Pridaj novú kategóiu
					</Button>
				</div>
			</form>
		</>
	);
};

export default CreateCategory;
