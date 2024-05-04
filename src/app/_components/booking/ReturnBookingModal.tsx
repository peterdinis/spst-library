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
import { api } from "~/trpc/react";
import { useRouter, usePathname } from "next/navigation";

const ReturnBookingModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const { register, handleSubmit } = useForm();
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
						<form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
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
									{...register("returnDate", {
										required: true,
										valueAsDate: true,
									})}
									placeholder="Vrátená k dátumu"
								/>
							</div>
							<div className="mt-4">
								<Input
									type="text"
									{...register("userEmail", {
										required: true,
									})}
									placeholder="Email osoby ktorá si chce vrátiť knihu"
								/>
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
