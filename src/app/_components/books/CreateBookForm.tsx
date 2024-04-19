"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import AuthorSelect from "../authors/AuthorSelect";
import {useForm, FieldValues} from "react-hook-form";
import CategorySelect from "../categories/CategorySelect";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const AppEditor = dynamic(() => import("../shared/AppEditor"), { ssr: false });

const CreateBookForm: FC = () => {
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm(); 
	const router = useRouter();

	const addBookMut = api.book.createNewBook.useMutation({
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

	})

	const onSubmit = async (data: FieldValues) => {
		await addBookMut.mutateAsync({
			name: data.name,
			description: data.description,
			image: data.image,
			year: data.year,
			pages: data.pages,
			isAvaiable: data.isAvaiable,
			itemsInStock: data.itemsInStock,
			categoryId: data.categoryId,
			authorId: data.authorId,
			publisherId: data.publisherId,
		});
		reset();
	};

	return (
		<div>
			<Header text="Tvorba novej knihy" />
			<form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-10 max-w-2xl">
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno Knihy"
						{...register("name", {
							required: true,
							minLength: 5, // Mala byť minLength namiesto min
						})}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Obrázok"
						{...register("image", {
							required: true,
							minLength: 5, // Mala byť minLength namiesto min
						})}
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
						{...register("year", {
							valueAsDate: true,
							required: true,
						})}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Počet strán"
						{...register("pages", {
							valueAsNumber: true,
							required: true,
							minLength: 5, // Mala byť minLength namiesto min
						})}
					/>
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>Je kniha dostupná</TooltipTrigger>
						<TooltipContent>
							<p className="font-bold text-gray-800 p-2 text-lg">
								Ak áno kliknúť na checkbox ak nie nerobiť tu nič
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<div className="group relative z-0 mb-6">
					<Input
						type="checkbox"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						{...register("isAvaiable", {
							required: true,
							minLength: 5, // Mala byť minLength namiesto min
						})}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Počet kusov"
						{...register("itemsInStock", {
							valueAsNumber: true,
							required: true,
							minLength: 5, // Mala byť minLength namiesto min
						})}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<CategorySelect />
				</div>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>Krátke info</TooltipTrigger>
						<TooltipContent>
							<p className="font-bold text-gray-800 p-2 text-lg">
								V tomto editore môžte napísať krátke informácie
								o knihe. Max 200 riadkov
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<div className="group relative z-0 mb-6">
					<AppEditor />
				</div>

				<div className="flex justify-center align-top">
					<Button variant={"default"} size={"lg"}>
						Pridaj novú knihu
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateBookForm;
