import "~/styles/globals.css";

import { Fira_Code} from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import Navigation from "./_components/shared/Navigation";
import { Toaster } from "~/components/ui/toaster";
import { Metadata } from "next";
import ScrollToTop from "./_components/shared/ScrollToTop";
import ThemeProvider from "./_components/shared/ThemeProvider";

const inter = Fira_Code({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Spsť Knižnica",
	description: "Stránka školskej webovej knižnice",
	icons: [
		{
			rel: "icon",
			url: "https://www.spsbj.sk/wp-content/uploads/cropped-original-32x32.png",
		},
	],
} as Metadata;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${inter.variable}`}>
				<TRPCReactProvider>
					<ThemeProvider attribute="class">
						<Navigation />
						{children}
						<Toaster />
						<ScrollToTop />
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
