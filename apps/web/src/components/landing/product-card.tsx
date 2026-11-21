"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import type { Product } from "@/site/products";
import { Handlebars } from "./handlebars";
import { CropBox } from "./crop-box";

export function ProductCard({ product }: { product: Product }) {
	const Demo = product.id === "neocut" ? Handlebars : CropBox;
	const hint =
		product.id === "neocut" ? "Drag the handles to trim" : "Drag to crop";

	return (
		<div className="bg-background/70 flex flex-col overflow-hidden rounded-xl border backdrop-blur">
			<div className="flex items-center justify-between gap-3 px-6 pt-6">
				<div className="flex items-center gap-3">
					<Image
						src={product.logo}
						alt=""
						width={28}
						height={28}
						className="invert dark:invert-0"
					/>
					<div className="flex flex-col">
						<span className="text-lg leading-tight font-semibold">
							{product.name}
						</span>
						<span className="text-muted-foreground text-sm">
							{product.host}
						</span>
					</div>
				</div>
				<span className="bg-secondary border-secondary-border text-secondary-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium">
					{product.kind}
				</span>
			</div>

			<div className="relative mx-6 mt-5 flex h-40 flex-col items-center justify-center overflow-hidden rounded-lg border">
				<div
					aria-hidden
					className="absolute inset-0 opacity-50"
					style={{
						backgroundImage:
							"linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				<div className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
					<Demo>{product.kind}</Demo>
				</div>
				<span className="text-muted-foreground absolute bottom-2 text-xs">
					{hint}
				</span>
			</div>

			<p className="text-muted-foreground flex-1 px-6 pt-5 text-sm leading-relaxed">
				{product.description}
			</p>

			<div className="flex flex-wrap gap-3 p-6">
				<Link href={product.url}>
					<Button size="lg" className="h-10 text-base">
						{product.cta}
						<ArrowRight className="ml-0.5" />
					</Button>
				</Link>
				<Link href={product.github} target="_blank" rel="noopener noreferrer">
					<Button size="lg" variant="outline" className="h-10 text-base">
						<HugeiconsIcon icon={GithubIcon} />
						Source
					</Button>
				</Link>
			</div>
		</div>
	);
}
