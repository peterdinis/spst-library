"use client";

import { FC } from "react";
import { ICookieAuthType } from "~/app/types/authTypes";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface IStettingProps {
  studentCookie: ICookieAuthType;
}

const Settings: FC<IStettingProps> = ({ studentCookie }: IStettingProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Môj profil</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="name">
              Meno
            </label>
            <Input disabled={true} id="name" value={studentCookie?.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <Input disabled={true} id="email" value={studentCookie?.email} />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="priezvisko"
            >
              Priezvisko
            </label>
            <Input
              id="priezvisko"
              placeholder="Priezvisko"
              value={studentCookie?.lastName}
              disabled={true}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Settings;
