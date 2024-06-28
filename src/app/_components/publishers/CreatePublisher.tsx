"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import Header from "../shared/Header";
import AuthWrapper from "../auth/AuthWrapper";

const CreatePublisher: FC = () => {
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const addPublisherMut = api.publisher.createPublisher.useMutation({
		onSuccess: () => {
			toast({
				title: "Bolo pridané nové vydavateľstvo",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			router.push("/publishers");
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
		reset();
	};

	return (
		<AuthWrapper>
			<Header text="Pridanie nového vydavateľstva" />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mx-auto mt-10 max-w-2xl"
			>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno"
						{...register("name", { required: true, minLength: 5 })}
					/>
					{errors.name && errors.name.type === "required" && (
						<span className="text-red-500">
							Meno vydavateľstva je povinné
						</span>
					)}

					{errors.name && errors.name.type === "minLength" && (
						<span className="text-red-500">
							Meno vydavateľstva musí mať minimálne 5 znakov
						</span>
					)}
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Krátky popis"
						{...register("description", {
							required: true,
							minLength: 5,
						})}
					/>
					{errors.description &&
						errors.description.type === "required" && (
							<span className="text-red-500">
								Pridanie popisu k vydavateľstva je povinné
							</span>
						)}

					{errors.description &&
						errors.description.type === "minLength" && (
							<span className="text-red-500">
								Popis musí mať minimálne 5 znakov
							</span>
						)}
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Obrázok"
						{...register("image", { required: true, minLength: 5 })}
					/>
					{errors.image && errors.image.type === "required" && (
						<span className="text-red-500">Obrázok je povinný</span>
					)}
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="date"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Dátum vytvorenia"
						{...register("createdDated", {
							required: true,
							valueAsDate: true,
						})}
					/>
					{errors.createdDated &&
						errors.createdDated.type === "required" && (
							<span className="text-red-500">
								Dátum je povinný
							</span>
						)}
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="checkbox"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Je akítnve"
						{...register("isActive", { required: true })}
					/>
				</div>
				<div className="group relative z-0 mb-6">
					<input
						type="text"
						className="peer mt-4 block w-full dark:text-blue-50 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Riaditeľ/ka"
						{...register("boossName", { required: true })}
					/>
					{errors.bossName && errors.bossName.type === "required" && (
						<span className="text-red-500">
							Meno majiteľa je povinné
						</span>
					)}
					{errors.name && errors.name.type === "minLength" && (
						<span className="text-red-500">
							Meno majiteľa musí mať minimálne 5 znakov
						</span>
					)}
				</div>
				<div className="flex justify-center align-top">
					<Button variant={"default"} size={"lg"}>
						Pridaj nové vydavateľstvo
					</Button>
				</div>
			</form>
		</AuthWrapper>
	);
};

export default CreatePublisher;
