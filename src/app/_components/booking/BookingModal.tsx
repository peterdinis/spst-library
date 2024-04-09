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

const BookingModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();

	const handleOpenDialog = () => {
		setOpen(!open);
	};

	const handleBooking = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		toast({
			title: "Kniha bola úpsešné požičaná",
			duration: 2000,
			className: "bg-green-500",
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
						<form>
							<div className="mt-2">
								<Input type="text" placeholder="Meno" />
							</div>
							<div className="mt-4">
								<Input type="text" placeholder="Priezvisko" />
							</div>
							<div className="mt-4">
								<Input type="text" placeholder="Názov knihy" />
							</div>
							<div className="mt-4">
								<Input type="date" placeholder="Od" />
							</div>
							<div className="mt-8">
								<Button onClick={handleBooking}>
									Požičať knihu
								</Button>
							</div>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default BookingModal;
