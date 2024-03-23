import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";

const AllBooksWrapper: FC = () => {
  return (
    <>
      <Header text="Všetky knihy" />
      <div className="mt-5">
        <form>
          <Input placeholder="Hľadaj knihu..." />
        </form>
      </div>

      <div className="mt-5 className='mx-auto grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'">
        ALL BOOKS CARDS
      </div>
    </>
  );
};

export default AllBooksWrapper;
