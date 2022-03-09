import ImagesComponent from "@features/images/components/images.component";
import PageLayout from "@layouts/page.layout";

import type { NextPage } from "next";

const Encode: NextPage = () => {
  return (
    <PageLayout title="encode">
      <ImagesComponent />
    </PageLayout>
  );
};

export default Encode;
