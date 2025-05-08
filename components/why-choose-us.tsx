"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Clock, Banknote, Users } from "lucide-react"

export function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: "Secure Transactions",
      description:
        "End-to-end encryption and secure transfer protocols protect your license data and financial information.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Fast Turnaround",
      description: "Get valuations within 24 hours and payment within 48 hours of accepting our offer.",
    },
    {
      icon: <Banknote className="h-10 w-10" />,
      title: "Best Market Rates",
      description: "Our extensive network of buyers ensures you get the highest possible value for your licenses.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Expert Support",
      description:
        "Our team of software licensing experts is available to guide you through every step of the process.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="why-choose-us" className="bg-muted/50 py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Choose Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            SoftSell offers unmatched benefits when it comes to reselling your software licenses.
          </p>
        </div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              variants={itemVariants}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary inline-flex">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
