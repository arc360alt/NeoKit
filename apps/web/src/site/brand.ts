export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://neokit.org";

export const SITE_INFO = {
	title: "NeoKit",
	description:
		"Open source creative tools that run in your browser. NeoCut for video, NeoImage for photos. Private, free, no account needed.",
	url: SITE_URL,
	openGraphImage: "/open-graph/default.png",
	twitterImage: "/open-graph/default.png",
	favicon: "/favicon.ico",
};

export const DEFAULT_LOGO_URL = "/logos/neokit/logo.svg";
