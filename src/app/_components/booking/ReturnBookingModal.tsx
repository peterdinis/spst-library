"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import Header from "../shared/Header";

const ReturnBookingModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const pathname = usePathname();
	const handleOpenDialog = () => {
		setOpen(!open);
	};

	const newBookingRequest = api.booking.returnBooking.useMutation({
		onSuccess: () => {
			toast({
				title: "Kniha bola úpsešné vrátená",
				duration: 2000,
				className: "bg-green-500",
			});
			setTimeout(() => {
				router.prefetch(pathname);
			}, 2000);
		},

		onError: () => {
			toast({
				title: "Knihu nebola úspešné vrátená",
				duration: 2000,
				className: "bg-red-500",
			});
		},
	});

	const onSubmit = async (data: FieldValues) => {
		await newBookingRequest.mutateAsync({
			bookName: data.bookName,
			returnDate: data.returnDate,
			userEmail: data.userEmail,
		});

		await axios.post("/api/send/return", {
			email: data.userEmail,
			bookName: data.bookName,
		});
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenDialog}>
			<DialogTrigger>Vrátenie knihy</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Vrátenie knihy" />
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
									{...register("returnDate", {
										required: true,
										valueAsDate: true,
									})}
									placeholder="Vrátená k dátumu"
								/>
								{errors.returnDate &&
									errors.returnDate.type === "required" && (
										<span className="text-red-500">
											Dátum návratu je povinný
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
									placeholder="Email osoby ktorá si chce vrátiť knihu"
								/>
								{errors.userEmail &&
									errors.userEmail.type === "required" && (
										<span className="text-red-500">
											Dátum do je povinný
										</span>
									)}
							</div>
							<div className="mt-8">
								<Button>Vrátiť knihu</Button>
							</div>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ReturnBookingModal;
