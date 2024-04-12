"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useForm, FieldValues } from "react-hook-form";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const CreatePublisher: FC = () => {
	const { toast } = useToast();

	const { register, handleSubmit, reset } = useForm();

	const router = useRouter();

	const addPublisherMut = api.publisher.createPublisher.useMutation({
		onSuccess: () => {
			toast({
				title: "Bolo pridané nové vydavateľstvo",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			router.push("/categories");
		},

		onError: () => {
			toast({
				title: "Nepodarilo sa vyytvotriť nové vydavateľstvo",
				duration: 2000,
				className: "bg-red-500 text-white",
			});
		},
	});

	const onSubmit = async (data: FieldValues) => {
		await addPublisherMut.mutateAsync({
			name: data.name,
			image: data.image,
			description: data.description,
			createdDated: format(data.createdDated, "dd-MM-yyyy"),
			isActive: data.isActive,
			bossName: data.bossName,
		});
	};

	return (
		<>
			<Header text="Pridanie nového vydavateľstva" />
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
						placeholder="Obrázok"
						{...register("image", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="date"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Dátum vytvorenia"
						{...register("createdDated", {
							required: true,
							valueAsDate: true,
						})}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="checkbox"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Je akítnve"
						{...register("isActive", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Riaditeľ/ka"
						{...register("boossName", { required: true })}
					/>
				</div>
				<div className="flex justify-center align-top">
					<Button variant={"default"} size={"lg"}>
						Pridaj nové vydavateľstvo
					</Button>
				</div>
			</form>
		</>
	);
};

export default CreatePublisher;
