import { FC } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";
import { Input } from "~/components/ui/input";
import { Book } from "@prisma/client";
import { Label } from "~/components/ui/label";

interface IBookSheetsProps {
	name: string;
	data: Book;
}

const BookSheets: FC<IBookSheetsProps> = ({ name, data }: IBookSheetsProps) => {
	return (
		<div className="flex mt-5">
			<SheetHelper
				variantProp="default"
				title={"Upraviť knihu"}
				secondTitle={"Upraviť knihu"}
			>
				<span className="mt-2 font-bold text-xl">
					Uprava knihy: {name}
				</span>
				<div>
					<form>
						<Input
							type="text"
							className="mt-5"
							placeholder="Meno"
							value={data?.name}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Popis"
							value={data?.description}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Obrázok"
							value={data?.image}
						/>
						<Input
							type="text"
							className="mt-5"
							placeholder="Rok"
							value={data?.year}
						/>
						<div className="mt-5">
							<Label>Dostupnosť Knihy</Label>
							<Input
								type="checkbox"
								className="mt-5"
								value={data?.isAvaiable as any}
							/>
						</div>
						<Input
							type="text"
							className="mt-5"
							placeholder="Počet kusov"
							value={data?.itemsInStock}
						/>

						<Button
							className="mt-6"
							variant={"secondary"}
							size={"lg"}
						>
							Upraviť knihu
						</Button>
					</form>
				</div>
			</SheetHelper>
			<div className="ml-4">
				<SheetHelper
					variantProp="outline"
					title="Zmazať knihu"
					secondTitle="Chcete zmazať knihu"
				>
					<span className="mt-2 font-bold text-xl">
						Chcte zmazať knihu: {name}
					</span>
					<div className="p-5 mt-5">
						<Button variant={"destructive"} size={"lg"}>
							Zmazať
						</Button>
					</div>
				</SheetHelper>
			</div>
		</div>
	);
};

export default BookSheets;
