import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">Resume</span>
              <span>to Website</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium hover:underline">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:underline">
                Pricing
              </Link>
              <Button asChild>
                <Link href="/create">Get Started</Link>
              </Button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-background/90">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    From Resume to Website in One Click
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
                    Upload your resume, choose a style, and let AI generate a professional personal website for you.
                    Deploy with one click.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="/create">
                      Start Creating
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-16 md:py-24">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features</h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
                    Our AI technology makes creating a personal website simple and efficient
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Resume Parsing</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    AI automatically extracts key information from your resume, no manual input needed
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Multiple Styles</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Choose from various professional design templates to match your industry and personal style
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">One-Click Deploy</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Choose a domain and deploy with one click to instantly get your personal website
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-16 md:py-24">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Pricing</h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400">
                    Choose a plan that fits your needs, with no hidden fees
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
                {[
                  {
                    title: "Basic",
                    price: "Free",
                    features: [
                      "1 Website",
                      "Basic Templates",
                      "Custom Domain",
                      "Vercel Hosting",
                      "48-hour Domain Reservation",
                      "Domain Auto-release if Unused"
                    ],
                    description: "Perfect for creating your first personal website",
                    highlight: false
                  },
                  {
                    title: "Professional",
                    price: "$9.99/month",
                    features: [
                      "5 Websites",
                      "All Templates",
                      "Priority Support",
                      "Advanced Analytics",
                      "SEO Optimization",
                      "Permanent Domain Reservation"
                    ],
                    description: "Ideal for professionals and freelancers",
                    highlight: true
                  },
                  {
                    title: "Enterprise",
                    price: "Contact Us",
                    features: [
                      "Unlimited Websites",
                      "Custom Templates",
                      "Dedicated Support",
                      "Team Collaboration",
                      "API Access",
                      "Custom Domain Management"
                    ],
                    description: "For large teams and organizations",
                    highlight: false
                  },
                ].map((plan, i) => (
                  <div
                    key={plan.title}
                    className={`flex flex-col rounded-lg border p-6 ${
                      plan.highlight ? "border-primary shadow-md" : ""
                    }`}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{plan.title}</h3>
                      <div className="mt-2 text-3xl font-bold">{plan.price}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <ul className="mb-6 flex flex-1 flex-col space-y-2">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-primary"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant={plan.highlight ? "default" : "outline"} className="mt-auto">
                      Choose Plan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6 md:text-left px-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">© 2025 Resume to Website. All rights reserved.</div>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-sm font-medium hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Contact Us
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}
