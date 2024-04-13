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
                  <CardTitle>Všetky knihy</CardTitle>
                  <CardDescription>
                    Počet všetkých kníh je: 100
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
              <CardHeader>
                  <CardTitle>Počet zaregistrovaných študentov</CardTitle>
                  <CardDescription>
                    Počet zaregistrovaných študentov je: 100
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
              <CardHeader>
                  <CardTitle>Počet zaregistrovaných učiteľov</CardTitle>
                  <CardDescription>
                    Počet zaregistrovaných učiteľov je: 100
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
              <CardHeader>
                  <CardTitle>Počet požičaných kníh je</CardTitle>
                  <CardDescription>
                    Počet požičaných kníh je: 100
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminProfileWrapper;
