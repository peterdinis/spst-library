import { redirect } from "next/navigation";
import LoginForm from "~/app/_components/student/LoginForm";
import { validateRequest } from "~/server/lucia/validate-request";
import { studentRedirects } from "~/server/utils";

export default async function LoginPage() {
	const { user } = await validateRequest();

	if (user) redirect(studentRedirects.afterLogin);

	return <LoginForm />;
}
