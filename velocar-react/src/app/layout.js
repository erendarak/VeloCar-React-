"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>VeloCar</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/assets/styles/carView.css" />
      </Head>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
};

export default Layout;
