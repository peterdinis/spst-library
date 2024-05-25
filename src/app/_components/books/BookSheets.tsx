"use client"

import { FC, FormEvent } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";
import { Input } from "~/components/ui/input";
import { Book } from "@prisma/client";
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
    const updateBookMut = api.book.updateBook.useMutation();

    const deleteBookFn = async (e: FormEvent) => {
        e.preventDefault();

        await deleteBookMut.mutateAsync({
            id: data?.id,
        });

        toast({
            title: "Kniha bola úspešne zmazaná",
            duration: 2000,
            className: "bg-green-500",
        });
        router.push("/books");
    };

    const { register, handleSubmit } = useForm();

    const onSubmit = async (formData: any) => {
        try {
            await updateBookMut.mutateAsync({
                id: data.id,
                name: formData.name,
                description: formData.description,
                image: formData.image,
                year: formData.year,
                isAvaiable: formData.isAvaiable,
                itemsInStock: formData.itemsInStock,
            });

            toast({
                title: "Kniha bola úspešne aktualizovaná",
                duration: 2000,
                className: "bg-green-500",
            });
            router.push(`/books/${data?.id}`);
        } catch (error) {
            toast({
                title: "Nepodarilo sa aktualizovať knihu",
                duration: 2000,
                className: "bg-red-500",
            });
        }
    };

    return (
        <div className="flex mt-5">
            <SheetHelper
                variantProp="default"
                title={"Upraviť Knihu"}
                secondTitle={"Upraviť Knihu"}
            >
                <span className="mt-2 font-bold text-xl">
                    Upraviť Kniha: {name}
                </span>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Názov"
                            defaultValue={data?.name}
                            {...register("name")}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Popis"
                            defaultValue={data?.description}
                            {...register("description")}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Obrázok"
                            defaultValue={data?.image}
                            {...register("image")}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Rok"
                            defaultValue={data?.year}
                            {...register("year")}
                        />
                        <div className="mt-5">
                            <label>
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    defaultChecked={data?.isAvaiable}
                                    {...register("isAvaiable")}
                                />
                                Je k dispozícii
                            </label>
                        </div>
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Počet kusov na sklade"
                            defaultValue={data?.itemsInStock}
                            {...register("itemsInStock")}
                        />

                        <Button
                            className="mt-6"
                            variant={"secondary"}
                            size={"lg"}
                            type="submit"
                        >
                            Upraviť Kniha
                        </Button>
                    </form>
                </div>
            </SheetHelper>
            <div className="ml-4">
                <SheetHelper
                    variantProp="outline"
                    title="Zmazať Kniha"
                    secondTitle="Ste si istí, že chcete zmazať túto knihu?"
                >
                    <span className="mt-2 font-bold text-xl">
                        Ste si istí, že chcete zmazať knihu: {name}
                    </span>
                    <div className="p-5 mt-5">
                        <form onSubmit={deleteBookFn}>
                            <Button variant={"destructive"} size={"lg"} type="submit">
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