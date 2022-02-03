import { NextPage } from "next";
import { useImagesQuery } from "../graphql/generated/generated";
import Errors from "../components/Errors";
import DisplayImage from "../components/image/DisplayImage";

const Images: NextPage = () => {
  const [imagesQuery] = useImagesQuery({ variables: { first: 10 } });

  if (imagesQuery.fetching) {
    return <div>Loading...</div>;
  } else if (imagesQuery.error) {
    return <div>Something went wrong</div>;
  } else if (imagesQuery.data?.images.errors.length) {
    return <Errors data={imagesQuery.data?.images.errors} />;
  }

  return (
    <div>
      <ol>
        {imagesQuery.data?.images.edges.map((image) => {
          return (
            <li key={image.node.id}>{<DisplayImage data={image.node} />}</li>
          );
        })}
      </ol>
    </div>
  );
};

export default Images;
