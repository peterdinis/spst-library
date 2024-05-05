"use client";

import { FC, FormEvent } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";
import { Input } from "~/components/ui/input";
import { Book } from "@prisma/client";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IBookSheetsProps {
  name: string;
  data: Book;
}

const BookSheets: FC<IBookSheetsProps> = ({ name, data }: IBookSheetsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const deleteBookMut = api.book.deleteBook.useMutation();
  const updateBookMut = api.book.updateBook.useMutation({
	onSuccess: () => {
		toast({
			title: "Kniha bola úpravená",
			duration: 2000,
			className: "bg-green-500 text-white"
		})
		router.push(`/books/${data?.id!}`)
	},

	onError: () => {
		toast({
			title: "Kniha nebola úpravená",
			duration: 2000,
			className: "bg-red-500 text-white"
		})
	}
  });

  const deleteBookFn = async (e: FormEvent) => {
    e.preventDefault();

    await deleteBookMut.mutateAsync({
      id: data?.id,
    });

    toast({
      title: "Kniha bola úspešené zmazaná",
      duration: 2000,
      className: "bg-green-500",
    });
    router.push("/books");
  };

  const {
	register,
	handleSubmit,
	reset,
	formState: { errors },
} = useForm();



  return (
    <div className="flex mt-5">
      <SheetHelper
        variantProp="default"
        title={"Upraviť knihu"}
        secondTitle={"Upraviť knihu"}
      >
        <span className="mt-2 font-bold text-xl">Uprava knihy: {name}</span>
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
                value={data?.isAvaiable as unknown as string}
              />
            </div>
            <Input
              type="text"
              className="mt-5"
              placeholder="Počet kusov"
              value={data?.itemsInStock}
            />

            <Button className="mt-6" variant={"secondary"} size={"lg"}>
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
            <form onSubmit={deleteBookFn}>
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

export default BookSheets;
