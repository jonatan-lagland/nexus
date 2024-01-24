import "@styles/globals.css";
import Head from "next/head";
import Nav from "@components/Nav/Nav";
import Provider from "@components/Other/Provider";

export const metadata = {
    title: "Website",
    description: "League of Legends fansite",
};

const RootLayout = ({ children }) => (
    <html lang='en'>
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
        </Head>
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