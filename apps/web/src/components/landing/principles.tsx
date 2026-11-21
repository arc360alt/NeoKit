import { HugeiconsIcon } from "@hugeicons/react";
import {
	SecurityLockIcon,
	GiftIcon,
	CursorMagicSelection02Icon,
} from "@hugeicons/core-free-icons";

const PRINCIPLES = [
	{
		icon: SecurityLockIcon,
		title: "Privacy",
		description:
			"Your videos and photos stay on your device. Projects live in your browser's storage, and AI features run locally. No account required.",
	},
	{
		icon: GiftIcon,
		title: "Free features",
		description:
			"Most basic editing features elsewhere are now paywalled. Timelines, layers, filters, captions and background removal are free here.",
	},
	{
		icon: CursorMagicSelection02Icon,
		title: "Simple",
		description:
			"People want editors that are easy to use. Pick a size or drop in a clip, make your edit, and export. Nothing to install.",
	},
];

export function Principles() {
	return (
		<section id="why" className="scroll-mt-16 border-t">
			<div className="mx-auto max-w-5xl px-6 py-24">
				<div className="mx-auto mb-14 flex max-w-2xl flex-col gap-4 text-center">
					<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
						Why NeoKit?
					</h2>
					<p className="text-muted-foreground text-lg">
						Two editors, one set of principles.
					</p>
				</div>
				<div className="grid gap-10 md:grid-cols-3">
					{PRINCIPLES.map((principle) => (
						<div key={principle.title} className="flex flex-col gap-3">
							<HugeiconsIcon
								icon={principle.icon}
								className="text-primary size-6"
							/>
							<h3 className="text-lg font-semibold">{principle.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{principle.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
