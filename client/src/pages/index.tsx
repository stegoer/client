import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Stegoer</h1>
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
  );
};

export default Home;
