import ImagesForm from "@features/images/components/image-form/images.form";
import PageLayout from "@layouts/page.layout";

import { Title } from "@mantine/core";

import type { NextPage } from "next";

const Encode: NextPage = () => {
  return (
    <PageLayout title="encode">
      <Title>Encode</Title>
      <ImagesForm />
    </PageLayout>
  );
};

export default Encode;
