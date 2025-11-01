import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/fumadocs-ui/dist/**/*.js",
	],
	plugins: [
		animate,
	],
	presets: [createPreset({ preset: "catppuccin", addGlobalColors: true })],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-sans)", "monospace"],
			},
			colors: {
				bg: {
					DEFAULT: "#000000",
					secondary: "#0a0a0a",
				},
				text: {
					DEFAULT: "#ffffff",
					muted: "#b0b0b0",
					accent: "#888888",
				},
				border: {
					DEFAULT: "#1a1a1a",
					hover: "#2a2a2a",
				},
			},
		},
	},
} satisfies Config;
