"use client";

import { FC } from "react";
import Header from "../shared/Header";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "~/server/lucia/actions/adminActions";

const RegisterForm: FC = () => {
	const [state, formAction] = useFormState(signup, null);

	return (
		<>
			<Header text="Registrácia admin" />
			<form action={formAction}>
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
							<input
								className="border-red text-grey-darker mb-3 w-full appearance-none rounded border px-3 py-2 shadow"
								id="Heslo"
								type="password"
								name="password"
								autoFocus
								autoComplete="current-password"
								placeholder="********************************************"
							/>
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
								Registrácia
							</button>
							<div>
								<Link
									className="text-blue hover:text-blue-darker mt-4 inline-block align-baseline text-2xl font-bold"
									href="/admin/login"
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
