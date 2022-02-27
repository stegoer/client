import ImagesComponent from "@features/images/components/images.component";
import ImagesSkeleton from "@features/images/components/images.skeleton";
import useUser from "@hooks/user.hook";
import PageLayout from "@layouts/page.layout";

import { Title } from "@mantine/core";

import type { NextPage } from "next";

const Images: NextPage = () => {
  const [user] = useUser();

  return (
    <PageLayout title="images">
      <Title>Images</Title>
      {user ? <ImagesComponent /> : <ImagesSkeleton />}
    </PageLayout>
  );
};

export default Images;
