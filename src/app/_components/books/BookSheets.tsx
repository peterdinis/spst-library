import { FC } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";

interface IBookSheetsProps {
  name: string;
}

const BookSheets: FC<IBookSheetsProps> = ({ name }: IBookSheetsProps) => {
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
