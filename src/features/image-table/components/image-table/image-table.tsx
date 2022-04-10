import ImageTableRow from "@features/image-table/components/image-table/image-table.row";
import { IMAGE_TABLE_HEADERS } from "@features/image-table/image-table.constants";

import { Table } from "@mantine/core";
import dynamic from "next/dynamic";

import type { ImageType } from "@features/image-table/image-table.types";

const ErrorText = dynamic(() => import(`@components/errors/error.text`));

export type ImageTableProps = {
  data: ImageType[];
  error?: string;
};

const ImageTable = ({ data, error }: ImageTableProps): JSX.Element => {
  const rows = data.map((image, index: number) => (
    <ImageTableRow
      image={image}
      key={index}
    />
  ));

  return (
    <Table
      striped
      highlightOnHover
      captionSide="bottom"
      mb={10}
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

export default ImageTable;
