import { FC, FormEvent } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";
import { Category } from "@prisma/client";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { Form } from "~/components/ui/form";

interface ICategorySheetsProps {
  name: string;
  data: Category;
}

const CategorySheets: FC<ICategorySheetsProps> = ({
  name,
  data,
}: ICategorySheetsProps) => {
  const deleteCategoryMut = api.category.deleteCategory.useMutation();
  const { toast } = useToast();
  const router = useRouter();

  const deleteCategoryFn = async (e: FormEvent) => {
    e.preventDefault();

    await deleteCategoryMut.mutateAsync({
      id: data?.id,
    });

    toast({
      title: "Kategória bola úspešené zmazaná",
      duration: 2000,
      className: "bg-green-500",
    });
    router.push("/categories");
  };

  return (
    <div className="flex mt-5">
      <SheetHelper
        variantProp="default"
        title={"Upraviť kategóriu"}
        secondTitle={"Upraviť kategóriu"}
      >
        <span className="mt-2 font-bold text-xl">Uprava kategórie: {name}</span>
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

            <Button className="mt-6" variant={"secondary"} size={"lg"}>
              Upraviť kategóriu
            </Button>
          </form>
        </div>
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
            <form onSubmit={deleteCategoryFn}>
              <Button variant={"destructive"} size={"lg"}>
                Zmazať
              </Button>
            </form>
          </div>
        </SheetHelper>
      </div>
    </div>
  );
};

export default CategorySheets;
