"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import AuthorSelect from "../authors/AuthorSelect";
import CategorySelect from "../categories/CategorySelect";
import { Tooltip } from "~/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const AppEditor = dynamic(() => import("../shared/AppEditor"), { ssr: false });

const CreateBookForm: FC = () => {
  return (
    <>
      <Header text="Tvorba novej knihy" />
      <form className="mx-auto mt-10 max-w-2xl">
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Meno Knihy"
          />
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Obrázok"
          />
        </div>
        <div className="group relative z-0 mb-6">
          <AuthorSelect />
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Rok"
          />
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Počet strán"
          />
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Dostupná"
          />
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Počet kusov"
          />
        </div>
        <div className="group relative z-0 mb-6">
          <CategorySelect />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Krátke info</TooltipTrigger>
            <TooltipContent>
              <p className="font-bold text-gray-800 p-2 text-lg">V tomto editore môžte napísať krátke informácie o knihe. Max 200 riadkov</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="group relative z-0 mb-6">
          <AppEditor />
        </div>

        <div className="flex justify-center align-top">
          <Button variant={"default"} size={"lg"}>
            Pridaj novú knihu
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateBookForm;
