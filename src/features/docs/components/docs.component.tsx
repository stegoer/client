import { Accordion } from "@mantine/core";
import DocsItem from "@features/docs/components/docs.item";

const DocsComponent = (): JSX.Element => {
  return (
    <Accordion iconPosition="right">
      <Accordion.Item label="client">
        <DocsItem docType="client" />
      </Accordion.Item>
      <Accordion.Item label="server">
        <DocsItem docType="server" />
      </Accordion.Item>
      <Accordion.Item label="documentation">
        <DocsItem docType="documentation" />
      </Accordion.Item>
    </Accordion>
  );
};

export default DocsComponent;
