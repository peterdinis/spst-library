"use client"

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
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
            href="#"
          >
            <FrameIcon className="w-6 h-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Projects
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Deployments
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Analytics
            </Link>
            <Link className="text-gray-500 dark:text-gray-400" href="#">
              Logs
            </Link>
            <Link className="font-bold" href="#">
              Settings
            </Link>
          </nav>
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Button
              className="rounded-full ml-auto"
              size="icon"
              variant="ghost"
            >
              <img
                alt="Avatar"
                className="rounded-full border"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
          <div className="max-w-6xl w-full mx-auto grid gap-2">
            <h1 className="font-semibold text-3xl">Settings</h1>
          </div>
          <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
            <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
              <Link
                className="font-semibold text-gray-900 dark:text-gray-50"
                href="#"
              >
                General
              </Link>
              <Link href="#">Domains</Link>
              <Link href="#">Log Drains</Link>
              <Link href="#">Webhooks</Link>
              <Link href="#">Integrations</Link>
              <Link href="#">Security</Link>
              <Link href="#">Advanced</Link>
            </nav>
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
