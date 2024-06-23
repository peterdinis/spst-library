"use client";

import { Ghost, Loader2 } from "lucide-react";
import type { FC } from "react";
import type { SelectPublisher } from "~/app/types/publisherTypes";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

interface IPublisherSelectProps {
	onChange: (...args: unknown[]) => void;
	value: string;
}

const PublisherSelect: FC<IPublisherSelectProps> = ({ onChange, value }) => {
	const { data, isLoading, isError } =
		api.publisher.fetchPublishers.useQuery();

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
					<SelectValue placeholder="Výber vydavateľstva" />
				</SelectTrigger>
				<SelectContent>
					{data?.map((publisher: SelectPublisher) => {
						return (
							<SelectItem
								key={publisher.id}
								value={publisher.id.toString()}
							>
								{publisher.name}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</section>
	);
};

export default PublisherSelect;
