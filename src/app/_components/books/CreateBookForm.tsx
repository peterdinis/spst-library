"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const CreateBookForm: FC = () => {
	return (
		<>
			<Header text="Tvorba novej knihy" />
			<form className="mx-auto mt-10 max-w-2xl">
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno Knihy"
					/>
				</div>
				{/* <div className="group relative z-0 mb-6">
					<Editor />
				</div> */}
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Obrázok"
					/>
				</div>
				{/* Select shadcn ui neskôr */}
				<div className="group relative z-0 mb-6">
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Meno autora"
					/>
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
					<Input
						type="text"
						className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
						placeholder="Kategória"
					/>
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
