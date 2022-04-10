import ImageTableNavigationSkeleton from "@features/image-table/components/image-table/skeleton/image-table.navigation.skeleton";
import TableSkeleton from "@features/image-table/components/image-table/skeleton/image-table.skeleton";

export type ImageTableSkeletonProps = {
  error?: string;
};

const ImageTableSkeleton = ({
  error,
}: ImageTableSkeletonProps): JSX.Element => {
  return (
    <>
      <TableSkeleton error={error} />
      <ImageTableNavigationSkeleton />
    </>
  );
};

export default ImageTableSkeleton;
