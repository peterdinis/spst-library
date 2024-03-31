import { Loader2, Ghost } from "lucide-react";
import { FC } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

const AuthorSelect: FC = () => {
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
		<section className="peer mt-4 block w-full appearance-none bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0">
			<Select>
				<SelectTrigger>
					<SelectValue placeholder="Výber spisovateľa/ky" />
				</SelectTrigger>
				<SelectContent>
					{data &&
						data.map((item) => {
							return (
								<SelectItem
									value={item.name} // TODO: Premyslieť ako podľa id-čka vybrať daného autora
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

export default AuthorSelect;
