import ImageDropzoneChildren from "@components/input/image-dropzone/image-dropzone.children";

import { InputWrapper } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useEffect, useState } from "react";

import type { ImagesFormType } from "@features/images/images.types";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type ImageDropzoneInputProps<T extends { file?: File }> = {
  form: UseForm<T>;
  formType: ImagesFormType;
  loading: boolean;
};

const ImageDropzoneInput = <T extends { file?: File }>({
  form,
  formType,
  loading,
}: ImageDropzoneInputProps<T>): JSX.Element => {
  const [preview, setPreview] = useState<string>();

  // create a preview whenever selected file is changed
  useEffect(() => {
    if (!form.values.file) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setPreview(undefined);
    } else {
      const objectUrl = URL.createObjectURL(form.values.file);
      setPreview(objectUrl);

      // free memory on cleanup
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [form.values.file]);

  return (
    <InputWrapper
      required
      label="Image file"
      description={`Data will be ${
        formType === `encode` ? `encoded into` : `decoded from`
      } the chosen file`}
      error={form.errors.file}
    >
      <Dropzone
        disabled={loading}
        onDrop={(files) => form.setFieldValue(`file`, files[0])}
        onReject={(files) =>
          form.setFieldError(`file`, files[0].errors[0].message)
        }
        accept={[MIME_TYPES.png]}
        multiple={false}
      >
        {() => (
          <ImageDropzoneChildren
            formType={formType}
            preview={preview}
          />
        )}
      </Dropzone>
    </InputWrapper>
  );
};

export default ImageDropzoneInput;
