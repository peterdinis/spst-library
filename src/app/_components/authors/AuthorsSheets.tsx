import { FC } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";

interface IAuthorSheetsProps {
  name: string;
}

const AuthorSheets: FC<IAuthorSheetsProps> = ({ name }: IAuthorSheetsProps) => {
  return (
    <div className="flex mt-5">
      <SheetHelper
        variantProp="default"
        title={"Upraviť autorka/ku"}
        secondTitle={"Upraviť autorka/ku"}
      >
        <span className="mt-2 font-bold text-xl">
            Uprava autorka/ky: {name}
          </span>
      </SheetHelper>
      <div className="ml-4">
        <SheetHelper
          variantProp="outline"
          title="Zmazať autorka/ku"
          secondTitle="Chcete zmazať autorka/ku"
        >
          <span className="mt-2 font-bold text-xl">
            Chcte zmazať autorka/ku: {name}
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

export default AuthorSheets;
