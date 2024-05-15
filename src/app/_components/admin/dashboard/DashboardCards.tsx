import { FC } from "react";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";

const DashboardCards: FC = () => {
	return (
		<div className="grid gap-3">
			<Card>
				<CardHeader>
					<CardTitle>
						<Link href="/admin/books">Všetky knihy</Link>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<Link href="/admin/categories">Všetky kategórie</Link>
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
						<Link href="/admin/authors">Všetky spisovatelia</Link>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<Link href="/admin/students">Všetky študenti</Link>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<Link href="/admin/teachers">Všetky učitelia</Link>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<Link href="/admin/bookings">Všetky objednávky</Link>
					</CardTitle>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						<Link href="/admin/settings">Iné nastavenia</Link>
					</CardTitle>
				</CardHeader>
			</Card>
		</div>
	);
};

export default DashboardCards;
