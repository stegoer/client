import ImageTable from "@components/image/image-table/image-table";
import ImageTableNavigation from "@components/image/image-table/image-table-navigation";
import { IMAGES_PER_PAGE } from "@constants/images.constants";
import { useImagesQuery } from "@graphql/generated/codegen.generated";

import { Skeleton } from "@mantine/core";
import { useCallback, useState } from "react";

import type { MoveDirection } from "@custom-types//images.types";
import type {
  Image,
  ImagesConnection,
} from "@graphql/generated/codegen.generated";
import type { FC } from "react";

const calculateEdgesIndexes = (page: number): readonly [number, number] => {
  return [(page - 1) * 10, page * IMAGES_PER_PAGE];
};

const getImageNodes = (page: number, images: ImagesConnection): Image[] => {
  return images.edges
    .slice(...calculateEdgesIndexes(page))
    .map((image) => image.node);
};

const ImageView: FC = () => {
  // table navigation/pagination
  const [page, setPage] = useState(1);
  // relay pagination based query
  const [first, setFirst] = useState<number | undefined>(IMAGES_PER_PAGE);
  const [last, setLast] = useState<number>();
  const [startCursor, setStartCursor] = useState<string>();
  const [endCursor, setEndCursor] = useState<string>();
  const [imagesQuery, fetchImages] = useImagesQuery({
    variables: {
      first,
      last,
      after: endCursor,
      before: startCursor,
    },
  });
  // UI constants
  const loading = !imagesQuery.data && imagesQuery.fetching;
  const isFirstPage = page === 1;
  const isLastPage = Boolean(
    imagesQuery.data?.images.totalCount === 0 ||
      (imagesQuery.data &&
        page ===
          Math.ceil(imagesQuery.data.images.totalCount / IMAGES_PER_PAGE)),
  );

  const fetchNew = useCallback(() => {
    void fetchImages();
  }, [fetchImages]);

  const onMove = useCallback(
    (direction: MoveDirection) => {
      const isLeft = direction === `left`;
      setPage((previousPage) => (isLeft ? --previousPage : ++previousPage));
      setFirst(isLeft ? undefined : IMAGES_PER_PAGE);
      setLast(isLeft ? IMAGES_PER_PAGE : undefined);
      setStartCursor(
        isLeft
          ? imagesQuery.data?.images.pageInfo.startCursor ?? undefined
          : undefined,
      );
      setEndCursor(
        isLeft
          ? undefined
          : imagesQuery.data?.images.pageInfo.endCursor ?? undefined,
      );
      fetchNew();
    },
    [
      fetchNew,
      imagesQuery.data?.images.pageInfo.endCursor,
      imagesQuery.data?.images.pageInfo.startCursor,
    ],
  );

  return (
    <Skeleton visible={loading}>
      {imagesQuery.data && (
        <ImageTable data={getImageNodes(page, imagesQuery.data.images)} />
      )}
      <ImageTableNavigation
        loading={loading}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        selectedPage={page}
        onMove={onMove}
      />
    </Skeleton>
  );
};

export default ImageView;
