import { List } from "@mantine/core";
import { DOCUMENTATION_URLS, SOURCE_URLS } from "@features/docs/docs.constants";
import type { DocType } from "@features/docs/docs.types";
import TextLink from "@components/links/text.link";

type DocsItemProps = {
  docType: DocType;
}

const DocsItem = ({ docType }: DocsItemProps): JSX.Element => {
  return (
    <List>
      <List.Item>
        <TextLink href={DOCUMENTATION_URLS[docType]}>
          documentation
        </TextLink>
      </List.Item>
      <List.Item>
        <TextLink href={SOURCE_URLS[docType]}>
          source
        </TextLink>
      </List.Item>
    </List>
  );
};

export default DocsItem;
