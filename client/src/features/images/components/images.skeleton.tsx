import ImageTableNavigationSkeleton from "@features/images/components/image-table/skeleton/image-table-navigation.skeleton";
import ImageTableSkeleton from "@features/images/components/image-table/skeleton/image-table.skeleton";

import type { FC } from "react";

const ImagesSkeleton: FC = () => {
  return (
    <>
      <ImageTableSkeleton />
      <ImageTableNavigationSkeleton />
    </>
  );
};

export default ImagesSkeleton;
