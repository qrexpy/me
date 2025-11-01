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
	title: "qrexpy",
	description: "Developer portfolio - Open source, automation, AI, and developer productivity tools",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${sans.variable}`}>
			<body className="font-sans antialiased bg-bg text-text min-h-screen flex flex-col overflow-x-hidden">
				<TooltipProvider>
					<Nav />
					<main className="flex-1">{children}</main>
				</TooltipProvider>
				<Analytics />
			</body>
		</html>
	);
}
