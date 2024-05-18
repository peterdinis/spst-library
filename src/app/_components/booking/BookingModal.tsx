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

const BookingModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
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
		await newBookingRequest.mutateAsync({
			bookName: data.bookName,
			from: data.from,
			to: data.to,
			userEmail: data.userEmail,
		});
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenDialog}>
			<DialogTrigger>Požičanie knihy</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Požičanie knihy" />
					</DialogTitle>
					<DialogDescription>
						<form
							className="mt-5"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="mt-2">
								<Input
									type="text"
									{...register("bookName", {
										required: true,
									})}
									placeholder="Meno knihy"
								/>
								{errors.bookName &&
									errors.bookName.type === "required" && (
										<span className="text-red-500">
											Názov knihy je povinný
										</span>
									)}
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
								{errors.from &&
									errors.from.type === "required" && (
										<span className="text-red-500">
											Dátum od je povinný
										</span>
									)}
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
								{errors.to && errors.to.type === "required" && (
									<span className="text-red-500">
										Dátum do je povinný
									</span>
								)}
							</div>
							<div className="mt-4">
								<Input
									type="text"
									{...register("userEmail", {
										required: true,
										pattern: {
											value: /^\S+@\S+$/i,
											message: "Zlý formát emailu",
										},
									})}
									placeholder="Email osoby ktorá si chce požičať knihu"
								/>
								{errors.userEmail &&
									errors.userEmail.type === "required" && (
										<span className="text-red-500">
											Dátum do je povinný
										</span>
									)}
							</div>
							<div className="mt-8">
								<Button>Požičať knihu</Button>
							</div>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default BookingModal;
