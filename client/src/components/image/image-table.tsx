import {
  imageCountPerQuery,
  imageTableHeaders,
} from "@constants/images/images.constants";

import { Skeleton, Table } from "@mantine/core";

import type { Image } from "@graphql/generated/codegen.generated";
import type { FC } from "react";

type Props = {
  data?: Image[];
  loading: boolean;
};

const ImageTable: FC<Props> = ({ data, loading }) => {
  const loadingRows = Array.from({ length: imageCountPerQuery })
    .fill(0)
    .map((_, index) => {
      return (
        <tr key={index}>
          <td key={index} colSpan={imageTableHeaders.length}>
            <Skeleton key={index} height={20} m={15} visible={loading} />
          </td>
        </tr>
      );
    });

  const rows =
    data && !loading
      ? data.map((image, index) => (
          <tr key={index}>
            <td>{image.channel}</td>
            <td>{image.createdAt}</td>
          </tr>
        ))
      : loadingRows;

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          {imageTableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ImageTable;
