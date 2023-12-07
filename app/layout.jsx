import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "Website",
    description: "League of Legends fansite",
};
const RootLayout = ({ children }) => (
    <html lang='en'>
        <body className="flex flex-col min-h-screen bg-charcoal">
            <Provider>
                <header className='header'>
                    <Nav />
                </header>
                <main className="app">
                    {children}
                </main>
            </Provider>
        </body>
    </html>
);

export default RootLayout;