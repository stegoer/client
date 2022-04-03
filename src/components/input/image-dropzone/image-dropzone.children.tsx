import { Group, Image, Text } from "@mantine/core";
import { FileIcon } from "@modulz/radix-icons";

import type { ImagesFormType } from "@features/images/images.types";

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
