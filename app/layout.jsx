import "@styles/globals.css";
import Nav from "@components/Nav/Nav";
import ColorBlindProvider from "./ColorBlindProvider";
import { Inter, Oswald, Bebas_Neue, Abel, Rubik } from 'next/font/google'

export const metadata = {
    title: "Website",
    description: "League of Legends fansite",
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

const RootLayout = ({ children }) => (
    <html lang='en'
        className={`${inter.variable} ${oswald.variable} ${bebas_neue.variable} ${abel.variable} ${rubik.variable}`} >
        <body className="flex flex-col min-h-screen bg-charcoal">
            <ColorBlindProvider>
                <header className='header'>
                    <Nav />
                </header>
                <main className="app">
                    {children}
                </main>
            </ColorBlindProvider>
        </body>

    </html>
);

export default RootLayout;