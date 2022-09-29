import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Plege</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/fonts/gilroy-bold.ttf" />
        <link rel="stylesheet" href="/fonts/shapiro.ttf" />
      </Head>
      <body>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M9ZS4QZG3P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-M9ZS4QZG3P');
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
