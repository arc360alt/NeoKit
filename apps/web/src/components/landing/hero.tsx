import Image from "next/image";
import { PRODUCTS } from "@/site/products";
import { ProductCard } from "./product-card";

export function Hero() {
	return (
		<div className="flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-4 pt-16 pb-24 text-center">
			<Image
				className="absolute top-0 left-0 -z-50 size-full object-cover opacity-85 invert dark:invert-0"
				src="/landing-page-dark.png"
				height={1903.5}
				width={1269}
				alt=""
				priority
			/>
			<div className="mx-auto flex w-full max-w-3xl flex-col justify-center">
				<h1 className="text-4xl font-bold tracking-tighter md:text-[4rem] md:leading-[1.05]">
					Open source tools for
					<br />
					creating and organising
				</h1>

				<p className="text-muted-foreground mx-auto mt-8 max-w-xl text-base font-light tracking-wide sm:text-xl">
					Edit video and photos, then keep everything in order. All in your
					browser. Private, free, and no account needed.
				</p>
			</div>

			<div
				id="apps"
				className="mx-auto mt-14 grid w-full max-w-xl scroll-mt-24 gap-6 text-left lg:max-w-6xl lg:grid-cols-3"
			>
				{PRODUCTS.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
