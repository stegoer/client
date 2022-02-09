import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Channel,
  Image,
  useCreateImageMutation,
} from "../graphql/generated/generated";
import DisplayImage from "../components/image/DisplayImage";
import Errors from "../components/errors/Errors";
import { Title } from "@mantine/core";
import ImageFileInput from "../components/image/ImageFileInput";

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

  let data;
  if (createImageResult.fetching) {
    data = <div>Loading...</div>;
  } else if (createImageResult.error) {
    data = <Errors data={createImageResult.error} />;
  } else if (!file) {
    data = <ImageFileInput setSelectedFile={setFile} />;
  } else {
    data = <h2>Result: {image && <DisplayImage data={image} />}</h2>;
  }

  return (
    <>
      <Title>Encode</Title>
      {data}
    </>
  );
};

export default Encode;
