import { FC } from "react";
import Header from "../shared/Header";
import DashboardCards from "./dashboard/DashboardCards";
import { IProfileData } from "~/app/types/authTypes";

interface IProfileWrapperProps {
	profileData: IProfileData;
}

const AdminProfileWrapper: FC<IProfileWrapperProps> = ({profileData}: IProfileWrapperProps) => {
	console.log(profileData);
	return (
		<>
			<Header text="Admin časť" />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<DashboardCards />
			</main>
		</>
	);
};

export default AdminProfileWrapper;
