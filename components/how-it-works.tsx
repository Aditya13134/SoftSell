"use client"

import { motion } from "framer-motion"
import { Upload, DollarSign, CreditCard } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10" />,
      title: "Upload License",
      description: "Submit your software license details through our secure portal for evaluation.",
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Get Valuation",
      description: "Receive a competitive market valuation within 24 hours from our expert team.",
    },
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Get Paid",
      description: "Accept our offer and get paid immediately via your preferred payment method.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our simple three-step process makes selling your unused software licenses easy and profitable.
          </p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center rounded-lg border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md"
              variants={itemVariants}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{step.icon}</div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
