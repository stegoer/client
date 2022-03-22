import DocsComponent from "@features/docs/components/docs.component";
import PageLayout from "@layouts/page-layout/page.layout";

import type { NextPage } from "next";

const Docs: NextPage = () => {
  return (
    <PageLayout title="docs">
      <DocsComponent />
    </PageLayout>
  );
};

export default Docs;
