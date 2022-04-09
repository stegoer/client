import {
  IMAGE_TABLE_HEADERS,
  IMAGE_TABLE_PER_PAGE,
} from "@features/image-table/image-table.constants";

import { Skeleton, Table } from "@mantine/core";
import dynamic from "next/dynamic";

import type { ReactNode } from "react";

const ErrorText = dynamic(() => import(`@components/errors/error.text`));

export type ImageTableSkeletonProps = {
  error?: ReactNode;
};

const ImageTableSkeleton = ({
  error,
}: ImageTableSkeletonProps): JSX.Element => {
  const rows = Array.from({ length: IMAGE_TABLE_PER_PAGE })
    .fill(0)
    .map((_, index) => {
      return (
        <tr key={index}>
          <td
            key={index}
            colSpan={IMAGE_TABLE_HEADERS.length}
          >
            <Skeleton
              key={index}
              height={10}
              m={5}
              animate={false}
              visible
            />
          </td>
        </tr>
      );
    });

  return (
    <Table
      striped
      highlightOnHover
      captionSide="bottom"
    >
      <thead>
        <tr>
          {IMAGE_TABLE_HEADERS.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>

      {error && (
        <caption>
          <ErrorText error={error} />
        </caption>
      )}
    </Table>
  );
};

export default ImageTableSkeleton;
