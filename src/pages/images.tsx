import useUser from "@hooks/user.hook";
import PageLayout from "@layouts/page-layout/page.layout";

import dynamic from "next/dynamic";

import type { NextPage } from "next";

const ImageTableComponent = dynamic(
  () => import(`@features/image-table/components/image-table.component`),
);
const ImageTableSkeleton = dynamic(
  () => import(`@features/image-table/components/image-table.skeleton`),
);

const Images: NextPage = () => {
  const [user] = useUser();

  return (
    <PageLayout title="images">
      {user ? (
        <ImageTableComponent />
      ) : (
        <ImageTableSkeleton error="Please login to gain access to your images" />
      )}
    </PageLayout>
  );
};

export default Images;
