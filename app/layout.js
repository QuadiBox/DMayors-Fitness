import { Alegreya_Sans } from "next/font/google";
import { Rubik_Glitch } from "next/font/google";
import { Sofia } from "next/font/google";
import { Major_Mono_Display } from "next/font/google";
import { Limelight } from "next/font/google";
import "./globals.css";
import "./home.css"
import "./membership.css"
import "./signIn.css"
import "./dashboard.css"
import "./game_hub.css"
import "../icofont/icofont.min.css"

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";




const mjd = Major_Mono_Display({ subsets: ["latin"], weight: ["400"], variable: "--font-md" });
const limelight = Limelight({ subsets: ["latin"], weight: ["400"], variable: "--font-l" });
const aleg = Alegreya_Sans({subsets: ["latin"], weight: ['100', '300', '400', '500', '800', '700'], variable: "--font-aleg"})
const rubik = Rubik_Glitch({ subsets: ["latin"], weight: ["400"], variable: "--font-r" });
const sofia = Sofia({ subsets: ["latin"], weight: ["400"], variable: "--font-sf" });



export const metadata = {
  title: 'DMayor Fitness & Game Hub | #NOJUDGEMENT Fitness Community',
  description: "Welcome to DMayor Fitness & Game Hub, where fitness meets fun! Join our inclusive community with no judgment, just motivation, and endless games.",
  openGraph: {
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    title: 'DMayor Fitness & Game Hub',
    description: 'Discover DMayor Fitness & Game Hub, a unique blend of fitness and fun. Experience a community that welcomes everyone with open arms and endless activities.',
  },
  twitter: {
    card: "summary_image_large",
    creator: "@QuadVox",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    title: 'DMayor Fitness & Game Hub',
    description: 'Discover DMayor Fitness & Game Hub, a unique blend of fitness and fun. Experience a community that welcomes everyone with open arms and endless activities.',
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        signIn: { baseTheme: [dark] }
      }}  
    >
      <html lang="en">
        <body className={`${aleg.variable} ${rubik.variable} ${sofia.variable} ${limelight.variable} ${mjd.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
