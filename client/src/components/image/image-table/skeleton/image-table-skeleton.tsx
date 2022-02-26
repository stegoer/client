import {
  IMAGES_PER_PAGE,
  IMAGES_TABLE_HEADERS,
} from "@constants/images.constants";

import { Skeleton, Table } from "@mantine/core";

import type { FC } from "react";

const ImageTableSkeleton: FC = () => {
  const rows = Array.from({ length: IMAGES_PER_PAGE })
    .fill(0)
    .map((_, index) => {
      return (
        <tr key={index}>
          <td key={index} colSpan={IMAGES_TABLE_HEADERS.length}>
            <Skeleton key={index} height={10} m={5} animate={false} visible />
          </td>
        </tr>
      );
    });

  return (
    <Table striped>
      <thead>
        <tr>
          {IMAGES_TABLE_HEADERS.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default ImageTableSkeleton;
