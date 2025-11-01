import Image from "next/image";
import Link from "next/link";
import logo from "./icon.png";
export default function Nav() {
	return (
		<nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-border">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link
						href="/"
						className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
					>
						<Image src={logo} className="size-8 rounded" alt="qrexpy" />
						<h1 className="text-xl font-bold text-text font-mono">qrexpy</h1>
					</Link>
				</div>
			</div>
		</nav>
	);
}
