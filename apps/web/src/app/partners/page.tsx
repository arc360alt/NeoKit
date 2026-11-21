import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BasePage } from "../base-page";
import { Button } from "@/components/ui/button";
import { PARTNERS, type PartnerProject } from "@/site/partners";
import { SITE_URL } from "@/site/brand";
import { cn } from "@/utils/ui";

export const metadata: Metadata = {
	title: "Other Partners · NeoKit",
	description:
		"More open source projects alongside NeoKit: PleaseStudy, NyxIDE, LiquidDesktop and Lumen.",
	alternates: {
		canonical: `${SITE_URL}/partners`,
	},
};

export default function PartnersPage() {
	return (
		<BasePage
			maxWidth="5xl"
			title="Other Partners"
			description="More open source projects that sit alongside NeoKit, separate from NeoCut, NeoImage and Scatter."
		>
			<div className="flex flex-col gap-8">
				{PARTNERS.map((partner) =>
					partner.projects.length === 1 ? (
						<section
							key={partner.id}
							id={partner.id}
							className="bg-background/60 scroll-mt-20 rounded-xl border"
						>
							<ProjectBlock project={partner.projects[0]} />
						</section>
					) : (
						<section
							key={partner.id}
							id={partner.id}
							className="bg-background/60 scroll-mt-20 rounded-xl border"
						>
							<div className="flex flex-col gap-2 border-b px-6 py-5 md:px-8">
								<h2 className="text-2xl font-bold tracking-tight">
									{partner.title}
								</h2>
								{partner.summary && (
									<p className="text-muted-foreground">{partner.summary}</p>
								)}
							</div>
							<div className="grid md:grid-cols-2">
								{partner.projects.map((project, index) => (
									<div
										key={project.name}
										className={cn(
											index > 0 && "border-t md:border-t-0 md:border-l",
										)}
									>
										<ProjectBlock project={project} compact />
									</div>
								))}
							</div>
						</section>
					),
				)}
			</div>

			<p className="text-muted-foreground text-center text-sm">
				Looking for the main apps?{" "}
				<Link href="/#apps" className="text-foreground underline underline-offset-4">
					Back to NeoKit
				</Link>
			</p>
		</BasePage>
	);
}

function ProjectBlock({
	project,
	compact = false,
}: {
	project: PartnerProject;
	compact?: boolean;
}) {
	return (
		<div
			className={cn(
				"flex h-full flex-col gap-5 p-6 md:p-8",
				!compact && "md:grid md:grid-cols-[1fr_1.1fr] md:gap-10",
			)}
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-3">
					<div className="bg-secondary border-secondary-border text-secondary-foreground flex size-11 shrink-0 items-center justify-center rounded-md border">
						<HugeiconsIcon icon={project.icon} className="size-5" />
					</div>
					<div className="flex min-w-0 flex-col">
						<h3
							className={cn(
								"leading-tight font-bold tracking-tight",
								compact ? "text-lg" : "text-2xl",
							)}
						>
							{project.name}
						</h3>
						<span className="text-muted-foreground text-sm">
							{project.kind}
						</span>
					</div>
				</div>
				<p className="text-muted-foreground leading-relaxed">
					{project.description}
				</p>
				<div className="mt-auto flex flex-wrap gap-3 pt-1">
					{project.url && (
						<Link href={project.url} target="_blank" rel="noopener noreferrer">
							<Button className="h-10 px-4">
								{project.host}
								<ArrowRight />
							</Button>
						</Link>
					)}
					<Link href={project.github} target="_blank" rel="noopener noreferrer">
						<Button variant="outline" className="bg-background h-10 px-4">
							<HugeiconsIcon icon={GithubIcon} />
							{project.githubLabel}
						</Button>
					</Link>
				</div>
			</div>
			<ul className="flex flex-col gap-2.5 text-sm">
				{project.highlights.map((highlight) => (
					<li key={highlight} className="flex gap-2.5">
						<span className="bg-primary mt-[0.45rem] size-1.5 shrink-0 rounded-full" />
						<span className="leading-relaxed">{highlight}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
