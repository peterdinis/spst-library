"use client";

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
            title: "Book was successfully deleted",
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
                title: "Book was successfully updated",
                duration: 2000,
                className: "bg-green-500",
            });
            router.push(`/books/${data?.id}`);
        } catch (error) {
            toast({
                title: "Failed to update book",
                duration: 2000,
                className: "bg-red-500",
            });
        }
    };

    return (
        <div className="flex mt-5">
            <SheetHelper
                variantProp="default"
                title={"Update Book"}
                secondTitle={"Update Book"}
            >
                <span className="mt-2 font-bold text-xl">
                    Update Book: {name}
                </span>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Name"
                            defaultValue={data?.name}
                            {...register("name")}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Description"
                            defaultValue={data?.description}
                            {...register("description")}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Image"
                            defaultValue={data?.image}
                            {...register("image")}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Year"
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
                                Is Available
                            </label>
                        </div>
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Items in Stock"
                            defaultValue={data?.itemsInStock}
                            {...register("itemsInStock")}
                        />

                        <Button
                            className="mt-6"
                            variant={"secondary"}
                            size={"lg"}
                            type="submit"
                        >
                            Upraviť knihu
                        </Button>
                    </form>
                </div>
            </SheetHelper>
            <div className="ml-4">
                <SheetHelper
                    variantProp="outline"
                    title="Delete Book"
                    secondTitle="Are you sure you want to delete this book?"
                >
                    <span className="mt-2 font-bold text-xl">
                        Are you sure you want to delete book: {name}
                    </span>
                    <div className="p-5 mt-5">
                        <form onSubmit={deleteBookFn}>
                            <Button variant={"destructive"} size={"lg"} type="submit">
                                Delete
                            </Button>
                        </form>
                    </div>
                </SheetHelper>
            </div>
        </div>
    );
};

export default BookSheets;