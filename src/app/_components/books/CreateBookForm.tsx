"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import dynamic from "next/dynamic";
import AuthorSelect from "../authors/AuthorSelect";
import CategorySelect from "../categories/CategorySelect";
import PublisherSelect from "../publishers/PublisherSelect";
import { useToast } from "~/components/ui/use-toast";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const AppEditor = dynamic(() => import("../shared/AppEditor"), { ssr: false });

const CreateBookForm: FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const addNewBookMut = api.book.createNewBook.useMutation({
    onSuccess: () => {
      toast({
        title: "Nová kniha bola vytvorená",
        duration: 2000,
        className: "bg-green-500 text-white",
      });
      router.push("/books");
    },

    onError: () => {
      toast({
        title: "Nová kniha nebola vytvorená",
        duration: 2000,
        className: "bg-red-500 text-white",
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
    await addNewBookMut.mutateAsync({
      name: data.name,
      description: data.description,
      image: data.image,
      year: data.year,
      pages: data.pages,
      isAvaiable: data.isAvaiable,
      itemsInStock: data.itemsInStock,
      categoryId: data.categoryId,
      authorId: data.authorId,
      publisherId: data.publisherId,
    });
    reset();
  };

  return (
    <>
      <Header text="Tvorba novej knihy" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-10 max-w-2xl"
      >
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Meno Knihy"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-red-500">Meno knihy je povinné</span>
          )}
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Obrázok"
            {...register("image", {
              required: true,
            })}
          />
          {errors.image && errors.image.type === "required" && (
            <span className="text-red-500">Obrázok je povinný</span>
          )}
        </div>
        <div className="group relative z-0 mb-6">
          <Controller
            name="authorId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AuthorSelect onChange={field.onChange} value={field.value} />
            )}
          />
          {errors.authorId && (
            <span className="text-red-500">Author/ka musí byť vybratý/á</span>
          )}
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Rok"
            {...register("year", {
              required: true,
            })}
          />
          {errors.year && errors.year.type === "required" && (
            <span className="text-red-500">Rok je povinný</span>
          )}
        </div>
        <div className="group relative z-0 mb-6">
          <Input
            type="text"
            className="peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600"
            placeholder="Počet strán"
            {...register("pages", {
              required: true,
              valueAsNumber: true,
            })}
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
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CategorySelect onChange={field.onChange} value={field.value} />
            )}
          />
          {errors.categoryId && (
            <span className="text-red-500">Kategória musí byť vybratá</span>
          )}
        </div>

        <div className="group relative z-0 mb-6">
          <Controller
            name="publisherId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PublisherSelect onChange={field.onChange} value={field.value} />
            )}
          />
          {errors.publisherId && (
            <span className="text-red-500">Vydavateľstvo musí byť vybraté</span>
          )}
        </div>

        <div className="group relative z-0 mb-6">
		<Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <AppEditor value={field.value} onChange={field.onChange} />
            )}
          />
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
