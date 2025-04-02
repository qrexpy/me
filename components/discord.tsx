"use client";

import { Card } from "fumadocs-ui/components/card";
import { CircleDashed, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import { type LanyardData, useLanyard } from "react-use-lanyard";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const SuspenseFallback = () => (
	<div className="rounded-md bg-teal-950/20 border-teal-800/30 w-full h-[160px] flex justify-center items-center border">loading...</div>
);

export function DiscordStatus() {
	const {
		isLoading,
		isValidating,
		error,
		data: { data: status } = {},
	} = useLanyard({
		userId: "1339988370230874164",
		apiUrl: `api.lanyard.rest`,
	});

	if (isLoading || isValidating || !status) return <SuspenseFallback />;
	
	const customStatus = status.activities.find((activity) => activity.type === 4);
	const gameActivity = status.activities.find((activity) => activity.type === 0);
	
	const statusClassMap: Record<LanyardData["discord_status"], string> = {
		online: "text-green-400",
		idle: "text-yellow-400",
		dnd: "text-red-400",
		offline: "text-gray-400",
	};

	return (
		<Card
			className="w-full h-auto min-h-[160px] transition-all duration-200 bg-teal-950/20 hover:bg-teal-900/30 border-teal-800/30"
			title={`${status.discord_user.global_name || status.discord_user.username}`}
			icon={
				<Tooltip>
					<TooltipTrigger className="relative block">
						<Image
							src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png`}
							width={48}
							height={48}
							className="rounded-full border border-teal-800/30"
							alt="Discord avatar"
						/>
						<span
							className={`absolute bottom-1 right-1 transform translate-x-1/2 translate-y-1/2 ${statusClassMap[status.discord_status]}`}
						>
							●
						</span>
					</TooltipTrigger>
					<TooltipContent className="bg-teal-950/90 border-teal-800/30 text-teal-100">{status.discord_status}</TooltipContent>
				</Tooltip>
			}
		>
			<div className="flex flex-col gap-3">
				{customStatus && (
					<div className="flex items-center gap-2 text-sm text-teal-400">
						<MessageCircle className="size-4" />
						<p className="truncate">{customStatus.state}</p>
					</div>
				)}
				{gameActivity ? (
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-3">
							{gameActivity.assets?.large_image && (
								<div className="relative flex-shrink-0">
									<Tooltip>
										<TooltipTrigger>
											<Image
												src={`https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`}
												width={48}
												height={48}
												className="rounded-md transition-transform hover:scale-105 border border-teal-800/30"
												alt={gameActivity.assets.large_text || gameActivity.name}
											/>
										</TooltipTrigger>
										<TooltipContent className="bg-teal-950/90 border-teal-800/30 text-teal-100">
											{gameActivity.assets.large_text || gameActivity.name}
										</TooltipContent>
									</Tooltip>
									{gameActivity.assets.small_image && (
										<Tooltip>
											<TooltipTrigger>
												<Image
													src={`https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.small_image}.png`}
													width={24}
													height={24}
													className="absolute -bottom-2 -right-2 rounded-full border-2 border-teal-800/30 transition-transform hover:scale-105"
													alt={gameActivity.assets.small_text || ""}
												/>
											</TooltipTrigger>
											<TooltipContent className="bg-teal-950/90 border-teal-800/30 text-teal-100">
												{gameActivity.assets.small_text}
											</TooltipContent>
										</Tooltip>
									)}
								</div>
							)}
							<div className="flex-1 min-w-0">
								<p className="font-medium truncate text-lg text-teal-100">{gameActivity.name}</p>
								{gameActivity.details && (
									<p className="text-sm text-teal-400/80 truncate">{gameActivity.details}</p>
								)}
								{gameActivity.state && (
									<p className="text-sm text-teal-400/60 truncate">{gameActivity.state}</p>
								)}
							</div>
							{gameActivity.timestamps?.start && (
								<div className="flex items-center gap-1 text-sm text-teal-400/60 whitespace-nowrap">
									<Clock className="size-3" />
									{formatElapsedTime(gameActivity.timestamps.start)}
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="flex items-center gap-2 text-teal-400/60">
						<CircleDashed className="size-4 animate-spin" />
						<p>Not doing anything</p>
					</div>
				)}
			</div>
		</Card>
	);
}

function formatElapsedTime(startTimestamp: number) {
	const now = Date.now();
	const elapsedMs = now - startTimestamp;
	const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
	const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
	return `${hours}h ${minutes}m`;
}
