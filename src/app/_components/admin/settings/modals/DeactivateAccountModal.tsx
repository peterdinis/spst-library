"use client";

import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import {
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Dialog,
	DialogContent,
	DialogDescription,
} from "~/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { useForm, FieldValues } from "react-hook-form";
import axios from "axios";
import Header from "~/app/_components/shared/Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const DeactivateAccountModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const {
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleOpenDialog = () => {
		setOpen(!open);
	};

	const { data, isLoading } = useQuery({
		queryKey: ["allUsers"],
		queryFn: async () => {
			return await axios.get(
				process.env.NEXT_PUBLIC_AUTH_API + "auth/users",
			);
		},
	});

	const deactivateAccountModal = useMutation({
		mutationKey: ["deactivateAccount"],
		mutationFn: async (data: any) => {
			return await axios.patch(
				process.env.NEXT_PUBLIC_AUTH_API + "auth/account/deactivate",
				data,
			);
		},

		onSuccess: () => {
			toast({
				title: "Učet bol deaktivovaný",
				duration: 2000,
				className: "bg-green-500",
			});
		},

		onError: () => {
			toast({
				title: "Učet nebol deaktivovaný",
				duration: 2000,
				className: "bg-red-500",
			});
		},
	});

	const onSubmit = async (data: FieldValues) => {
		await deactivateAccountModal.mutateAsync({
			accountId: data.accountId,
		});
	};

	if (isLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenDialog}>
			<DialogTrigger>
				<Button variant={"default"}>Deaktivovat účet</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Deaktivovat účet" />
					</DialogTitle>
					<DialogDescription>
						<form onSubmit={handleSubmit(onSubmit)}>
							<section className="peer mt-4 block w-full appearance-none bg-transparent px-0 py-2.5 text-lg text-gray-900 dark:text-blue-50 focus:outline-none focus:ring-0">
								<Select
									onValueChange={(value) =>
										setValue("accountId", value)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Výber učtu pre admin práva" />
									</SelectTrigger>
									<SelectContent>
										{data &&
											data.data.map(
												(item: {
													id: string;
													email: string;
												}) => {
													return (
														<SelectItem
															key={item.id}
															value={item.id.toString()}
														>
															{item.email}
														</SelectItem>
													);
												},
											)}
									</SelectContent>
								</Select>
								{errors.accountId && (
									<p className="text-red-500">
										{
											errors.accountId
												.message as unknown as string
										}
									</p>
								)}
								<Button
									type="submit"
									className="mt-10"
									variant={"default"}
								>
									Deaktivovať účet
								</Button>
							</section>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DeactivateAccountModal;
