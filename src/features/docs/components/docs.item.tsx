import { List } from "@mantine/core";
import { DOCUMENTATION_URLS, SOURCE_URLS } from "@features/docs/docs.constants";
import type { DocType } from "@features/docs/docs.types";
import TextLink from "@components/navigation/text.link";
import { GitHubLogoIcon, ReaderIcon } from "@modulz/radix-icons";

type DocsItemProps = {
  docType: DocType;
}

const DocsItem = ({ docType }: DocsItemProps): JSX.Element => {
  return (
    <List>
      <List.Item icon={<ReaderIcon/>}>
        <TextLink href={DOCUMENTATION_URLS[docType]}>
          documentation
        </TextLink>
      </List.Item>
      <List.Item icon={<GitHubLogoIcon/>}>
        <TextLink href={SOURCE_URLS[docType]}>
          source
        </TextLink>
      </List.Item>
    </List>
  );
};

export default DocsItem;
