import { Group, Image, InputWrapper, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { FileIcon } from "@modulz/radix-icons";
import { useEffect, useState } from "react";

import type { DropzoneStatus } from "@mantine/dropzone";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export const dropzoneChildren = (status: DropzoneStatus, preview?: string) => (
  <Group
    position="center"
    spacing="xl"
  >
    {preview ? (
      <Image
        src={preview}
        fit="contain"
        height={100}
        width={100}
        alt="Chosen image to encode the message into"
      />
    ) : (
      <FileIcon
        width={25}
        height={25}
      />
    )}

    <Group
      grow
      direction="column"
    >
      <Text inline>Drag image here or click to select</Text>
      <Text
        size="sm"
        color="dimmed"
        inline
      >
        Only PNG images are supported
      </Text>
    </Group>
  </Group>
);

export type ImageDropzoneProps<T extends { file?: File }> = {
  form: UseForm<T>;
  loading: boolean;
};

const ImageDropzone = <T extends { file?: File }>({
  form,
  loading,
}: ImageDropzoneProps<T>): JSX.Element => {
  const [preview, setPreview] = useState<string>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!form.values.file) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(form.values.file);
    setPreview(objectUrl);

    // free memory on unmount
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.values.file]);

  return (
    <InputWrapper
      required
      label="Image file"
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
        {(status) => dropzoneChildren(status, preview)}
      </Dropzone>
    </InputWrapper>
  );
};

export default ImageDropzone;
