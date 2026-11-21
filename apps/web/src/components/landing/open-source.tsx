import Image from "next/image";
import Link from "next/link";
import { GithubIcon, Link04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { PRODUCTS } from "@/site/products";

export function OpenSource() {
	return (
		<section id="open-source" className="scroll-mt-16 border-t">
			<div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-24">
				<div className="flex flex-col gap-4 text-center">
					<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
						Free and open source
					</h2>
					<p className="text-muted-foreground mx-auto max-w-xl text-lg">
						Every NeoKit app is on GitHub. NeoCut and NeoImage are built on{" "}
						<Link
							href="https://github.com/OpenCut-app/OpenCut"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline underline-offset-4"
						>
							OpenCut
						</Link>
						. Thanks to the OpenCut team and contributors.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{PRODUCTS.map((product) => (
						<div
							key={product.id}
							className="flex flex-col gap-4 rounded-xl border p-5"
						>
							<div className="flex items-center gap-3">
								<Image
									src={product.logo}
									alt=""
									width={22}
									height={22}
									className="invert dark:invert-0"
								/>
								<span className="font-semibold">{product.name}</span>
							</div>
							<div className="flex flex-wrap gap-2">
								<Link
									href={product.github}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button size="sm" variant="outline">
										<HugeiconsIcon icon={GithubIcon} />
										Repository
									</Button>
								</Link>
								<Link
									href={`${product.github}/issues`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button size="sm" variant="ghost">
										<HugeiconsIcon icon={Link04Icon} />
										Report issues
									</Button>
								</Link>
							</div>
						</div>
					))}
				</div>

				<p className="text-muted-foreground text-center text-sm">
					Looking for PleaseStudy, NyxIDE, LiquidDesktop or Lumen?{" "}
					<Link
						href="/partners"
						className="text-foreground underline underline-offset-4"
					>
						See Other Partners
					</Link>
				</p>
			</div>
		</section>
	);
}
