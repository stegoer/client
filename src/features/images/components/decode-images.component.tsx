import ImagesFormComponent from "@features/images/components/images-form/images-form.component";
import { LSB_USED_MARK } from "@features/images/images.constants";
import { useDecodeImageMutation } from "@graphql/generated/codegen.generated";

import { TypographyStylesProvider } from "@mantine/core";
import { useCallback, useState } from "react";

import type { UseFormType } from "@features/images/images.types";
import type { ReactNode } from "react";

const DecodeImagesComponent = (): JSX.Element => {
  const [decodeImageResult, decodeImage] = useDecodeImageMutation();
  const [error, setError] = useState<ReactNode>();

  const onSubmit = useCallback(
    (values: UseFormType[`values`]) => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setError(undefined);

      if (values.file && values.channel) {
        void decodeImage({
          lsbUsed: values.lsbUsed / LSB_USED_MARK,
          channel: values.channel,
          file: values.file,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
          }
        });
      }
    },
    [decodeImage],
  );

  return (
    <>
      <ImagesFormComponent
        formType="decode"
        loading={decodeImageResult.fetching}
        onSubmit={onSubmit}
        error={error}
      />
      {decodeImageResult.data?.decodeImage && (
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{
              __html: decodeImageResult.data.decodeImage.message,
            }}
          />
        </TypographyStylesProvider>
      )}
    </>
  );
};

export default DecodeImagesComponent;
