import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	AiMagicIcon,
	ClosedCaptionIcon,
	DashboardSpeed01Icon,
	Download04Icon,
	ArtboardIcon,
	Layers01Icon,
	MagicWand05Icon,
	SparklesIcon,
	TextIcon,
	TimeQuarterPassIcon,
	VideoReplayIcon,
	WaveIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { NEOCUT, NEOIMAGE, type Product } from "@/site/products";

type Feature = {
	icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
	title: string;
	description: string;
};

const NEOCUT_FEATURES: Feature[] = [
	{
		icon: VideoReplayIcon,
		title: "Multi-track timeline",
		description:
			"Arrange video, audio, text and stickers across tracks. Split, trim, ripple edit and group clips into compound clips.",
	},
	{
		icon: TimeQuarterPassIcon,
		title: "Keyframe animation",
		description:
			"Animate position, scale, opacity and effect parameters over time with keyframes.",
	},
	{
		icon: SparklesIcon,
		title: "Effects, masks & transitions",
		description:
			"Blur and stylize effects, shape and freeform masks with feathering, and transitions between clips.",
	},
	{
		icon: ClosedCaptionIcon,
		title: "Auto captions",
		description:
			"Transcribe speech on your device with Whisper models, or import SRT and ASS subtitle files.",
	},
	{
		icon: DashboardSpeed01Icon,
		title: "Speed & silence removal",
		description:
			"Retime clips with audio time-stretching, and find and cut silent parts automatically.",
	},
	{
		icon: WaveIcon,
		title: "Sounds & stock media",
		description:
			"Search a library of sound effects and stock footage without leaving the editor. Export to MP4, WebM or MOV.",
	},
];

const NEOIMAGE_FEATURES: Feature[] = [
	{
		icon: Layers01Icon,
		title: "Layers, like Photoshop",
		description:
			"Stack images, text, shapes, stickers and drawings. Reorder, lock, hide, blend and adjust opacity per layer.",
	},
	{
		icon: MagicWand05Icon,
		title: "Filters & adjustments",
		description:
			"Brightness, contrast, temperature, vignette, grain and more, plus one-click presets like Vivid, Noir and Film.",
	},
	{
		icon: TextIcon,
		title: "Design like Canva",
		description:
			"Templates for every social, video and print size. 30 fonts, gradients, outlines and shadows for text.",
	},
	{
		icon: ArtboardIcon,
		title: "FreeForm canvas",
		description:
			"An infinite, Figma-style canvas with frames, shapes and a layer tree. Export each frame with its own settings.",
	},
	{
		icon: AiMagicIcon,
		title: "AI background removal",
		description:
			"Remove image backgrounds with an on-device model. Your images are never uploaded.",
	},
	{
		icon: Download04Icon,
		title: "Export anywhere",
		description:
			"PNG, JPEG or WebP at up to 3x, or real vector SVG with editable text, gradients and masks.",
	},
];

export function ProductFeatures() {
	return (
		<>
			<ProductSection product={NEOCUT} features={NEOCUT_FEATURES} />
			<ProductSection product={NEOIMAGE} features={NEOIMAGE_FEATURES} />
		</>
	);
}

function ProductSection({
	product,
	features,
}: {
	product: Product;
	features: Feature[];
}) {
	return (
		<section id={product.id} className="scroll-mt-16 border-t">
			<div className="mx-auto max-w-5xl px-6 py-24">
				<div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="flex max-w-xl flex-col gap-4">
						<div className="flex items-center gap-2">
							<Image
								src={product.logo}
								alt=""
								width={22}
								height={22}
								className="invert dark:invert-0"
							/>
							<span className="font-semibold">{product.name}</span>
							<span className="text-muted-foreground text-sm">
								· {product.kind}
							</span>
						</div>
						<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
							{product.tagline}
						</h2>
					</div>
					<Link href={product.url}>
						<Button variant="outline" className="bg-background">
							{product.host}
							<ArrowRight />
						</Button>
					</Link>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="bg-background/60 flex flex-col gap-3 rounded-xl border p-6"
						>
							<div className="bg-secondary border-secondary-border text-secondary-foreground flex size-10 items-center justify-center rounded-md border">
								<HugeiconsIcon icon={feature.icon} className="size-5" />
							</div>
							<h3 className="font-semibold">{feature.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
