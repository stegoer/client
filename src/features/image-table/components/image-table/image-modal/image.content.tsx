import DownloadButton from "@components/buttons/download.button";
import { useImageQuery } from "@graphql/generated/codegen.generated";
import { base64toBlob } from "@utils/file.utils";

import { Image } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { ID } from "graphql-ws";

const ErrorText = dynamic(() => import(`@components/errors/error.text`));

export type ImageContentProps = {
  id: ID;
};

const ImageContent = ({ id }: ImageContentProps): JSX.Element => {
  const [imageQuery] = useImageQuery({ variables: { id: id } });
  const [imageUrl, setImageUrl] = useState<string>();

  // create a blob from image content on mount
  useEffect(() => {
    let objectUrl: string;

    if (imageQuery.data) {
      void base64toBlob(
        imageQuery.data?.image.file.content,
        MIME_TYPES.png,
      ).then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
      });
    }

    // free memory on unmount
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageQuery.data?.image.file.content]);

  return (
    <>
      {imageQuery.error && <ErrorText error={imageQuery.error} />}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageQuery.data?.image.file.name}
          withPlaceholder
          caption={
            <>
              {imageQuery.data && (
                <DownloadButton
                  objectUrl={imageUrl}
                  filename={imageQuery.data.image.file.name}
                />
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default ImageContent;
