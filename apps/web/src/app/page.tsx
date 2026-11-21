import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { ProductFeatures } from "@/components/landing/product-features";
import { Principles } from "@/components/landing/principles";
import { OpenSource } from "@/components/landing/open-source";
import { SITE_URL } from "@/site/brand";

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default function Home() {
	return (
		<div>
			<Header />
			<Hero />
			<ProductFeatures />
			<Principles />
			<OpenSource />
			<Footer />
		</div>
	);
}
