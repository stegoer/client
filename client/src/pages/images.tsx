import ImageSkeletonView from "@components/image/image-skeleton-view";
import ImageView from "@components/image/image-view";
import useUser from "@hooks/user.hook";

import { Title } from "@mantine/core";

import type { NextPage } from "next";

const Images: NextPage = () => {
  const { isAuthenticated } = useUser();

  return (
    <>
      <Title>Images</Title>
      {isAuthenticated ? <ImageView /> : <ImageSkeletonView />}
    </>
  );
};

export default Images;
