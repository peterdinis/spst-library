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
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { useForm, FieldValues } from "react-hook-form";
import axios from "axios";
import Header from "~/app/_components/shared/Header";
import {useMutation} from "@tanstack/react-query";
import { IAdminAction } from "~/app/types/adminTypes";

const DeactivateAccountModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const { register, handleSubmit } = useForm();

	const handleOpenDialog = () => {
		setOpen(!open);
	};

    const deactivateAccountModal = useMutation({
        mutationKey: ["deactivateAccount"],
        mutationFn: async (data: IAdminAction) => {
            return await axios.patch(process.env.NEXT_PUBLIC_AUTH_API + "auth/users/deactivate", data)
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
        }
    })

	const onSubmit = async (data: FieldValues) => {
		await deactivateAccountModal.mutateAsync({
			accountId: data.accountId
		});
	};

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
						<form
							className="mt-5"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="mt-2">
								<Input
									type="text"
									{...register("accountId", {
										required: true,
									})}
									placeholder="Id účtu"
								/>
							</div>
							<div className="mt-8">
								<Button>Deaktivovať účet</Button>
							</div>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default DeactivateAccountModal;
