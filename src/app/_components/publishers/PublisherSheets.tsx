import { FC } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";

interface IPublisherSheetProps {
	name: string;
}

const PublisherSheets: FC<IPublisherSheetProps> = ({ name }: IPublisherSheetProps) => {
	return (
		<div className="flex mt-5">
			<SheetHelper
				variantProp="default"
				title={"Upraviť vydavateľstvo"}
				secondTitle={"Upraviť vydavateľstvo"}
			>
				<span className="mt-2 font-bold text-xl">
					Uprava vydavateľstva: {name}
				</span>
			</SheetHelper>
			<div className="ml-4">
				<SheetHelper
					variantProp="outline"
					title="Zmazať vydavateľstvo"
					secondTitle="Chcete zmazať vydavateľstvo"
				>
					<span className="mt-2 font-bold text-xl">
						Chcte zmazať vydavateľstvo: {name}
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

export default PublisherSheets;
