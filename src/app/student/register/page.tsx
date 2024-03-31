import { redirect } from "next/navigation";
import RegisterForm from "~/app/_components/student/RegisterForm";
import { validateRequest } from "~/server/lucia/validate-request";
import { studentRedirects } from "~/server/utils";

export default async function SignupPage() {
	const { user } = await validateRequest();
  
	if (user) redirect(studentRedirects.toLogin);
  
	return <RegisterForm />;
  }
  