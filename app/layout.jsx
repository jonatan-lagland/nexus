import "@styles/globals.css";

import Nav from "@components/Nav";
import { ChampionProvider } from "@utils/ChampionContext";

export const metadata = {
    title: "Website",
    description: "League of Legends fansite",
};
const RootLayout = ({ children }) => (
    <html lang='en'>
        <body className="flex flex-col min-h-screen bg-charcoal">
            <ChampionProvider>
                <header className='header'>
                    <Nav />
                </header>
                <main className="app">
                    {children}
                </main>
            </ChampionProvider>
        </body>
    </html>
);

export default RootLayout;