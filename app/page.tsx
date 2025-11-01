import { DiscordStatus, SuspenseFallback } from "@/components/discord";
import { StackProgress } from "@/components/stack-progress";
import { 
	Github,
	Youtube,
	FileCode2,
	Brain,
	Terminal,
	Wrench,
	Cpu,
	Code2,
	Trophy,
} from "lucide-react";
import { Suspense } from "react";
import {
	siPython,
	siTypescript,
	siJavascript,
	siOpenjdk,
	siLua,
	siGnubash,
} from 'simple-icons';

type Project = {
	name: string;
	description: string;
	link: string;
	icon: React.ReactNode;
	tech: string[];
};

type Contact = {
	name: string;
	link: string;
	display: string;
	icon: React.ReactNode;
};

type Achievement = {
	name: string;
	description: string;
	icon: React.ReactNode;
};

const SimpleIcon = ({ icon }: { icon: { path: string } }) => (
	<svg
		className="w-4 h-4"
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d={icon.path} />
	</svg>
);

export default function Home() {
	const projects: Project[] = [
		{
			name: "CommitWarden",
			description: "Discord bot managing GitHub workflows, pull requests, and repository activities directly from Discord",
			link: "https://github.com/qrexpy/CommitWarden",
			icon: <Terminal className="w-5 h-5" />,
			tech: ["TypeScript", "Discord.js"],
		},
		{
			name: "neuralpy",
			description: "Custom neural network implementation built from scratch in Python",
			link: "https://github.com/qrexpy/neuralpy",
			icon: <Brain className="w-5 h-5" />,
			tech: ["Python", "Machine Learning"],
		},
		{
			name: "APITester",
			description: "Modern web-based API testing tool with intuitive interface",
			link: "https://github.com/qrexpy/APITester",
			icon: <FileCode2 className="w-5 h-5" />,
			tech: ["TypeScript", "Web"],
		},
		{
			name: "TaskForge",
			description: "Cross-platform CLI task manager for developers",
			link: "https://github.com/qrexpy/TaskForge",
			icon: <Wrench className="w-5 h-5" />,
			tech: ["Python", "CLI"],
		},
		{
			name: "fade2",
			description: "Terminal color gradient utility for enhanced terminal aesthetics",
			link: "https://github.com/qrexpy/fade2",
			icon: <Code2 className="w-5 h-5" />,
			tech: ["Python"],
		},
		{
			name: "Unluac",
			description: "Multi-language decryption utility supporting Python, Java, and Lua",
			link: "https://github.com/qrexpy/Unluac",
			icon: <Cpu className="w-5 h-5" />,
			tech: ["Python", "Java", "Lua"],
		},
	];

	const contacts: Contact[] = [
		{
			name: "GitHub",
			link: "https://github.com/qrexpy",
			display: "qrexpy",
			icon: <Github className="w-4 h-4" />,
		},
		{
			name: "YouTube",
			link: "https://youtube.com/@qrexxed",
			display: "@qrexxed",
			icon: <Youtube className="w-4 h-4" />,
		},
	];

	const achievements: Achievement[] = [
		{
			name: "pair-extraordinaire",
			description: "GitHub Achievement",
			icon: <Trophy className="w-4 h-4" />,
		},
		{
			name: "YOLO",
			description: "GitHub Achievement",
			icon: <Trophy className="w-4 h-4" />,
		},
		{
			name: "pull-shark",
			description: "GitHub Achievement",
			icon: <Trophy className="w-4 h-4" />,
		},
		{
			name: "quickdraw",
			description: "GitHub Achievement",
			icon: <Trophy className="w-4 h-4" />,
		},
	];

	const techStack = [
		{ name: "Python", percentage: 40, icon: siPython },
		{ name: "TypeScript", percentage: 30, icon: siTypescript },
		{ name: "JavaScript", percentage: 15, icon: siJavascript },
		{ name: "Java", percentage: 2.5, icon: siOpenjdk },
		{ name: "Lua", percentage: 2.5, icon: siLua },
		{ name: "Shell / Other", percentage: 10, icon: siGnubash },
	];

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
			{/* Header */}
			<section className="space-y-4">
				<h1 className="text-4xl sm:text-5xl font-bold font-mono tracking-tight">
					qrexpy
				</h1>
				<p className="text-lg text-text-muted italic max-w-2xl">
					"To defeat evil, you must become a greater evil"
				</p>
				<div className="flex flex-wrap gap-3 text-sm text-text-muted">
					<span>developer</span>
					<span>•</span>
					<span>open source</span>
					<span>•</span>
					<span>automation</span>
					<span>•</span>
					<span>AI enthusiast</span>
				</div>
			</section>

			{/* About */}
			<section className="space-y-4">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					about
				</h2>
				<div className="space-y-3 text-text-muted leading-relaxed">
					<p>
						I'm a developer passionate about building tools that make developers' lives easier. 
						My work focuses on open source contributions, automation, AI/ML implementations, 
						and developer productivity tools.
					</p>
					<p>
						I believe in writing clean, maintainable code and solving real problems through 
						technology. Most of my projects are driven by personal needs that I hope others 
						might find useful too.
					</p>
					<p className="text-text-accent">
						400+ contributions in the past year across public and private repositories.
					</p>
				</div>
			</section>

			{/* Tech Stack */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					tech stack
				</h2>
				<div className="space-y-4">
					{techStack.map((tech) => (
						<StackProgress
							key={tech.name}
							title={tech.name}
							progress={tech.percentage}
							Icon={tech.icon ? () => <SimpleIcon icon={tech.icon!} /> : undefined}
						/>
					))}
				</div>
			</section>

			{/* Projects */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					projects
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{projects.map((project) => (
						<a
							key={project.name}
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="group block p-4 border border-border hover:border-border-hover transition-colors rounded-sm"
						>
							<div className="flex items-start gap-3 mb-2">
								<div className="text-text-muted group-hover:text-text transition-colors mt-0.5">
									{project.icon}
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-text group-hover:text-text transition-colors mb-1">
										{project.name}
									</h3>
									<p className="text-sm text-text-muted leading-relaxed">
										{project.description}
									</p>
									{project.tech.length > 0 && (
										<div className="flex flex-wrap gap-2 mt-2">
											{project.tech.map((t) => (
												<span
													key={t}
													className="text-xs px-2 py-0.5 bg-bg-secondary border border-border rounded text-text-accent"
												>
													{t}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						</a>
					))}
				</div>
			</section>

			{/* Achievements */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					achievements
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{achievements.map((achievement) => (
						<div
							key={achievement.name}
							className="p-4 border border-border rounded-sm text-center space-y-2"
						>
							<div className="flex justify-center text-text-muted">
								{achievement.icon}
							</div>
							<div>
								<p className="text-sm font-semibold text-text">{achievement.name}</p>
								<p className="text-xs text-text-muted">{achievement.description}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* GitHub Contributions */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					contributions
				</h2>
				<div className="w-full overflow-x-auto border border-border bg-bg-secondary p-4 rounded-sm">
					<img
						src="https://ghchart.rshah.org/FFFFFF/qrexpy"
						alt="GitHub Contributions"
						className="w-full h-auto"
						style={{ 
							filter: 'invert(1)',
							maxWidth: '100%',
							minWidth: '600px'
						}}
					/>
				</div>
			</section>

			{/* Activity */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					activity
				</h2>
				<Suspense fallback={<SuspenseFallback />}>
					<DiscordStatus />
				</Suspense>
			</section>

			{/* Contact / Links */}
			<section className="space-y-6">
				<h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
					links
				</h2>
				<div className="flex flex-wrap gap-4">
					{contacts.map((contact) => (
						<a
							key={contact.name}
							href={contact.link}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-border-hover transition-colors rounded-sm text-text hover:text-text transition-opacity"
						>
							{contact.icon}
							<span className="text-sm">{contact.display}</span>
						</a>
					))}
				</div>
			</section>

			{/* Footer / Gratitude */}
			<section className="pt-8 border-t border-border">
				<p className="text-sm text-text-muted text-center">
					Thanks for visiting.
				</p>
			</section>
		</div>
	);
}
