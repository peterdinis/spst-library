"use client";

import { FC, useState } from "react";
import Header from "../shared/Header";
import { Button } from "~/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const ExtendedBookingModal: FC = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
  } = useForm();
  const router = useRouter();

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const newBookingRequest = api.booking.createBooking.useMutation({
    onSuccess: () => {
      toast({
        title: "Kniha bola úpsešné požičaná",
        duration: 2000,
        className: "bg-green-500",
      });
      router.push("/booking/success");
    },

    onError: () => {
      toast({
        title: "Knihu sa požičať nepodarilo",
        duration: 2000,
        className: "bg-red-500",
      });
    },
  });

  const onSubmit = async (data: FieldValues) => {
	console.log("D", data);
    await newBookingRequest.mutateAsync({
      bookName: data.bookName,
      from: data.from,
      to: data.to,
      userEmail: data.userEmail,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger>Predlženie knihy</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Header text="Predlženie knihy" />
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2">
                <Input
                  type="text"
                  {...register("bookName", {
                    required: true,
                  })}
                  placeholder="Meno knihy"
                />
              </div>
              <div className="mt-4">
                <Input
                  type="date"
                  {...register("from", {
                    required: true,
                    valueAsDate: true,
                  })}
                  placeholder="Od"
                />
              </div>
              <div className="mt-4">
                <Input
                  type="date"
                  {...register("to", {
                    required: true,
                    valueAsDate: true,
                  })}
                  placeholder="Do"
                />
              </div>
              <div className="mt-4">
                <Input
                  type="text"
                  {...register("userEmail", {
                    required: true,
                    
                  })}
                  placeholder="Email osoby ktorá si chce požičať knihu"
                />
              </div>
              <div className="mt-8">
                <Button>Predlžiť knihu</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ExtendedBookingModal;