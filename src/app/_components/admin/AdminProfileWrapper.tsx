"use client";

import { FC } from "react";
import Header from "../shared/Header";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import {
  Settings,
  Book,
  Info,
  Users,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const items = [
  {
    title: "Všetky knihy",
    description: "Zoznam všetkých kníh",
    icon: <Book className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"default"}>
        <Link href="/admin/books">Všetky knihy</Link>
      </Button>
    ),
  },
  {
    title: "Všetky kategórie",
    description: "Zoznam všetkých kategórií",
    icon: <Info className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"secondary"}>
        <Link href="/admin/categories">Všetky kategórie</Link>
      </Button>
    ),
  },
  {
    title: "Všetci spisovatelia",
    description: "Zoznam všetkých spisovateľov",
    icon: <Info className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"default"}>
        <Link href="/admin/authors">Všetci spisovatelia</Link>
      </Button>
    ),
  },
  {
    title: "Všetky vydavateľstvá",
    description: "Zoznam všetkých vydavateľstiev",
    icon: <Info className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"secondary"}>
        <Link href="/admin/publishers">Všetky vydavateľstvá</Link>
      </Button>
    ),
  },

  {
    title: "Iné nastavenia",
    description: "Iné nastavenia",
    icon: <Settings className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"default"}>
        <Link href="/admin/settings">Iné nastavenia</Link>
      </Button>
    ),
  },

  {
    title: "Všetky objednávky",
    description: "Zoznam všetkých požičaných kníh",
    icon: <Book className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"secondary"}>
        <Link href="/admin/booking">Všetky objednávky</Link>
      </Button>
    ),
  },

  {
    title: "Všetci žiaci",
    description: "Zoznam všetkých žiakov",
    icon: <Users className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"default"}>
        <Link href="/admin/students">Všetci žiaci</Link>
      </Button>
    ),
  },

  {
    title: "Všetci učitelia",
    description: "Zoznam všetkých učiťeľov",
    icon: <Users className="h-4 w-4 text-neutral-500" />,
    button: (
      <Button variant={"default"}>
        <Link href="/admin/teachers">Všetci učitelia</Link>
      </Button>
    ),
  },
];

const AdminProfileWrapper: FC = () => {
  const router = useRouter();
  const adminCheck = Cookie.get("isAdminLogin");

  if (!adminCheck) {
    router.push("/not-allowed");
  }
  return (
    <>
      <Header text="Admin časť" />
      <BentoGrid className="mt-12 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            button={item.button}
            className={i === 4 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </>
  );
};

export default AdminProfileWrapper;
