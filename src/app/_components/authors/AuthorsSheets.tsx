"use client";

import type { Author } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FC, type FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import SheetHelper from "../shared/SheetHelper";

interface IAuthorSheetsProps {
	name: string;
	data: Author;
}

const AuthorSheets: FC<IAuthorSheetsProps> = ({
	name,
	data,
}: IAuthorSheetsProps) => {
	const updateAuthorMut = api.author.updateAuthor.useMutation();
	const deleteAuthorMut = api.author.deleteAuthor.useMutation();
	const { toast } = useToast();
	const router = useRouter();

	const [authorName, setAuthorName] = useState(data?.name ?? "");
	const [authorDeathYear, setAuthorDeathYear] = useState(
		data?.deathYear ?? ""
	);
	const [authorBirthYear, setAuthorBirthYear] = useState(
		data?.birthYear ?? ""
	);
	const [authorDescription, setAuthorDescription] = useState(
		data?.description ?? ""
	);
	const [authorLitPeriod, setAuthorLitPeriod] = useState(
		data?.litPeriod ?? ""
	);
	const [authorTotalBooks, setAuthorTotalBooks] = useState(
		data?.totalBooks ?? 0
	);
	const [authorImage, setAuthorImage] = useState(data?.authorImage ?? "");

	const updateAuthorFn = async (e: FormEvent) => {
		e.preventDefault();

		await updateAuthorMut.mutateAsync({
			id: data.id,
			name: authorName,
			deathYear: authorDeathYear,
			birthYear: authorBirthYear,
			description: authorDescription,
			litPeriod: authorLitPeriod,
			totalBooks: authorTotalBooks,
			authorImage: authorImage,
		});

		toast({
			title: "Autor bol úspešne aktualizovaný",
			duration: 2000,
			className: "bg-green-500",
		});
		router.push("/authors");
	};

	const deleteAuthorFn = async (e: FormEvent) => {
		e.preventDefault();

		await deleteAuthorMut.mutateAsync({
			id: data.id,
		});

		toast({
			title: "Autor bol úspešne zmazaný",
			duration: 2000,
			className: "bg-green-500",
		});
		router.push("/authors");
	};

	return (
		<div className="flex mt-5">
			<SheetHelper
				variantProp="default"
				title={"Aktualizovať autora/ku"}
				secondTitle={"Aktualizovať autora/ku"}
			>
				<span className="mt-2 font-bold text-xl">
					Aktualizovať autora/ku: {name}
				</span>
				<div>
					<form onSubmit={updateAuthorFn}>
						<Input
							type="text"
							className="mt-5"
							placeholder="Meno"
							value={authorName}
							onChange={(e) => setAuthorName(e.target.value)}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Rok úmrtia"
							value={authorDeathYear}
							onChange={(e) => setAuthorDeathYear(e.target.value)}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Rok narodenia"
							value={authorBirthYear}
							onChange={(e) => setAuthorBirthYear(e.target.value)}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Popis"
							value={authorDescription}
							onChange={(e) =>
								setAuthorDescription(e.target.value)
							}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Literárna doba"
							value={authorLitPeriod}
							onChange={(e) => setAuthorLitPeriod(e.target.value)}
						/>
						<Input
							type="number"
							className="mt-5"
							placeholder="Počet kníh"
							value={authorTotalBooks}
							onChange={(e) =>
								setAuthorTotalBooks(
									Number.parseInt(e.target.value)
								)
							}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Obrázok autora"
							value={authorImage}
							onChange={(e) => setAuthorImage(e.target.value)}
						/>

						<Button
							className="mt-6"
							variant={"secondary"}
							size={"lg"}
							type="submit"
						>
							Aktualizovať autora/ku
						</Button>
					</form>
				</div>
			</SheetHelper>
			<div className="ml-4">
				<SheetHelper
					variantProp="outline"
					title="Zmazať autora/ku"
					secondTitle="Ste si istí, že chcete zmazať tohto autora/ku?"
				>
					<span className="mt-2 font-bold text-xl">
						Ste si istí, že chcete zmazať autora/ku: {name}
					</span>
					<div className="p-5 mt-5">
						<form onSubmit={deleteAuthorFn}>
							<Button
								variant={"destructive"}
								size={"lg"}
								type="submit"
							>
								Zmazať
							</Button>
						</form>
					</div>
				</SheetHelper>
			</div>
		</div>
	);
};

export default AuthorSheets;