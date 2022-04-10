// inspired by https://mantine.dev/others/dropzone/

import { Group, Image, Text } from "@mantine/core";
import dynamic from "next/dynamic";

import type { ImagesFormType } from "@features/images/images.types";
import type { IconProps } from "@modulz/radix-icons/dist/types";

const FileIcon = dynamic<IconProps>(() =>
  import(`@modulz/radix-icons`).then((module_) => module_.FileIcon),
);

export type ImageDropzoneChildrenProps = {
  formType: ImagesFormType;
  preview?: string;
};

const ImageDropzoneChildren = ({
  formType,
  preview,
}: ImageDropzoneChildrenProps) => {
  return (
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
          alt={`Chosen image to ${
            formType === `encode`
              ? `encode the data into`
              : `decode the data from`
          }`}
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
};

export default ImageDropzoneChildren;
