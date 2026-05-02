import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Serif_Display } from "next/font/google"
import "./globals.css"
import { PersonaProvider } from "@/contexts/PersonaContext"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
})

export const metadata: Metadata = {
  title: "Moses Edem — Backend Engineer, Founder & Builder",
  description: "Backend engineer specializing in scalable systems, APIs, and infrastructure. Founder, builder, and perpetual learner based in Port Harcourt, Nigeria.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} antialiased`}>
      <body className="font-sans">
        <PersonaProvider>
          {children}
        </PersonaProvider>
      </body>
    </html>
  )
}
