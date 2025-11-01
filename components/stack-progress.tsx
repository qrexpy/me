import { Progress } from "./ui/progress";

export function StackProgress({
	title,
	progress,
	Icon,
}: {
	title: string;
	progress: number;
	Icon?: React.ComponentType<{ className?: string }>;
}) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<div className="inline-flex items-center gap-2 text-sm">
					{Icon && <Icon className="w-4 h-4 text-text-muted" />}
					<span className="text-text font-medium">{title}</span>
				</div>
				<span className="text-xs text-text-muted">{progress}%</span>
			</div>
			<Progress value={progress} />
		</div>
	);
}
