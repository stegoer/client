import { NextPage } from "next";
import ImageFileInput from "../components/image/ImageFileInput";
import { useEffect, useState } from "react";
import {
  Channel,
  Image,
  useCreateImageMutation,
} from "../graphql/generated/generated";
import DisplayImage from "../components/image/DisplayImage";
import Errors from "../components/Errors";

const Encode: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<Image | null>();

  const [createImageResult, createImage] = useCreateImageMutation();

  useEffect(() => {
    if (file) {
      createImage({ channel: Channel.RedGreenBlue, file }).then((r) =>
        setImage(r.data?.createImage.image),
      );
    }
  }, [file, createImage, setImage]);

  if (createImageResult.fetching) {
    return <div>Loading...</div>;
  } else if (createImageResult.data?.createImage.errors.length) {
    return <Errors data={createImageResult.data?.createImage.errors} />;
  }

  return (
    <div>
      <h1>Encode</h1>
      <ImageFileInput setSelectedFile={setFile} />
      {!createImageResult.data?.createImage.errors.length ? (
        <h2>Result: {image && <DisplayImage data={image} />}</h2>
      ) : (
        <h2>An unexpected error occurred</h2>
      )}
    </div>
  );
};

export default Encode;
