import { FC } from "react";
import Header from "../shared/Header";
import Link from "next/link";

const AdminLoginForm: FC = () => {
	return (
		<>
			<Header text="Prihlásenie žiak" />
			<form>
				<div className="mb-4 flex flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md">
					<div className="mb-4">
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
								type="text"
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
								autoFocus
								autoComplete="current-password"
								placeholder="********************************************"
							/>
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
									href="/admin/register"
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

export default AdminLoginForm;
