"use client"

import { FC } from "react";
import Header from "../shared/Header";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";

const BookDetail: FC = () => {
    const { id } = useParams();
    const {data, isLoading, isError} = api.book.fetchBookById.useQuery({
        id: Number(id)
    })

    if(isLoading) {
        return <Loader2 className="animate-spin" />
    }

    if(isError) {
        return <GlobalErrorComponent statusCode="404" message="Kniha pod týmto id neexistuje" />
    }

    console.log("D", data);
    return (
        <>
            <Header text="Detail knihy" />
        </>
    )
}

export default BookDetail;