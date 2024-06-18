import Image from "next/image";
import Link from "next/link";
import type { FC, Key } from "react";
import LazyLoad from "react-lazyload";
import type { IGlobalCardProps } from "~/app/types/sharedTypes";
import { Button } from "~/components/ui/button";
import { CardDescription, CardFooter, CardHeader } from "~/components/ui/card";

const GlobalCard: FC<IGlobalCardProps> = ({
	name,
	description,
	id,
	linkName,
	image,
}) => {
	return (
		<LazyLoad height={500} once>
			<div key={id as unknown as Key} className="ml-4">
				{image ? (
					<>
						<Image
							src={image}
							alt={name}
							width={400}
							height={400}
							loading="lazy"
							className="h-80 w-72 rounded-t-xl object-cover"
						/>
					</>
				) : (
					<></>
				)}
				<div className="z-50 w-72 px-4 py-3">
					<CardHeader className="mr-3 text-lg font-bold uppercase text-gray-400">
						{name}
					</CardHeader>
					{!description ? (
						<></>
					) : (
						<CardDescription className="block dark:text-blue-50 truncate text-sm font-bold capitalize text-black">
							{description}
						</CardDescription>
					)}
					<CardFooter>
						<div className="flex items-center p-4">
							<Button variant={"default"} size={"lg"}>
								<Link href={`/${linkName}/${id}`}>Detail</Link>
							</Button>
						</div>
					</CardFooter>
				</div>
			</div>
		</LazyLoad>
	);
};

export default GlobalCard;
