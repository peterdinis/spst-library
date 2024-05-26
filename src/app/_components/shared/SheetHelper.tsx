"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { FC, ReactNode } from "react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "~/components/ui/sheet";

type BtnVariants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

interface ISheetHelperProps {
  children?: ReactNode;
  title: string;
  secondTitle: string;
  variantProp: BtnVariants;
}

const SheetHelper: FC<ISheetHelperProps> = ({
  children,
  title,
  secondTitle,
  variantProp,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={variantProp} size="lg">
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{secondTitle}</SheetTitle>
          <SheetDescription>{children}</SheetDescription>
        </SheetHeader>

        <AlertDialog>
          <AlertDialogTrigger>Info pred upravovaním</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Skontrolujte si či daná vec nemá referenciu niekde inde.
              </AlertDialogTitle>
              <AlertDialogDescription>
                Ak mám vyvorenú kategóriu 'abc' a kategória 'abc' referencuje sa
                v knihe 'Abc' nemôžeme zmazať kategóiu 'abc'. Najprv musíte v
                knihe 'Abc' nahradiť kategóriu
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Zavrieť</AlertDialogCancel>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetContent>
    </Sheet>
  );
};

export default SheetHelper;
