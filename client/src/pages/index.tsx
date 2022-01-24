import React from "react";
import type { NextPage } from "next";
import { useImages } from "../hooks/image";

const Home: NextPage = () => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", "...");
  }

  const { data, loading } = useImages({ first: 5 });

  console.log(process.env.NEXT_PUBLIC_SERVER_URI);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (data?.images === null) {
    return (
      <div>
        Errors:
        {data?.errors?.map((error) => (
          <div key={error.code}>
            <p>{error.message}</p>
          </div>
        ))}
      </div>
    );
  }

  const images = data?.images?.edges?.map((edge) => (
    <div key={edge?.node?.id}>
      <p>{edge?.node?.channel}</p>
    </div>
  ));

  return (
    <>
      <h1>Total count: {data?.images?.totalCount}</h1>
      Images:
      <div>{images}</div>
    </>
  );
};

export default Home;
