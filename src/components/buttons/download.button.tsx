import { download } from "@utils/file.utils";

import { Button } from "@mantine/core";

export type DownloadButtonProps = {
  objectUrl: string;
  filename: string;
};

const DownloadButton = ({
  objectUrl,
  filename,
}: DownloadButtonProps): JSX.Element => {
  return (
    <Button
      onClick={() => download(objectUrl, filename)}
      mt={10}
    >
      Download
    </Button>
  );
};

export default DownloadButton;
