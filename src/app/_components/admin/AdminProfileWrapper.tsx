"use client";

import { FC, useEffect } from "react";
import Header from "../shared/Header";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import DashboardLinks from "./dashboard/DashboardLinks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAdminCookie from "~/hooks/useAdminCookie";

const AdminProfileWrapper: FC = () => {
	const router = useRouter();

	const adminCookie = useAdminCookie();

	useEffect(() => {
		if(!adminCookie) {
			router.push("/admin/login");
		}
	}, [adminCookie]);
	return (
		<>
			<Header text="Admin časť" />
			<div className="flex flex-col min-h-screen w-full">
				<main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
					<div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start gap-6 max-w-6xl w-full mx-auto">
						<DashboardLinks />
						<div className="grid gap-3">
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/books">
											Všetky knihy
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/categories">
											Všetky kategórie
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/publishers">
											Všetky vydavateľstvá
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/authors">
											Všetky spisovatelia
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/students">
											Všetky študenti
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/teachers">
											Všetky učitelia
										</Link>
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>
										<Link href="/admin/bookings">
											Všetky objednávky
										</Link>
									</CardTitle>
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
