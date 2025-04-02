import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "./nav";

const sans = Inter({ 
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap"
});

export const metadata: Metadata = {
	title: "Qrexxed",
	description: "Personal Portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${sans.variable} dark`}>
			<body className="font-sans antialiased bg-base text-text font-medium h-screen flex flex-col overflow-x-hidden selection:bg-surface2/60">
				<TooltipProvider>
					<Nav />
					<main className="mt-20 px-2">{children}</main>
				</TooltipProvider>
				<Analytics />
			</body>
		</html>
	);
}
