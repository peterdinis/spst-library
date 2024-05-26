"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { type FC, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import Header from "~/app/_components/shared/Header";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";

const RemoveAccountModal: FC = () => {
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

	const removeAccountModal = useMutation({
		mutationKey: ["removeAccount"],
		mutationFn: async (data: any) => {
			return await axios.delete(
				process.env.NEXT_PUBLIC_AUTH_API + "auth/account/delete",
				data,
			);
		},

		onSuccess: () => {
			toast({
				title: "Učet bol zmazaný",
				duration: 2000,
				className: "bg-green-500",
			});
		},

		onError: () => {
			toast({
				title: "Učet nebol zmazaný",
				duration: 2000,
				className: "bg-red-500",
			});
		},
	});

	const onSubmit = async (data: FieldValues) => {
		await removeAccountModal.mutateAsync({
			accountId: data.accountId,
		});
	};

	if (isLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenDialog}>
			<DialogTrigger>
				<Button variant={"secondary"}>Zmazať účet</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Zmazať účet" />
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
									Zmazať účet
								</Button>
							</section>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default RemoveAccountModal;
