import { DiscordStatus, SuspenseFallback } from "@/components/discord";
import { StackProgress } from "@/components/stack-progress";
import { Card } from "fumadocs-ui/components/card";
import { 
	type LucideIcon,
	Mail, 
	MapPin, 
	Sparkles,
	FileCode2,
	Braces,
	Terminal,
	FileJson,
	Code2,
	Coffee,
	Cpu,
	FileType
} from "lucide-react";
import { forwardRef, Suspense } from "react";
import {
	Assembly,
	Cpp,
	Discord,
	Elixir,
	GitHub,
	Golang,
	HTML,
	Java,
	JavaScript,
	Python,
	TypeScript,
} from "./icons";
import {
	siJavascript,
	siPython,
	siGo,
	siHtml5,
	siCplusplus,
	siTypescript,
	siAssemblyscript,
	siOpenjdk as siJava
} from 'simple-icons';

// Convert SimpleIcon to React component
const SimpleIcon = ({ icon }: { icon: { path: string, hex: string } }) => {
	return forwardRef<SVGSVGElement, { className?: string }>(({ className }, ref) => (
		<svg
			ref={ref}
			role="img"
			viewBox="0 0 24 24"
			className={className}
			fill="currentColor"
			width="16"
			height="16"
		>
			<path d={icon.path} />
		</svg>
	));
};

type Contact = {
	name: string;
	link: string;
	display: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
};
export default function Home() {
	const projects: {
		name: string;
		description: string;
		link: string;
		Icon?: React.FC<React.SVGProps<SVGSVGElement>> | LucideIcon;
	}[] = [
		{
			name: "neural.py",
			description: "A neural network implementation built from scratch in Python",
			link: "qrexpy/neuralpy",
			Icon: Cpu,
		},
		{
			name: "StocksPredictor",
			description: "AI-powered stock market prediction tool",
			link: "qrexpy/StocksPredictor",
			Icon: Sparkles,
		}
	];
	const contact: Contact[] = [
		{
			name: "Discord",
			link: "https://discord.com/users/1339988370230874164",
			display: "qrexxed",
			Icon: Discord,
		},
		{
			name: "GitHub",
			link: "https://github.com/qrexpy",
			display: "qrexpy",
			Icon: GitHub,
		}
	];
	
	const calculateDaysUntilBirthday = () => {
		const today = new Date();
		const birthday = new Date(today.getFullYear(), 0, 10); // Jan 10
		
		if (today > birthday) {
			birthday.setFullYear(birthday.getFullYear() + 1);
		}
		
		const diffTime = Math.abs(birthday.getTime() - today.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	return (
		<div className="p-2 flex flex-col text-md gap-2 bg-teal-900/10">
			<section>
				<div>
					I'm Qrexxed, a fullstack developer passionate about technology and innovation
				</div>
			</section>
			<div className="flex w-full md:flex-row flex-col">
				<section className="md:w-1/2 flex flex-col gap-2">
					<h2 className="text-2xl font-bold text-teal-600">basic information of me</h2>
					<ul className="list-disc list-inside">
						<li>Birthday: Jan 10</li>
						<li>Interested in LLMs and cybersecurity</li>
					</ul>
					<h2 className="mt-3 text-2xl font-bold text-teal-600">projects</h2>
					<div className="flex flex-wrap gap-2">
						{projects.map(({ Icon, ...project }) => (
							<Card
								className="w-56 bg-teal-950/20 hover:bg-teal-900/30 border-teal-800/30 transition-colors"
								title={project.name}
								description={project.description}
								href={`https://github.com/${project.link}`}
								key={project.name}
								icon={Icon && <Icon className="text-teal-500" />}
							/>
						))}
					</div>
				</section>
				<section className="mt-3 md:w-1/2 flex flex-col gap-2">
					<h2 className="text-2xl font-bold text-teal-600">languages/stack</h2>
					<div className="grid grid-cols-2 w-full gap-2">
						<StackProgress 
							title="JavaScript" 
							progress={80} 
							Icon={SimpleIcon({ icon: siJavascript })} 
						/>
						<StackProgress 
							title="Python" 
							progress={90} 
							Icon={SimpleIcon({ icon: siPython })} 
						/>
						<StackProgress 
							title="GO" 
							progress={40} 
							Icon={SimpleIcon({ icon: siGo })} 
						/>
						<StackProgress 
							title="HTML" 
							progress={74} 
							Icon={SimpleIcon({ icon: siHtml5 })} 
						/>
					</div>
					<h2 className="mt-5 text-2xl font-bold text-teal-600">additional knowledge</h2>
					<div className="grid grid-cols-2 w-full gap-2">
						<StackProgress 
							title="C++" 
							progress={20} 
							Icon={SimpleIcon({ icon: siCplusplus })} 
						/>
						<StackProgress 
							title="TypeScript" 
							progress={37} 
							Icon={SimpleIcon({ icon: siTypescript })} 
						/>
						<StackProgress 
							title="Assembly" 
							progress={5} 
							Icon={SimpleIcon({ icon: siAssemblyscript })} 
						/>
						<StackProgress 
							title="Java" 
							progress={21} 
							Icon={SimpleIcon({ icon: siJava })} 
						/>
					</div>
				</section>
			</div>
			<hr className="mt-3"/>
			<h2 className="text-2xl font-bold text-teal-600">activity</h2>
			<Suspense fallback={<SuspenseFallback />}>
				<DiscordStatus />
			</Suspense>

			<h2 className="mt-3 text-2xl font-bold text-teal-600">contact</h2>
			<div className="flex flex-wrap gap-4 justify-center sm:justify-start">
				{contact.map(({ name, display, link, Icon }) => (
					<Card
						className="w-full sm:w-56 flex-shrink-0 flex-grow bg-teal-950/20 hover:bg-teal-900/30 border-teal-800/30 transition-colors"
						title={name}
						description={display}
						href={link}
						icon={<Icon className="size-6 text-teal-500" />}
						key={name}
					/>
				))}
			</div>
		</div>
	);
}
