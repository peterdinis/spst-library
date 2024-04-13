import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "~/components/ui/input";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "~/components/ui/card";

const DashboardCards: FC = () => {
	return (
		<div className="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Project Name</CardTitle>
					<CardDescription>
						Used to identify your project in the dashboard.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<Input placeholder="Project Name" />
					</form>
				</CardContent>
				<CardFooter className="border-t p-6">
					<Button>Save</Button>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Root Directory</CardTitle>
					<CardDescription>
						The directory within your project, in which your code is
						located.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-4">
						<Input placeholder="Project Name" />
						<div className="flex items-center space-x-2">
							<Checkbox defaultChecked id="include" />
							<label
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								htmlFor="include"
							>
								Include files from outside of the Root Directory
							</label>
						</div>
					</form>
				</CardContent>
				<CardFooter className="border-t p-6">
					<Button>Save</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default DashboardCards;
