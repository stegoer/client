import ImageModal from "@features/image-table/components/image-table/image-modal/image.modal";

import type { ImageType } from "@features/image-table/image-table.types";

export type ImageDataProps = {
  image: ImageType;
};

const ImageTableRow = ({ image }: ImageDataProps): JSX.Element => {
  return (
    <tr key={image.id}>
      <td>{image.id}</td>
      <td>{<ImageModal image={image} />}</td>
      <td>{image.createdAt}</td>
    </tr>
  );
};

export default ImageTableRow;
