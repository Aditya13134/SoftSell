import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ChatWidget } from "@/components/chat-widget"

export const metadata = {
  title: "SoftSell - Get Cash for Your Unused Software Licenses",
  description:
    "SoftSell helps businesses sell their unused software licenses for the best price. Quick valuation, secure transactions, and immediate payment.",
  keywords: "software resale, license resale, sell software licenses, software marketplace",
  openGraph: {
    title: "SoftSell - Get Cash for Your Unused Software Licenses",
    description:
      "SoftSell helps businesses sell their unused software licenses for the best price. Quick valuation, secure transactions, and immediate payment.",
    url: "https://softsell.vercel.app",
    siteName: "SoftSell",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoftSell - Software License Resale Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
