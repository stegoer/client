import { List } from "@mantine/core";
import {
  DEVELOPMENT_DOCUMENTATION_URLS,
  REFERENCE_URLS,
  SOURCE_URLS,
} from "@features/docs/docs.constants";
import type { DocType } from "@features/docs/docs.types";
import TextLink from "@components/navigation/text.link";
import { FileIcon, GitHubLogoIcon, ReaderIcon } from "@modulz/radix-icons";

export type DocsItemProps = {
  docType: DocType;
}

const DocsItem = ({ docType }: DocsItemProps): JSX.Element => {
  const referenceUrl = REFERENCE_URLS[docType]

  return (
    <List center>
      <List.Item icon={<ReaderIcon/>} >
        <TextLink href={DEVELOPMENT_DOCUMENTATION_URLS[docType]}>
          development
        </TextLink>
      </List.Item>
      {referenceUrl && (
        <List.Item icon={<FileIcon />}>
          <TextLink href={referenceUrl}>
            reference
          </TextLink>
        </List.Item>
      )
      }
      <List.Item icon={<GitHubLogoIcon/>}>
        <TextLink href={SOURCE_URLS[docType]}>
          source
        </TextLink>
      </List.Item>
    </List>
  );
};

export default DocsItem;
