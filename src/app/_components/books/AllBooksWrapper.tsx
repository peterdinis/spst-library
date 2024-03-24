"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Ghost, Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import GlobalCard from "../shared/GlobalCard";
import GlobalPagination from "../shared/GlobalPagination";

const AllBooksWrapper: FC = () => {
  const { data, isLoading, isError } = api.book.fetchBooks.useQuery();

  if (isLoading) {
    return <Loader2 className="animate-spin w-8 h-8" />;
  }

  if (isError) {
    return (
      <>
      <Ghost className="animate-bounce w-8 h-8" /> <span className="font-bold">Knihy neboli nájdené</span>
      </>
    )
  }

  return (
    <>
      <Header text="Všetky knihy" />
      <div className="mt-5">
        <form>
          <Input placeholder="Hľadaj knihu..." />
        </form>
      </div>

      <div className="mx-auto mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data &&
          data.map((item: any) => {
            return (
              <>
                <GlobalCard
                  image={item.image}
                  linkName="books"
                  name={item.name}
                  description={item.description}
                  id={item.id}
                />
              </>
            );
          })}
      </div>

      <GlobalPagination />
    </>
  );
};

export default AllBooksWrapper;
