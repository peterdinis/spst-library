"use client"

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Link, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

const AllBooksWrapper: FC = () => {
  const {data, isLoading, isError} = api.book.fetchBooks.useQuery();

  if(isLoading) {
    return <Loader2 className="animate-spin" />
  }

  if(isError) {
      throw new Error("Shomething went wrong");
  }

  console.log(data);

  return (
    <>
      <Header text="Všetky knihy" />
      <div className="mt-5">
        <form>
          <Input placeholder="Hľadaj knihu..." />
        </form>
      </div>

      {/* TODO: Update later */}
      <div className='mx-auto xl:grid-cols-4 mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <img
            src={"https://picsum.photos/400/300"}
            alt={"RORORORO"}
          />
          <CardHeader>
            <CardTitle>BOOOK 1</CardTitle>
            <CardDescription>DESC 11</CardDescription>
          </CardHeader>
          <Button variant={"default"} size="lg">
            <Link href={`/detail`}>Detail</Link>
          </Button>
        </Card>
      </div>
    </>
  );
};

export default AllBooksWrapper;
