import {
  Channel,
  useDecodeImageMutation,
} from "@graphql/generated/codegen.generated";
import PageLayout from "@layouts/page.layout";

import { useEffect, useState } from "react";

import type { NextPage } from "next";

const Decode: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<string>();

  const [decodeImageResult, decodeImage] = useDecodeImageMutation();

  useEffect(() => {
    if (file) {
      void decodeImage({
        lsbUsed: 3,
        channel: Channel.Blue,
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
    data = (
      <>
        <label htmlFor="image">Choose an image:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/png"
          onChange={(event) =>
            setFile(event.target.files?.item(0) ?? undefined)
          }
        />
      </>
    );
  } else {
    data = <h2>Result: {message}</h2>;
  }

  return <PageLayout title="decode">{data}</PageLayout>;
};

export default Decode;
