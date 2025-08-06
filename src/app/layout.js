import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " AliviaAí - Seu Companheiro na Jornada de Recuperação",
  description: "O AliviaAí é um agente de inteligência artificial especializado em apoio à recuperação, baseado na experiência de anos de sobriedade e na sabedoria dos programas de 12 passos Compartilhe suas dificuldades, medos ou momentos de fraqueza. Receba mensagens de força, fé e esperança, junto com trechos inspiradores da literatura de AA e NA."
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
