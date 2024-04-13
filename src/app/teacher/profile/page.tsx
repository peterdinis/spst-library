import { redirect } from "next/navigation";
import ProfileWrapper from "~/app/_components/student/ProfileWrapper";
import { validateRequest } from "~/server/lucia/validate-request";
import { teacherRedirects } from "~/server/utils";

export default async function ProfilePage() {
	const { user } = await validateRequest();

	if (!user) redirect(teacherRedirects.toLogin);

	return <ProfileWrapper profileData={user} />;
}
