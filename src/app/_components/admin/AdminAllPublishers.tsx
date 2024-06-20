"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { api } from "~/trpc/react";
import GlobalErrorComponent from "../shared/GlobalErrorComponent";
import { DataTable } from "../shared/GlobalTable";
import Header from "../shared/Header";
import { columns } from "./columns/publisherColumns";
import { Publisher } from "~/app/types/tableTypes";
import { getCookie } from "cookies-next";

const AdminAllPublishers: FC = () => {
  const { data, isLoading, isError } = api.publisher.fetchPublishers.useQuery();
  const router = useRouter();
  const adminCheck = getCookie("isAdminLogin");

  if (isLoading) {
    return <Loader2 className="animate-bounce w-8 h-8" />;
  }

  if (!adminCheck) {
    router.push("/not-allowed");
  }

  if (isError) {
    return (
      <GlobalErrorComponent
        statusCode="404"
        message="Vydavateľstvá neboli nájdené"
        linkHref="/admin/publishers"
        linkText="Načítať znova"
      />
    );
  }

  return (
    <div className="mt-4">
      <Header text="Zoznam všetkých vydavateľstiev" />
      <DataTable columns={columns} data={data as unknown as Publisher[]} />
    </div>
  );
};

export default AdminAllPublishers;
