"use client";

import { FC, useState } from "react";
import Header from "../shared/Header";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "~/server/lucia/actions/teacherActions";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";

const RegisterForm: FC = () => {
	const [state, formAction] = useFormState(login, null);
	const [showPassword, setShowPassword] = useState(false);
	const { toast } = useToast();

	const handleLoginSubmit = (e: any) => {
		formAction(e);
		toast({
			title: "Prihlásenie bolo úspešné",
			duration: 2000,
			className: "bg-green-500 text-white",
		});
	};
	return (
		<>
			<Header text="Prihlásenie učiteľ" />
			<form onSubmit={handleLoginSubmit}>
				<div className="mb-4 flex flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md">
					<div className="mb-4">
						<div className="mb-2">
							<label
								className="text-grey-darker mb-2 block text-sm font-bold"
								htmlFor="password"
							>
								Meno
							</label>
							<input
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 shadow"
								id="name"
								type="text"
								name="name"
								autoFocus
								placeholder="Meno"
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
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 shadow"
								id="lastName"
								type="text"
								name="lastName"
								autoFocus
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
								className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 shadow"
								id="Email"
								type="email"
								name="email"
								autoFocus
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
									className="passwordInput border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 shadow"
									id="password"
									type={showPassword ? "text" : "password"}
									name="password"
									autoFocus
									autoComplete="current-password"
									placeholder="********************************************"
								/>
								<button
									className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent text-gray-500 focus:outline-none"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? <EyeOff /> : <Eye />}
								</button>
							</div>
						</div>

						{state?.fieldError ? (
							<ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
								{Object.values(state.fieldError).map((err) => (
									<li className="ml-4" key={err}>
										{err}
									</li>
								))}
							</ul>
						) : state?.formError ? (
							<p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
								{state?.formError}
							</p>
						) : null}
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

export default RegisterForm;
