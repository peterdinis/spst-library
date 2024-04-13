"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { IProfileData } from "~/app/types/authTypes";
import Link from "next/link";
import { Checkbox } from "@radix-ui/react-checkbox";
import { FrameIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import DashboardLinks from "./dashboard/DashboardLinks";

interface IProfileWrapperProps {
  profileData: IProfileData;
}

const AdminProfileWrapper: FC<IProfileWrapperProps> = ({
  profileData,
}: IProfileWrapperProps) => {
  console.log(profileData);
  return (
    <>
      <Header text="Admin časť" />
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
          <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
            <DashboardLinks />
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
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminProfileWrapper;
