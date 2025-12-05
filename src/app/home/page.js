import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Features } from "../home/_components/Features";
import { HowItWorks } from "./_components/HowItWorks";
import { Footer } from "./_components/Footer";
import { Toaster } from "@/ui/sonner";

export default function App() {
	return (
		<div className="min-h-screen font-sans">
			<Header />

			<main>
				<Hero />
				<Features />
				<HowItWorks />
			</main>

			<Footer />

			<Toaster
				position="top-right"
				richColors
				closeButton
				toastOptions={{
					style: {
						background: "white",
						border: "2px solid var(--color-forest-green)",
						borderRadius: "12px",
					},
				}}
			/>
		</div>
	);
}
