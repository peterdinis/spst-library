"use client";

import { Ghost, Loader2 } from "lucide-react";
import type { FC } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

interface ICategorySelectProps {
	onChange: (...args: unknown[]) => void;
	value: string;
}

const CategorySelect: FC<ICategorySelectProps> = ({ onChange, value }) => {
	const { data, isLoading, isError } =
		api.category.fetchCategories.useQuery();

	if (isLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	if (isError) {
		return (
			<div className="mt-6 flex justify-center align-top">
				<Ghost className="h-8 w-8 animate-bounce" />{" "}
				<span className="font-bold">
					Žiadne kategórie neboli nájdené
				</span>
			</div>
		);
	}

	return (
		<section className="peer mt-4 block w-full appearance-none bg-transparent px-0 py-2.5 text-lg text-gray-900 dark:text-blue-50 focus:outline-none focus:ring-0">
			<Select onValueChange={onChange} value={value}>
				<SelectTrigger>
					<SelectValue placeholder="Výber kategórie" />
				</SelectTrigger>
				<SelectContent>
					{data &&
						data.map((item) => {
							return (
								<SelectItem
									key={item.id}
									value={item.id.toString()}
								>
									{item.name}
								</SelectItem>
							);
						})}
				</SelectContent>
			</Select>
		</section>
	);
};

export default CategorySelect;
