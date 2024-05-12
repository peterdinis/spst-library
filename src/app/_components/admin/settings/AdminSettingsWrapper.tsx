import { FC } from "react";
import Header from "../../shared/Header";
import SettingsWrapper from "./SettingsWrapper";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const AdminSettingsWrapper: FC = () => {
    return (
        <>
            <Header text="Iné nastavenia" />
            <div className="mt-4 text-center">
                <Button variant={"link"}>
                    <Link href={"/admin/profile"}>Späť na admin profil</Link>
                </Button>
            </div>
            <div className="mt-4">
                <SettingsWrapper />
            </div>
        </>
    )
}

export default AdminSettingsWrapper