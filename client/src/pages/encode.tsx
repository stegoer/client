import DisplayImage from "@components/image/display-image";
import ImageFileInput from "@components/input/image-file.input";
import {
  Channel,
  useEncodeImageMutation,
} from "@graphql/generated/codegen.generated";
import PageLayout from "@layouts/page.layout";

import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

import type { Image } from "@graphql/generated/codegen.generated";
import type { NextPage } from "next";

const Encode: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<Image>();

  const [encodeImageResult, encodeImage] = useEncodeImageMutation();

  useEffect(() => {
    if (file) {
      void encodeImage({
        message: `TEST`,
        lsbUsed: 1,
        channel: Channel.RedGreen,
        file,
      }).then((r) => {
        console.log(r.data?.encodeImage.file);
        setImage(r.data?.encodeImage.image);
      });
    }
  }, [file, encodeImage, setImage]);

  let data;
  if (encodeImageResult.fetching) {
    data = <div>Loading...</div>;
  } else if (encodeImageResult.error) {
    data = <span>Error {encodeImageResult.error.message}</span>;
  } else if (!file) {
    data = <ImageFileInput setSelectedFile={setFile} />;
  } else {
    data = <h2>Result: {image && <DisplayImage data={image} />}</h2>;
  }

  return (
    <PageLayout title="encode">
      <Title>Encode</Title>
      {data}
    </PageLayout>
  );
};

export default Encode;
