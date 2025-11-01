"use client";

import { CircleDashed, Clock, MessageCircle, Music } from "lucide-react";
import Image from "next/image";
import { type LanyardData, useLanyard } from "react-use-lanyard";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

export const SuspenseFallback = () => (
	<div className="border border-border bg-bg-secondary w-full h-[160px] flex justify-center items-center text-text-muted text-sm">
		loading...
	</div>
);

export function DiscordStatus() {
	const {
		isLoading,
		isValidating,
		error,
		data: { data: status } = {},
	} = useLanyard({
		userId: "1082690591156088932",
		apiUrl: `api.lanyard.rest`,
	});

	if (isLoading || isValidating || !status) return <SuspenseFallback />;
	
	const customStatus = status.activities.find((activity) => activity.type === 4);
	const gameActivity = status.activities.find((activity) => activity.type === 0);
	const spotifyActivity = status.activities.find((activity) => activity.type === 2);
	
	const statusClassMap: Record<LanyardData["discord_status"], string> = {
		online: "text-green-500",
		idle: "text-yellow-500",
		dnd: "text-red-500",
		offline: "text-text-muted",
	};

	return (
		<div className="w-full p-4 border border-border bg-bg-secondary hover:border-border-hover transition-colors">
			<div className="flex items-center gap-4 mb-4">
				<Tooltip>
					<TooltipTrigger className="relative flex items-center justify-center flex-shrink-0 w-20 h-20">
						<Image
							src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png`}
							width={64}
							height={64}
							className="rounded-full relative z-10"
							alt="Discord avatar"
						/>
						{status.discord_user.avatar_decoration_data && (
							<Image
								src={`https://cdn.discordapp.com/avatar-decoration-presets/${status.discord_user.avatar_decoration_data.asset}.png`}
								width={80}
								height={80}
								className="absolute inset-0 pointer-events-none z-20"
								alt="Avatar decoration"
							/>
						)}
						<span
							className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-bg ${statusClassMap[status.discord_status]} bg-current z-30`}
						/>
					</TooltipTrigger>
					<TooltipContent className="bg-bg-secondary border border-border text-text">{status.discord_status}</TooltipContent>
				</Tooltip>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-text">
						{status.discord_user.global_name || status.discord_user.username}
					</h3>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{customStatus && (
					<div className="flex items-center gap-2 text-sm text-text-muted">
						<MessageCircle className="size-4" />
						<p className="truncate">{customStatus.state}</p>
					</div>
				)}
				{spotifyActivity && status.spotify ? (
					<SpotifyPlayer spotify={status.spotify} activityName={spotifyActivity.name} />
				) : gameActivity ? (
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
												className="rounded border border-border transition-transform hover:scale-105"
												alt={gameActivity.assets.large_text || gameActivity.name}
											/>
										</TooltipTrigger>
										<TooltipContent className="bg-bg-secondary border border-border text-text">
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
													className="absolute -bottom-1 -right-1 rounded-full border-2 border-bg transition-transform hover:scale-105"
													alt={gameActivity.assets.small_text || ""}
												/>
											</TooltipTrigger>
											<TooltipContent className="bg-bg-secondary border border-border text-text">
												{gameActivity.assets.small_text}
											</TooltipContent>
										</Tooltip>
									)}
								</div>
							)}
							<div className="flex-1 min-w-0">
								<p className="font-medium truncate text-base text-text">{gameActivity.name}</p>
								{gameActivity.details && (
									<p className="text-sm text-text-muted truncate">{gameActivity.details}</p>
								)}
								{gameActivity.state && (
									<p className="text-sm text-text-accent truncate">{gameActivity.state}</p>
								)}
							</div>
							{gameActivity.timestamps?.start && (
								<div className="flex items-center gap-1 text-sm text-text-accent whitespace-nowrap">
									<Clock className="size-3" />
									{formatElapsedTime(gameActivity.timestamps.start)}
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="flex items-center gap-2 text-text-muted">
						<CircleDashed className="size-4 animate-spin" />
						<p className="text-sm">Not doing anything</p>
					</div>
				)}
			</div>
		</div>
	);
}

function SpotifyPlayer({ 
	spotify, 
	activityName 
}: { 
	spotify: NonNullable<LanyardData["spotify"]>; 
	activityName: string;
}) {
	const [currentTime, setCurrentTime] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const startTime = spotify.timestamps?.start || 0;
	const endTime = spotify.timestamps?.end || 0;
	const duration = endTime - startTime;
	const progress = duration > 0 ? ((currentTime - startTime) / duration) * 100 : 0;
	const clampedProgress = Math.max(0, Math.min(100, progress));

	const formatTime = (timestamp: number) => {
		const totalSeconds = Math.floor(timestamp / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const getCurrentElapsed = () => {
		const elapsed = currentTime - startTime;
		return formatTime(Math.max(0, elapsed));
	};

	const getTotalDuration = () => {
		return formatTime(duration);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-3">
				{spotify.album_art_url && (
					<div className="relative flex-shrink-0">
						<Tooltip>
							<TooltipTrigger>
								<Image
									src={spotify.album_art_url}
									width={48}
									height={48}
									className="rounded border border-border transition-transform hover:scale-105"
									alt={spotify.album || "Album art"}
								/>
							</TooltipTrigger>
							<TooltipContent className="bg-bg-secondary border border-border text-text">
								{spotify.album}
							</TooltipContent>
						</Tooltip>
					</div>
				)}
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<Music className="size-4 text-text-muted" />
						<p className="font-medium truncate text-base text-text">{activityName}</p>
					</div>
					{spotify.song && (
						<p className="text-sm text-text-muted truncate">{spotify.song}</p>
					)}
					{spotify.artist && (
						<p className="text-sm text-text-accent truncate">by {spotify.artist}</p>
					)}
					{spotify.album && (
						<p className="text-xs text-text-accent truncate">on {spotify.album}</p>
					)}
				</div>
			</div>
			{spotify.timestamps?.start && spotify.timestamps?.end && (
				<div className="flex flex-col gap-1">
					<Progress value={clampedProgress} className="h-1" />
					<div className="flex items-center justify-between text-xs text-text-muted">
						<span>{getCurrentElapsed()}</span>
						<span>{getTotalDuration()}</span>
					</div>
				</div>
			)}
		</div>
	);
}

function formatElapsedTime(startTimestamp: number) {
	const now = Date.now();
	const elapsedMs = now - startTimestamp;
	const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
	const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
	return `${hours}h ${minutes}m`;
}
