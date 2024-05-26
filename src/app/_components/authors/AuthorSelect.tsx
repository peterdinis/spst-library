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

interface IAuthorSelectProps {
	onChange: (...args: unknown[]) => void;
	value: string;
}

const AuthorSelect: FC<IAuthorSelectProps> = ({ onChange, value }) => {
	const { data, isLoading, isError } = api.author.fetchAuthors.useQuery();

	if (isLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	if (isError) {
		return (
			<div className="mt-6 flex justify-center align-top">
				<Ghost className="h-8 w-8 animate-bounce" />{" "}
				<span className="font-bold">
					Žiadny spisovatelia neboli nájdený
				</span>
			</div>
		);
	}

	return (
		<section className="peer mt-4 block w-full appearance-none bg-transparent px-0 py-2.5 text-lg text-gray-900 dark:text-blue-50 focus:outline-none focus:ring-0">
			<Select onValueChange={onChange} value={value}>
				<SelectTrigger>
					<SelectValue placeholder="Výber spisovateľa/ky" />
				</SelectTrigger>
				<SelectContent>
					{data &&
						data.map((author) => (
							<SelectItem
								key={author.id}
								value={author.id.toString()}
							>
								{author.name}
							</SelectItem>
						))}
				</SelectContent>
			</Select>
		</section>
	);
};

export default AuthorSelect;
