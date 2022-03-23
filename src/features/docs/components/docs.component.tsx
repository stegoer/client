import { Accordion } from "@mantine/core";
import DocsItem from "@features/docs/components/docs.item";

const DocsComponent = (): JSX.Element => {
  return (
    <Accordion iconPosition="right" style={{minWidth: `60%`}}>
      <Accordion.Item label="client">
        <DocsItem docType="client" />
      </Accordion.Item>
      <Accordion.Item label="server">
        <DocsItem docType="server" />
      </Accordion.Item>
    </Accordion>
  );
};

export default DocsComponent;
