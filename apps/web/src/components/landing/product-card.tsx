"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import type { Product } from "@/site/products";
import { cn } from "@/utils/ui";
import { Handlebars } from "./handlebars";
import { CropBox } from "./crop-box";
import { ScatterBoard } from "./scatter-board";

export function ProductCard({ product }: { product: Product }) {
	const demo = {
		neocut: {
			node: <Handlebars>{product.kind}</Handlebars>,
			hint: "Drag the handles to trim",
		},
		neoimage: {
			node: <CropBox>{product.kind}</CropBox>,
			hint: "Drag to crop",
		},
		scatter: { node: <ScatterBoard />, hint: "Drag the cards around" },
	}[product.id];

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
				<span
					className={cn(
						"rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
						product.id === "scatter"
							? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
							: "bg-secondary border-secondary-border text-secondary-foreground",
					)}
				>
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
				{product.id === "scatter" ? (
					demo.node
				) : (
					<div className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
						{demo.node}
					</div>
				)}
				<span className="text-muted-foreground pointer-events-none absolute bottom-2 text-xs">
					{demo.hint}
				</span>
			</div>

			<p className="text-muted-foreground flex-1 px-6 pt-5 text-sm leading-relaxed">
				{product.description}
			</p>

			<div className="flex flex-wrap gap-3 p-6">
				<Link href={product.url}>
					<Button size="lg" className="h-10 px-4 text-base">
						{product.cta}
						<ArrowRight className="ml-0.5" />
					</Button>
				</Link>
				<Link href={product.github} target="_blank" rel="noopener noreferrer">
					<Button size="lg" variant="outline" className="h-10 px-4 text-base">
						<HugeiconsIcon icon={GithubIcon} />
						Source
					</Button>
				</Link>
			</div>
		</div>
	);
}
