import { Settings, ShieldCheck, ShieldBan } from "lucide-react";
import React, { FC } from "react";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";
import { Button } from "~/components/ui/button";
import SettingsModal from "./SettingsModal";

const SettingsWrapper: FC = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          icon={item.icon}
          button={item.button}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Nastaviť admin práva emailu",
    description: "Tu sa nastavuju admin práva pre učiteľský účet",
    icon: <Settings className="h-4 w-4 text-neutral-500" />,
    button: <Button variant={"default"}>
        <SettingsModal />
    </Button>
  },
  {
    title: "Vymazať účet",
    description: "Vymazanie jedného účtu",
    icon: <ShieldCheck className="h-4 w-4 text-neutral-500" />,
    button: <Button variant={"secondary"}><SettingsModal /></Button>
  },
  {
    title: "Dekativovať účet",
    description: "Deaktivovanie jedného účtu",
    icon: <ShieldBan className="h-4 w-4 text-neutral-500" />,
    button: <Button variant={"default"}><SettingsModal /></Button>
  },
  {
    title: "Odobrať admin práva",
    description:
      "Tu sa odoberajú admin práva.",
    icon: <Settings className="h-4 w-4 text-neutral-500" />,
    button: <Button variant={"secondary"}><SettingsModal /></Button>
  },
];


export default SettingsWrapper;