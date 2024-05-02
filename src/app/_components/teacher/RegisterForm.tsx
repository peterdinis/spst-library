"use client";

import { FC, useState } from "react";
import Header from "../shared/Header";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TEACHER } from "~/server/constants";
import { IRegisterType } from "~/app/types/authTypes";

const RegisterForm: FC = () => {
	const { register, handleSubmit } = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const addNewTeacherMut = useMutation({
		mutationKey: ["registerTeacher"],
		mutationFn: async (data: IRegisterType) => {
			return await axios.post(process.env.NEXT_PUBLIC_AUTH_API + "auth/register", data)
		},
		onSuccess: () => {
			toast({
				title: "Registrácia bola úspešná",
				duration: 2000,
				className: "bg-green-500 text-white"
			})
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


	const onStudentSubmit = async(data: FieldValues) => {
		await addNewTeacherMut.mutateAsync({
			name: data.name,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			isActive: true,
            hasAdminRights: false,
            role: "TEACHER"
		})
	}
	return (
		<>
			<Header text="Registrácia učiteľ" />
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
								})}
								placeholder="Email"
							/>
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
										minLength: 5, // Mala byť minLength namiesto min
									})}
									autoFocus
									autoComplete="current-password"
									placeholder="********************************************"
								/>
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
								Registrácia
							</button>
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
