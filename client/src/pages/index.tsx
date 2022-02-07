import React from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>stegoer</title>
        <link rel="manifest" href="site.webmanifest.json" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <div>
        <h1>stegoer</h1>
        <ol>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/encode">
              <a>Encode</a>
            </Link>
          </li>
          <li>
            <Link href="/decode">
              <a>Decode</a>
            </Link>
          </li>
          <li>
            <Link href="/images">
              <a>Images</a>
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
