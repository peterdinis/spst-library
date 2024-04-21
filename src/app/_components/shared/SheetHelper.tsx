import { Sheet } from "lucide-react";
import { FC, ReactNode } from "react";
import {
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "~/components/ui/sheet";

interface ISheetHelperProps {
	children?: ReactNode;
	title: string;
	secondTitle: string;
}

const SheetHelper: FC<ISheetHelperProps> = ({
	children,
	title,
	secondTitle,
}) => {
	return (
		<Sheet>
			<SheetTrigger>{title}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{secondTitle}</SheetTitle>
					<SheetDescription>
                        {children}
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SheetHelper;
