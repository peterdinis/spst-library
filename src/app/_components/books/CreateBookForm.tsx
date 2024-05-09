"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import AuthorSelect from "../authors/AuthorSelect";
import CategorySelect from "../categories/CategorySelect";
import PublisherSelect from "../publishers/PublisherSelect";
import { useToast } from "~/components/ui/use-toast";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const AppEditor = dynamic(() => import("../shared/AppEditor"), { ssr: false });

const CreateBookForm: FC = () => {
	const {toast} = useToast();
	const router = useRouter();

	const {register, handleSubmit, reset, formState: {errors}} = useForm();

	const addNewBookMut = api.book.createNewBook.useMutation({
		onSuccess: () => {
			toast({
				title: "Nová kniha bola vytvorená",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			router.push("/books");
		},

		onError: () => {
			toast({
				title: "Nová kniha nebola vytvorená",
				duration: 2000,
				className: "bg-red-500 text-white",
			});
		}
	});


	const onSubmit = async(data: FieldValues) => {
		await addNewBookMut.mutateAsync({
			name: data.name,
			description: data.description,
			image: data.image,
			year: data.year,
			pages: data.pages,
			isAvaiable: data.isAvaiable,
			itemsInStock: data.itemsInStock,
			categoryId: data.categoryId,
			authorId: data.authorId,
			publisherId: data.publisherId
		});
		reset();
	}

	return (
		<>
			<Header text="Tvorba novej knihy" />
			<form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 max-w-2xl">
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno Knihy"
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Obrázok"
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<AuthorSelect />
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Rok"
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Počet strán"
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Dostupná"
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Počet kusov"
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<CategorySelect />
				</div>

				<div className="group relative z-0 mb-6">
					<PublisherSelect />
				</div>

				<div className="group relative z-0 mb-6">
					<AppEditor />
				</div>

				<div className="flex justify-center align-top">
					<Button variant={"default"} size={"lg"}>
						Pridaj novú knihu
					</Button>
				</div>
			</form>
		</>
	);
};

export default CreateBookForm;
