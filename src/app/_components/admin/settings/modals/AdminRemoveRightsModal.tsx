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

const AdminRemoveRightsModal: FC = () => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const { register, handleSubmit } = useForm();

	const handleOpenDialog = () => {
		setOpen(!open);
	};

    const adminRemoveRightsMut = useMutation({
        mutationKey: ["adminRemoveRights"],
        mutationFn: async (data: any) => {
            return await axios.patch(process.env.NEXT_PUBLIC_AUTH_API + "auth/users/make-admin", data)
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
        }
    })

	const onSubmit = async (data: FieldValues) => {
		await adminRemoveRightsMut.mutateAsync({
			accountId: data.accountId
		});
	};

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
								<Button>Odobrať admin práva</Button>
							</div>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AdminRemoveRightsModal;
