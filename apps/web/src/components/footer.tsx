import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { DEFAULT_LOGO_URL } from "@/site/brand";
import { SOCIAL_LINKS } from "@/site/social";
import { NEOCUT, NEOIMAGE, SCATTER } from "@/site/products";

interface FooterLink {
	label: string;
	href: string;
}

const links: Record<string, FooterLink[]> = {
	Apps: [
		{ label: "NeoCut", href: NEOCUT.url },
		{ label: "NeoImage", href: NEOIMAGE.url },
		{ label: "Scatter", href: SCATTER.url },
	],
	Source: [
		{ label: "NeoCut on GitHub", href: NEOCUT.github },
		{ label: "NeoImage on GitHub", href: NEOIMAGE.github },
		{ label: "Scatter on GitHub", href: SCATTER.github },
		{ label: "OpenCut", href: "https://github.com/OpenCut-app/OpenCut" },
	],
};

export function Footer() {
	return (
		<footer className="bg-background border-t">
			<div className="mx-auto max-w-5xl px-8 py-10">
				<div className="mb-8 grid grid-cols-1 gap-12 md:grid-cols-2">
					<div className="max-w-sm md:col-span-1">
						<div className="mb-4 flex items-center justify-start gap-2">
							<Image
								src={DEFAULT_LOGO_URL}
								alt="NeoKit"
								width={24}
								height={24}
								className="invert dark:invert-0"
							/>
							<span className="text-lg font-bold">NeoKit</span>
						</div>
						<p className="text-muted-foreground mb-5 text-sm md:text-left">
							Privacy-first, open source tools for editing video and photos,
							and keeping everything organised. Right in your browser.
						</p>
						<div className="flex justify-start gap-3">
							<Link
								href={SOCIAL_LINKS.github}
								className="text-muted-foreground hover:text-foreground transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
							>
								<FaGithub className="size-5" />
							</Link>
						</div>
					</div>

					<div className="flex items-start justify-start gap-12 py-2">
						{Object.entries(links).map(([category, items]) => (
							<div key={category} className="flex flex-col gap-2">
								<h3 className="text-foreground font-semibold">{category}</h3>
								<ul className="space-y-2 text-sm">
									{items.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-muted-foreground hover:text-foreground transition-colors"
												target="_blank"
												rel="noopener noreferrer"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col items-start justify-between gap-4 pt-2 md:flex-row">
					<div className="text-muted-foreground flex items-center gap-4 text-sm">
						<span>© {new Date().getFullYear()} NeoKit</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
