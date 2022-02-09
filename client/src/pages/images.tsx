import { NextPage } from "next";
import { Loader, Title } from "@mantine/core";
import { useImagesQuery } from "../graphql/generated/generated";
import Errors from "../components/errors/Errors";
import ImageTable from "../components/image/ImageTable";

const Images: NextPage = () => {
  const [imagesQuery] = useImagesQuery({ variables: { first: 10 } });

  let data;
  if (imagesQuery.fetching) {
    data = <Loader />;
  } else if (imagesQuery.error) {
    data = <Errors data={imagesQuery.error} />;
  } else if (imagesQuery.data?.images.edges.length) {
    data = (
      <ImageTable
        data={imagesQuery.data.images.edges.map((image) => image.node)}
      />
    );
  }

  return (
    <>
      <Title>Images</Title>
      {data}
    </>
  );
};

export default Images;
