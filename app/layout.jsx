import "@styles/globals.css";
import Nav from "@components/Nav/Nav";
import ColorBlindProvider from "./ColorBlindProvider";
import { RegionProvider } from "@components/Landing/RegionProvider";
import { Inter, Oswald, Bebas_Neue, Abel, Rubik, Noto_Sans } from 'next/font/google'
import Footer from "@components/Footer/Footer";

export const metadata = {
    title: "Nexus: Explore League of Legends Summoners by Riot Name and Id",
    description: "Nexus is a League of Legends fansite for discovering up-to-date win rates, rank divisions, comprehensive match history details, and real-time game insights. Excellent for players seeking to analyze performance and track progress.",
};

const inter = Inter({
    subsets: ['latin'],
    variable: "--inter",
});
const oswald = Oswald({
    subsets: ['latin'],
    variable: "--oswald",
});
const bebas_neue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: "--bebas",
    display: 'swap'
});
const abel = Abel({
    weight: '400',
    subsets: ['latin'],
    variable: "--abel",
    display: 'swap'
});
const rubik = Rubik({
    subsets: ['latin'],
    variable: "--rubik",
});
const noto_sans = Noto_Sans({
    subsets: ['latin'],
    variable: "--notosans",
});

const RootLayout = ({ children }) => (
    <html lang='en'
        className={`${inter.variable} ${oswald.variable} ${bebas_neue.variable} ${abel.variable} ${rubik.variable} ${noto_sans.variable}`} >
        <body className="flex flex-col min-h-screen bg-charcoal">
            <ColorBlindProvider>
                <RegionProvider>
                    <header className='header'>
                        <Nav />
                    </header>
                    <main className="app">
                        {children}
                    </main>
                    <Footer></Footer>
                </RegionProvider>
            </ColorBlindProvider>
        </body>
    </html>
);

export default RootLayout;