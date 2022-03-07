import ImageFileInput from "@components/input/image-file.input";
import {
  Channel,
  useDecodeImageMutation,
} from "@graphql/generated/codegen.generated";
import PageLayout from "@layouts/page.layout";

import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

import type { NextPage } from "next";

const Decode: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<string>();

  const [decodeImageResult, decodeImage] = useDecodeImageMutation();

  useEffect(() => {
    if (file) {
      void decodeImage({
        lsbUsed: 1,
        channel: Channel.RedGreen,
        file,
      }).then((r) => setMessage(r.data?.decodeImage.message));
    }
  }, [file, decodeImage, setMessage]);

  let data;
  if (decodeImageResult.fetching) {
    data = <div>Loading...</div>;
  } else if (decodeImageResult.error) {
    data = <span>Error {decodeImageResult.error.message}</span>;
  } else if (!file) {
    data = <ImageFileInput setSelectedFile={setFile} />;
  } else {
    data = <h2>Result: {message}</h2>;
  }

  return (
    <PageLayout title="decode">
      <Title>Decode</Title>
      {data}
    </PageLayout>
  );
};

export default Decode;
