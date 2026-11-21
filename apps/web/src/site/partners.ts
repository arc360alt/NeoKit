import {
	DashboardSquare03Icon,
	LaptopIcon,
	PuzzleIcon,
	QuizIcon,
} from "@hugeicons/core-free-icons";
import type { HugeiconsIcon } from "@hugeicons/react";

type Icon = Parameters<typeof HugeiconsIcon>[0]["icon"];

export type PartnerProject = {
	name: string;
	kind: string;
	icon: Icon;
	description: string;
	highlights: string[];
	url?: string;
	host?: string;
	github: string;
	githubLabel: string;
};

/** One entry on the partners page. Most hold a single project; some group a family. */
export type Partner = {
	id: string;
	title: string;
	summary?: string;
	projects: PartnerProject[];
};

export const PARTNERS: Partner[] = [
	{
		id: "pleasestudy",
		title: "PleaseStudy",
		projects: [
			{
				name: "PleaseStudy",
				kind: "Quiz game",
				icon: QuizIcon,
				description:
					"A live quiz game for classrooms and study groups. Build a quiz, host it on the big screen, or send it out as an assignment.",
				highlights: [
					"Host live games: players join with a 6-digit PIN, with or without an account, and finish on a podium",
					"Quizzes with up to 100 questions, 2–6 answers each, timers from 5 to 240 seconds and image or GIF links",
					"Assignment links with optional due dates, plus results and per-question stats",
					"A moderated public library, with scoring on the server and streak bonuses",
				],
				url: "https://study.nyxdev.app",
				host: "study.nyxdev.app",
				github: "https://github.com/arc360alt/PleaseStudy",
				githubLabel: "arc360alt/PleaseStudy",
			},
		],
	},
	{
		id: "nyxide",
		title: "NyxIDE",
		projects: [
			{
				name: "NyxIDE",
				kind: "Block coding",
				icon: PuzzleIcon,
				description:
					"A block-based coding editor built on TurboWarp, with social features so you can upload and share what you make.",
				highlights: [
					"Upload and share projects with Scratch-like social features",
					"New blocks and a completely updated costume editor",
					"A VM with a JIT compiler, so projects run fast",
					"Open source under the GPL",
				],
				url: "https://ide.nyxdev.app",
				host: "ide.nyxdev.app",
				github: "https://github.com/NyxIDE-Project",
				githubLabel: "NyxIDE-Project",
			},
		],
	},
	{
		id: "lumen",
		title: "LiquidDesktop & Lumen",
		summary:
			"A Liquid Glass desktop environment for Linux, and the operating system built around it.",
		projects: [
			{
				name: "LiquidDesktop",
				kind: "Desktop environment",
				icon: DashboardSquare03Icon,
				description:
					"A Liquid Glass desktop environment for Linux, written in plain JavaScript and run by Electron. Every icon, wallpaper and line of code is its own.",
				highlights: [
					"Glass menu bar, Dock, Control Center, Spotlight, widgets and a lock screen",
					"Window manager with edge tiling, Spaces, Mission Control and Alt+Tab",
					"Built-in apps, including a browser that runs Chrome extensions, an App Store for Flathub and Arch, and a terminal",
					"One-line installer for Arch, Debian/Ubuntu, Fedora and openSUSE",
				],
				github: "https://github.com/arc360alt/LiquidDesktop",
				githubLabel: "arc360alt/LiquidDesktop",
			},
			{
				name: "Lumen",
				kind: "Operating system",
				icon: LaptopIcon,
				description:
					"Arch Linux with LiquidDesktop, Flathub and LiquidDesktop's own login screen already set up, plus its own installer.",
				highlights: [
					"Boots straight into a live LiquidDesktop session with Install Lumen ready to go",
					"Graphical installer with NVIDIA driver setup, LUKS2 encryption and Btrfs",
					"Graphics drivers and Wi-Fi/Bluetooth firmware for current hardware",
					"Its own boot screen, Flatpak with Flathub, and zram swap",
				],
				url: "https://lumen.nyxdev.app",
				host: "lumen.nyxdev.app",
				github: "https://github.com/arc360alt/Lumen",
				githubLabel: "arc360alt/Lumen",
			},
		],
	},
];
