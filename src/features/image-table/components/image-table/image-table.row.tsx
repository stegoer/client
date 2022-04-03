import type { Image } from "@graphql/generated/codegen.generated";

export type ImageDataProps = {
  image: Image;
};

const ImageTableRow = ({ image }: ImageDataProps): JSX.Element => {
  return (
    <tr key={image.id}>
      <td>{image.id}</td>
      <td>{image.file.name}</td>
      <td>{image.file.content}</td>
      <td>{image.createdAt}</td>
    </tr>
  );
};

export default ImageTableRow;
