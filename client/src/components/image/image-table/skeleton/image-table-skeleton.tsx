import {
  imageCountPerQuery,
  imageTableHeaders,
} from "@constants/images/images.constants";

import { Skeleton, Table } from "@mantine/core";

import type { FC } from "react";

const ImageTableSkeleton: FC = () => {
  const rows = Array.from({ length: imageCountPerQuery })
    .fill(0)
    .map((_, index) => {
      return (
        <tr key={index}>
          <td key={index} colSpan={imageTableHeaders.length}>
            <Skeleton key={index} height={10} m={5} animate={false} visible />
          </td>
        </tr>
      );
    });

  return (
    <Table striped>
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

export default ImageTableSkeleton;
