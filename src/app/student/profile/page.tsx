import { redirect } from "next/navigation";
import ProfileWrapper from "~/app/_components/student/ProfileWrapper";
import { validateRequest } from "~/server/lucia/validate-request";
import { studentRedirects } from "~/server/utils";

export default async function ProfilePage() {
	const {user} = await validateRequest();

	if(!user) redirect(studentRedirects.toLogin);

	return <ProfileWrapper profileData={user} />
}