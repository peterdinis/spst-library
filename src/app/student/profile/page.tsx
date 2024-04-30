import { redirect } from "next/navigation";
import ProfileWrapper from "~/app/_components/student/ProfileWrapper";
import { studentValidateRequest } from "~/server/lucia/validate-request";
import { studentRedirects } from "~/server/utils";

export default async function ProfilePage() {
	const { user } = await studentValidateRequest();
	if (!user) redirect(studentRedirects.toLogin);

	return <ProfileWrapper profileData={user} />;
}
