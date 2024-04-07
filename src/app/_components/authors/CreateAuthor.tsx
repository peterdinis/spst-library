"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

const CreateAuthor: FC = () => {
	const { toast } = useToast();

	const { register, handleSubmit, reset } = useForm();
	const router = useRouter();
	const addAuthorMut = api.author.createNewAuthor.useMutation({
		onSuccess: () => {
			toast({
				title: "Bol pridaný/á nový/á spisovateľ/ka",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			router.push("/categories");
		},

		onError: () => {
			toast({
				title: "Nepodarilo sa vytvoriť spisovateľa/ku",
				duration: 2000,
				className: "bg-red-500 text-white",
			});
		},
	});

	const onSubmit = async (data: any) => {
		await addAuthorMut.mutateAsync({
			name: data.name,
			description: data.description,
			deathYear: data.deathYear || null,
			birthYear: data.birthYear,
			litPeriod: data.litPeriod,
			authorImage: data.authorImage,
			totalBooks: Number(data.totalBooks),
		});
		reset();
	};

	return (
		<>
			<Header text="Vytvorenie nového spisovateľa/ky" />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mx-auto mt-10 max-w-2xl"
			>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno"
						{...register("name", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Krátky popis"
						{...register("description", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Rok úmrtia"
						{...register("deathYear", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Dátum narodenia"
						{...register("birthYear", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Literárne obdobie"
						{...register("litPeriod", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Obrázok"
						{...register("authorImage", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Počet kníh"
						{...register("totalBooks", {
							required: true,
							valueAsNumber: true,
						})}
					/>
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

export default CreateAuthor;
