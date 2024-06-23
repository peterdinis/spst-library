"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { urlCheck } from "~/app/_constants/api";
import type { IRegisterType } from "~/app/types/authTypes";
import { useToast } from "~/components/ui/use-toast";
import Header from "../shared/Header";
import { ConfettiButton } from "~/components/ui/confetti";

const RegisterForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const addNewTeacherMut = useMutation({
		mutationKey: ["registerTeacher"],
		mutationFn: async (data: IRegisterType) => {
			return await axios.post(urlCheck + "auth/register", data);
		},
		onSuccess: () => {
			toast({
				title: "Registrácia bola úspešná",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			router.push("/teacher/login");
		},
		onError: () => {
			toast({
				title: "Registrácia nebola úspešná",
				duration: 2000,
				className: "bg-red-500 text-white",
			});
		},
	});

	const onStudentSubmit: SubmitHandler<FieldValues> = async (data) => {
		await addNewTeacherMut.mutateAsync({
			name: data.name as string,
			lastName: data.lastName as string,
			email: data.email as string,
			password: data.password as string,
			isActive: true,
			hasAdminRights: false,
			role: "TEACHER",
		});
		await axios.post("/api/send", {
			email: data.email,
		});
		toast({
			title: "Prišiel vám potvrdzujúci email",
			duration: 2000,
			className: "bg-green-500 text-black font-bold",
		});
	};

	return (
		<>
			<Header text="Registrácia učiteľ" />
			<form onSubmit={handleSubmit(onStudentSubmit)}>
				<div className="mb-4 flex flex-col rounded mt-6 bg-white dark:bg-card px-8 pb-8 pt-6 shadow-md">
					<div className="mb-4">
						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="name"
							>
								Meno
							</label>
							<input
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
								id="name"
								type="text"
								placeholder="Meno"
								{...register("name", {
									required: true,
									minLength: 5,
								})}
							/>
							{errors.name && errors.name.type === "required" && (
								<span className="text-red-500">
									Meno je povinné
								</span>
							)}
							{errors.name &&
								errors.name.type === "minLength" && (
									<span className="text-red-500">
										Meno musí mať minimálne 5 znakov
									</span>
								)}
						</div>
						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="lastName"
							>
								Priezvisko
							</label>
							<input
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
								id="lastName"
								type="text"
								{...register("lastName", {
									required: true,
									minLength: 5,
								})}
								placeholder="Priezvisko"
							/>
							{errors.lastName &&
								errors.lastName.type === "required" && (
									<span className="text-red-500">
										Priezvisko je povinné
									</span>
								)}
							{errors.lastName &&
								errors.lastName.type === "minLength" && (
									<span className="text-red-500">
										Priezvisko musí mať minimálne 5 znakov
									</span>
								)}
						</div>
						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
								id="email"
								type="email"
								{...register("email", {
									required: true,
									minLength: 5,
									pattern: {
										value: /^\S+@\S+$/i,
										message: "Zlý formát emailu",
									},
								})}
								placeholder="Email"
							/>
							{errors.email &&
								errors.email.type === "required" && (
									<span className="text-red-500">
										Email je povinný
									</span>
								)}
						</div>

						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="password"
							>
								Heslo
							</label>
							<div className="relative">
								<input
									className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
									id="password"
									type={showPassword ? "text" : "password"}
									{...register("password", {
										required: true,
										minLength: 5,
									})}
									autoFocus
									autoComplete="current-password"
									placeholder="********************************************"
								/>
								{errors.password &&
									errors.password.type === "required" && (
										<span className="text-red-500">
											Heslo je povinné
										</span>
									)}
								{errors.password &&
									errors.password.type === "minLength" && (
										<span className="text-red-500">
											Heslo musí mať minimálne 5 znakov
										</span>
									)}
								<button
									type="button"
									className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent text-gray-500 focus:outline-none"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? <Eye /> : <EyeOff />}
								</button>
							</div>
						</div>
						<div>
							<ConfettiButton
							>
								Registrácia
							</ConfettiButton>
							<div>
								<Link
									className="text-blue hover:text-blue-darker mt-4 inline-block align-baseline text-2xl font-bold"
									href="/teacher/login"
								>
									Prihlásiť sa
								</Link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default RegisterForm;
