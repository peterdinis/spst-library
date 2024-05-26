"use client";

import type { Publisher } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FC, type FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import SheetHelper from "../shared/SheetHelper";

interface IPublisherSheetProps {
	name: string;
	data: Publisher;
}

const PublisherSheets: FC<IPublisherSheetProps> = ({
	name,
	data,
}: IPublisherSheetProps) => {
	const updatePublisherMut = api.publisher.updatePublisher.useMutation();
	const deletePublisherMut = api.publisher.deletePublisher.useMutation();
	const { toast } = useToast();
	const router = useRouter();

	const [publisherName, setPublisherName] = useState(data?.name || "");
	const [publisherDescription, setPublisherDescription] = useState(
		data?.description || "",
	);
	const [publisherImage, setPublisherImage] = useState(data?.image || "");
	const [publisherBossName, setPublisherBossName] = useState(
		data?.bossName || "",
	);
	const [publisherIsActive, setPublisherIsActive] = useState(
		data?.isActive || false,
	);
	const [publisherCreatedDated, setPublisherCreatedDated] = useState(
		data?.createdDated || "",
	);

	const updatePublisherFn = async (e: FormEvent) => {
		e.preventDefault();

		await updatePublisherMut.mutateAsync({
			id: data.id,
			name: publisherName,
			description: publisherDescription,
			image: publisherImage,
			bossName: publisherBossName,
			isActive: publisherIsActive,
			createdDated: publisherCreatedDated as any,
		});

		toast({
			title: "Vydavateľstvo bolo úspešne upravené",
			duration: 2000,
			className: "bg-green-500",
		});
		router.push("/publishers");
	};

	const deletePublisherFn = async (e: FormEvent) => {
		e.preventDefault();

		await deletePublisherMut.mutateAsync({
			id: data.id,
		});

		toast({
			title: "Vydavateľstvo bolo úspešne zmazané",
			duration: 2000,
			className: "bg-green-500",
		});
		router.push("/publishers");
	};

	return (
		<div className="flex mt-5">
			<SheetHelper
				variantProp="default"
				title={"Upraviť vydavateľstvo"}
				secondTitle={"Upraviť vydavateľstvo"}
			>
				<span className="mt-2 font-bold text-xl">
					Úprava vydavateľstva: {name}
				</span>
				<div>
					<form onSubmit={updatePublisherFn}>
						<Input
							type="text"
							className="mt-5"
							placeholder="Meno"
							value={publisherName}
							onChange={(e) => setPublisherName(e.target.value)}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Popis"
							value={publisherDescription}
							onChange={(e) =>
								setPublisherDescription(e.target.value)
							}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Obrázok"
							value={publisherImage}
							onChange={(e) => setPublisherImage(e.target.value)}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Meno šéfa"
							value={publisherBossName}
							onChange={(e) =>
								setPublisherBossName(e.target.value)
							}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Dátum vytvorenia"
							value={publisherCreatedDated as any}
							onChange={(e: any) =>
								setPublisherCreatedDated(e.target.value)
							}
						/>
						<div className="mt-5 flex items-center">
							<label className="mr-2">Aktívny</label>
							<input
								type="checkbox"
								checked={publisherIsActive}
								onChange={(e) =>
									setPublisherIsActive(e.target.checked)
								}
							/>
						</div>

						<Button
							className="mt-6"
							variant={"secondary"}
							size={"lg"}
							type="submit"
						>
							Upraviť vydavateľstvo
						</Button>
					</form>
				</div>
			</SheetHelper>
			<div className="ml-4">
				<SheetHelper
					variantProp="outline"
					title="Zmazať vydavateľstvo"
					secondTitle="Chcete zmazať vydavateľstvo"
				>
					<span className="mt-2 font-bold text-xl">
						Chcete zmazať vydavateľstvo: {name}
					</span>
					<div className="p-5 mt-5">
						<form onSubmit={deletePublisherFn}>
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

export default PublisherSheets;
