"use client";

import { FC, useState } from "react";
import Header from "../shared/Header";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ILoginType } from "~/app/types/authTypes";
import Cookie from "js-cookie";

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();

	const loginTeacherMut = useMutation({
		mutationKey: ["loginTeacher"],
		mutationFn: async (data: ILoginType) => {
			return await axios.post(
				process.env.NEXT_PUBLIC_AUTH_API + "auth/login",
				data,
			);
		},
		onSuccess: (data) => {
			Cookie.set("teacherD", JSON.stringify(data?.data?.user));
			toast({
				title: "Prihlásenie bolo úspešné",
				duration: 2000,
				className: "bg-green-500 text-white",
			});
			Cookie.set("isTeacherLogin", "true");
			window.location.replace("/teacher/profile");
			window.location.replace("/teacher/profile");
		},

		onError: () => {
			toast({
				title: "Prihlásenie nebolo úspešné",
				duration: 2000,
				className: "bg-red-500 text-white",
			});
		},
	});

	const onStudentSubmit = async (data: FieldValues) => {
		await loginTeacherMut.mutateAsync({
			name: data.name,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		});
	};
	return (
		<>
			<Header text="Prihlásenie učiteľ" />
			<form onSubmit={handleSubmit(onStudentSubmit)}>
				<div className="mb-4 flex flex-col rounded mt-6 bg-white dark:bg-card px-8 pb-8 pt-6 shadow-md">
					<div className="mb-4">
						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="password"
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
								htmlFor="password"
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
										Priezivsko je povinné
									</span>
								)}
							{errors.lastName &&
								errors.lastName.type === "minLength" && (
									<span className="text-red-500">
										Priezivsko musí mať minimálne 5 znakov
									</span>
								)}
						</div>
						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="password"
							>
								Email
							</label>
							<input
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 dark:text-black shadow"
								id="Email"
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
							<button
								className="mt-4 rounded-lg bg-red-700 p-2 text-white"
								type="submit"
							>
								Prihlásenie
							</button>
							<div>
								<Link
									className="text-blue hover:text-blue-darker mt-4 inline-block align-baseline text-2xl font-bold"
									href="/teacher/register"
								>
									Registrácia
								</Link>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
