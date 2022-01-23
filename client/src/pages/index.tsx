import type { NextPage } from "next";
import { useImages } from "../hooks/image";

const Home: NextPage = () => {
  let { data, loading } = useImages();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const images = data?.edges.map((edge) => (
    <div key={edge?.node?.id}>
      <p>{edge?.node?.channel}</p>
    </div>
  ));

  return (
    <>
      <h1>Total count: {data?.totalCount}</h1>
      <div>{images}</div>
    </>
  );
};

export default Home;
