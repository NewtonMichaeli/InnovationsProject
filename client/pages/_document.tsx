import { Html, Head, Main, NextScript } from "next/document";


const Document: () => JSX.Element = () => {
    
    return (
        <Html lang="en">
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=urf-8" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document