"use client"

import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const Settings: FC = () => {
    const [isEditable, setIsEditable] = useState(false);
    return (
        <Card>
        <Button className="pt-4 ml-4 mt-8" variant={"link"} type="button" onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? 'Zrušiť' : 'Upraviť profil'}
        </Button>
            <CardHeader>
                <h2 className="text-xl font-bold">Contact</h2>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    Your contact information
                </p>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <Input
                            defaultValue="Alice Smith"
                            id="name"
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <Input
                            defaultValue="alice.smith@example.com"
                            id="email"
                            readOnly={!isEditable}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none"
                            htmlFor="phone"
                        >
                            Phone
                        </label>
                        <Input readOnly={!isEditable} id="phone" placeholder="Phone" />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none"
                            htmlFor="address"
                            
                        >
                            Address
                        </label>
                        <Input readOnly={!isEditable} id="address" placeholder="Address" />
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default Settings;