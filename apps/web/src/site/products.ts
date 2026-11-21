export type Product = {
	id: "neocut" | "neoimage" | "scatter";
	name: string;
	kind: string;
	url: string;
	host: string;
	logo: string;
	github: string;
	tagline: string;
	description: string;
	cta: string;
};

export const PRODUCTS: Product[] = [
	{
		id: "neocut",
		name: "NeoCut",
		kind: "Video editor",
		url: "https://cut.neokit.org",
		host: "cut.neokit.org",
		logo: "/logos/products/neocut.svg",
		github: "https://github.com/arc360alt/opencut-classic-1",
		tagline: "The privacy-first video editor that feels simple to use.",
		description:
			"A simple but powerful video editor that gets the job done. Multi-track timeline, keyframes, effects, transitions and on-device captions.",
		cta: "Open NeoCut",
	},
	{
		id: "neoimage",
		name: "NeoImage",
		kind: "Photo editor",
		url: "https://image.neokit.org",
		host: "image.neokit.org",
		logo: "/logos/products/neoimage.svg",
		github: "https://github.com/arc360alt/OpenImage",
		tagline: "Canva's ease of use with Photoshop-style layers.",
		description:
			"Edit photos and design graphics with layers, filters, text and AI background removal. Fixed-size or infinite FreeForm canvases.",
		cta: "Open NeoImage",
	},
	{
		id: "scatter",
		name: "Scatter",
		kind: "Organisation",
		url: "https://scatter.neokit.org",
		host: "scatter.neokit.org",
		logo: "/logos/products/scatter.svg",
		github: "https://github.com/arc360alt/scatter",
		tagline: "A freeform corkboard for everything you're juggling.",
		description:
			"Scatter notes, todo lists and kanban boards on one draggable canvas, with a local AI assistant that reads your cards and helps you plan.",
		cta: "Open Scatter",
	},
];

export const NEOCUT = PRODUCTS[0];
export const NEOIMAGE = PRODUCTS[1];
export const SCATTER = PRODUCTS[2];
