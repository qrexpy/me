import { Progress } from "./ui/progress";
import { LucideIcon } from "lucide-react";

export function StackProgress({
	title,
	progress,
	Icon,
}: {
	title: string;
	progress: number;
	Icon: LucideIcon;
}) {
	return (
		<div className="flex flex-col justify-center items-start gap-2">
			<span className="text-lg inline-flex items-center gap-2 text-teal-500">
				<Icon className="w-5 h-5" strokeWidth={1.5} />
				{title}
			</span>
			<Progress value={progress} className="min-w-1/2 -z-10" />
		</div>
	);
}
