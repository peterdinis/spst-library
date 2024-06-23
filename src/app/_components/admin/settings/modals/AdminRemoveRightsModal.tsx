"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { type FC, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import Header from "~/app/_components/shared/Header";
import { urlCheck } from "~/app/_constants/api";
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

interface UserType {
	id: string;
	email: string;
}

interface ApiResponse {
	data: UserType[];
}

const AdminRemoveRightsModal: FC = () => {
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

	const { data, isLoading } = useQuery<ApiResponse>({
		queryKey: ["adminTeachers"],
		queryFn: async () => {
			return await axios.get(urlCheck + "auth/all/teachers/admins");
		},
	});

	const adminRemoveRightsMut = useMutation({
		mutationKey: ["adminRemoveRights"],
		mutationFn: async (data: FieldValues) => {
			return await axios.patch(
				urlCheck + "auth/account/make-admin",
				data,
			);
		},

		onSuccess: () => {
			toast({
				title: "Učtu boli odobrané admin práva",
				duration: 2000,
				className: "bg-green-500",
			});
		},

		onError: () => {
			toast({
				title: "Nepodarilo sa odobrať účtu admin práva",
				duration: 2000,
				className: "bg-red-500",
			});
		},
	});

	const onSubmit = async (formData: FieldValues) => {
		await adminRemoveRightsMut.mutateAsync({
			accountId: formData.accountId,
		});
	};

	if (isLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenDialog}>
			<DialogTrigger>
				<Button variant={"secondary"}>Odobrať admin práva</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<Header text="Odobrať admin práva účtu" />
					</DialogTitle>
					<DialogDescription>
						<form onSubmit={handleSubmit(onSubmit)}>
							<section className="peer mt-4 block w-full appearance-none bg-transparent px-0 py-2.5 text-lg text-gray-900 dark:text-blue-50 focus:outline-none focus:ring-0">
								<Select
									onValueChange={(value) => {
										const selectedAccount = data?.data.find(
											(item) =>
												item.id.toString() === value,
										);
										if (selectedAccount) {
											setValue(
												"accountId",
												selectedAccount.id,
											);
											setValue(
												"email",
												selectedAccount.email,
											);
										}
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Výber učtu pre admin práva" />
									</SelectTrigger>
									<SelectContent>
										{data &&
											data.data.map((item) => (
												<SelectItem
													key={item.id}
													value={item.id.toString()}
												>
													{item.email}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								{errors.accountId && (
									<p className="text-red-500">
										{errors.accountId.message as string}
									</p>
								)}
								<Button
									type="submit"
									className="mt-10"
									variant={"default"}
								>
									Odstrániť práva
								</Button>
							</section>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AdminRemoveRightsModal;
