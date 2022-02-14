import { Skeleton, Table } from "@mantine/core";

import type { Image } from "@graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  data?: Image[];
  loading: boolean;
};

const ImageTable: FC<Props> = ({ data, loading }) => {
  const loadingRows = Array.from({ length: 10 })
    .fill(0)
    .map((_, index) => {
      <tr key={index}>
        <Skeleton />
      </tr>;
    });

  const rows =
    data && !loading
      ? data.map((image, index) => (
          <tr key={index}>
            <td>{image.channel}</td>
            <td>{image.createdAt.toLocaleString()}</td>
          </tr>
        ))
      : loadingRows;

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
