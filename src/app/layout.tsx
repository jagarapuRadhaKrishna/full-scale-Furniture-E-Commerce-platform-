import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/NavbarNew'
import Footer from '@/components/layout/Footer'
import { ClientProviders } from '@/components/providers/ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DFW - Divya Furniture World | Premium Furniture with Home Demo',
  description: 'Premium furniture with FREE home demo service. Book technician visit at no cost. Custom designs, repairs, and assembly services.',
  keywords: 'furniture, home demo, custom design, sofa, bed, dining table, repair, assembly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen overflow-x-hidden pt-20">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}