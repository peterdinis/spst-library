import { FC } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";

interface ICategorySheetsProps {
	name: string;
}

const CategorySheets: FC<ICategorySheetsProps> = ({
	name,
}: ICategorySheetsProps) => {
	return (
		<div className="flex mt-5">
			<SheetHelper
				variantProp="default"
				title={"Upraviť kategóriu"}
				secondTitle={"Upraviť kategóriu"}
			>
				<span className="mt-2 font-bold text-xl">
					Uprava kategórie: {name}
				</span>
			</SheetHelper>
			<div className="ml-4">
				<SheetHelper
					variantProp="outline"
					title="Zmazať kategóriu"
					secondTitle="Chcete zmazať kategóriu"
				>
					<span className="mt-2 font-bold text-xl">
						Chcte zmazať kategóriu: {name}
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

export default CategorySheets;
