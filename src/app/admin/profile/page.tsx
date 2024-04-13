import { redirect } from "next/navigation";
import AdminProfileWrapper from "~/app/_components/admin/AdminProfileWrapper";
import { validateRequest } from "~/server/lucia/validate-request";
import { adminRedirects } from "~/server/utils";

export default async function ProfilePage() {
	const { user } = await validateRequest();

	/* if (!user) redirect(adminRedirects.toLogin); */

	return <AdminProfileWrapper profileData={user} />;
}
