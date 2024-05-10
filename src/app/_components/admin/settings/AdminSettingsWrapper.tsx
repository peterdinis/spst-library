import { FC } from "react";
import Header from "../../shared/Header";
import SettingsWrapper from "./SettingsWrapper";

const AdminSettingsWrapper: FC = () => {
    return (
        <>
            <Header text="Iné nastavenia" />
            <div className="mt-4">
                <SettingsWrapper />
            </div>
        </>
    )
}

export default AdminSettingsWrapper