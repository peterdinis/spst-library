import { Link, ArrowUpRight, Table, Badge } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "~/components/ui/card";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "~/components/ui/table";

const BookingsTable: FC = () => {
	return (
		<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
			<Card className="xl:col-span-2">
				<CardHeader className="flex flex-row items-center">
					<div className="grid gap-2">
						<CardTitle>Transactions</CardTitle>
						<CardDescription>
							Recent transactions from your store.
						</CardDescription>
					</div>
					<Button asChild size="sm" className="ml-auto gap-1">
						<Link href="#">
							View All
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden xl:table-column">Type</TableHead>
								<TableHead className="hidden xl:table-column">Status</TableHead>
								<TableHead className="hidden xl:table-column">Date</TableHead>
								<TableHead className="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Sale</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs">Approved</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-23
								</TableCell>
								<TableCell className="text-right">$250.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Olivia Smith</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										olivia@example.com
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Refund</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs">Declined</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-24
								</TableCell>
								<TableCell className="text-right">$150.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Noah Williams</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										noah@example.com
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">
									Subscription
								</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs">Approved</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-25
								</TableCell>
								<TableCell className="text-right">$350.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Emma Brown</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										emma@example.com
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Sale</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs">Approved</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-26
								</TableCell>
								<TableCell className="text-right">$450.00</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<div className="font-medium">Liam Johnson</div>
									<div className="hidden text-sm text-muted-foreground md:inline">
										liam@example.com
									</div>
								</TableCell>
								<TableCell className="hidden xl:table-column">Sale</TableCell>
								<TableCell className="hidden xl:table-column">
									<Badge className="text-xs">Approved</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
									2023-06-27
								</TableCell>
								<TableCell className="text-right">$550.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default BookingsTable;
