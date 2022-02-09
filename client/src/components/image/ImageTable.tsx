import { FC } from "react";
import { Image } from "../../graphql/generated/generated";
import { Table } from "@mantine/core";

type Props = {
  data: Image[];
};

const ImageTable: FC<Props> = ({ data }) => {
  const rows = data.map((image, index) => (
    <tr key={index}>
      <td>{image.channel}</td>
      <td>{image.createdAt}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Channel</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ImageTable;
