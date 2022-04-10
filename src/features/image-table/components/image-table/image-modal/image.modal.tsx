import ImageContent from "@features/image-table/components/image-table/image-modal/image.content";

import { Anchor, Modal } from "@mantine/core";
import { useState } from "react";

import type { ImageType } from "@features/image-table/image-table.types";

export type ImageModalProps = {
  image: ImageType;
};

const ImageModal = ({ image }: ImageModalProps): JSX.Element => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Anchor onClick={() => setOpened(true)}>view</Anchor>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        title={image.file.name}
      >
        <ImageContent id={image.id} />
      </Modal>
    </>
  );
};

export default ImageModal;
