"use client"

import { FC, FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import SheetHelper from "../shared/SheetHelper";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { Author } from "@prisma/client";

interface IAuthorSheetsProps {
    name: string;
    data: Author;
}

const AuthorSheets: FC<IAuthorSheetsProps> = ({
    name,
    data,
}: IAuthorSheetsProps) => {
    const updateAuthorMut = api.author.updateAuthor.useMutation();
    const deleteAuthorMut = api.author.deleteAuthor.useMutation();
    const { toast } = useToast();
    const router = useRouter();

    const [authorName, setAuthorName] = useState(data?.name || "");
    const [authorDeathYear, setAuthorDeathYear] = useState(data?.deathYear || "");
    const [authorBirthYear, setAuthorBirthYear] = useState(data?.birthYear || "");
    const [authorDescription, setAuthorDescription] = useState(data?.description || "");
    const [authorLitPeriod, setAuthorLitPeriod] = useState(data?.litPeriod || "");
    const [authorTotalBooks, setAuthorTotalBooks] = useState(data?.totalBooks || 0);
    const [authorImage, setAuthorImage] = useState(data?.authorImage || "");

    const updateAuthorFn = async (e: FormEvent) => {
        e.preventDefault();

        await updateAuthorMut.mutateAsync({
            id: data.id,
            name: authorName,
            deathYear: authorDeathYear,
            birthYear: authorBirthYear,
            description: authorDescription,
            litPeriod: authorLitPeriod,
            totalBooks: authorTotalBooks,
            authorImage: authorImage,
        });

        toast({
            title: "Author was successfully updated",
            duration: 2000,
            className: "bg-green-500",
        });
        router.push("/authors");
    };

    const deleteAuthorFn = async (e: FormEvent) => {
        e.preventDefault();

        await deleteAuthorMut.mutateAsync({
            id: data.id,
        });

        toast({
            title: "Author was successfully deleted",
            duration: 2000,
            className: "bg-green-500",
        });
        router.push("/authors");
    };

    return (
        <div className="flex mt-5">
            <SheetHelper
                variantProp="default"
                title={"Update Author"}
                secondTitle={"Update Author"}
            >
                <span className="mt-2 font-bold text-xl">
                    Update Author: {name}
                </span>
                <div>
                    <form onSubmit={updateAuthorFn}>
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Name"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Death Year"
                            value={authorDeathYear}
                            onChange={(e) => setAuthorDeathYear(e.target.value)}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Birth Year"
                            value={authorBirthYear}
                            onChange={(e) => setAuthorBirthYear(e.target.value)}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Description"
                            value={authorDescription}
                            onChange={(e) => setAuthorDescription(e.target.value)}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Literary Period"
                            value={authorLitPeriod}
                            onChange={(e) => setAuthorLitPeriod(e.target.value)}
                        />
                        <Input
                            type="number"
                            className="mt-5"
                            placeholder="Total Books"
                            value={authorTotalBooks}
                            onChange={(e) => setAuthorTotalBooks(parseInt(e.target.value))}
                        />
                        <Input
                            type="text"
                            className="mt-5"
                            placeholder="Author Image"
                            value={authorImage}
                            onChange={(e) => setAuthorImage(e.target.value)}
                        />

                        <Button className="mt-6" variant={"secondary"} size={"lg"} type="submit">
                            Update Author
                        </Button>
                    </form>
                </div>
            </SheetHelper>
            <div className="ml-4">
                <SheetHelper
                    variantProp="outline"
                    title="Delete Author"
                    secondTitle="Are you sure you want to delete this author?"
                >
                    <span className="mt-2 font-bold text-xl">
                        Are you sure you want to delete author: {name}
                    </span>
                    <div className="p-5 mt-5">
                        <form onSubmit={deleteAuthorFn}>
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

export default AuthorSheets;