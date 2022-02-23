import ImageTable from "@components/image/image-table/image-table";
import ImageTableNavigation from "@components/image/image-table/image-table-navigation";
import { imageCountPerQuery } from "@constants/images/images.constants";
import { useImagesQuery } from "@graphql/generated/codegen.generated";

import { useCallback, useState } from "react";

import type { MoveDirection } from "@custom-types/images.types";
import type { FC } from "react";

const ImageView: FC = () => {
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState<number | undefined>(imageCountPerQuery);
  const [last, setLast] = useState<number>();
  const [startCursor, setStartCursor] = useState<string>();
  const [endCursor, setEndCursor] = useState<string>();
  const [imagesQuery, fetchImages] = useImagesQuery({
    variables: {
      first: first,
      last: last,
      after: endCursor,
      before: startCursor,
    },
  });
  const loading = imagesQuery.fetching;
  const isFirstPage = page === 1;
  const isLastPage = Boolean(
    imagesQuery.data?.images.totalCount === 0 ||
      (imagesQuery.data &&
        page ===
          Math.ceil(imagesQuery.data.images.totalCount / imageCountPerQuery)),
  );

  const fetchNew = useCallback(() => {
    void fetchImages();
  }, [fetchImages]);

  const onMove = useCallback(
    (direction: MoveDirection) => {
      const isLeft = direction === `left`;
      setPage((previousPage) => (isLeft ? --previousPage : ++previousPage));
      setFirst(isLeft ? undefined : imageCountPerQuery);
      setLast(isLeft ? imageCountPerQuery : undefined);
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
    <>
      {imagesQuery.data && (
        <ImageTable
          data={imagesQuery.data?.images.edges
            .slice(0, imageCountPerQuery)
            .map((image) => image.node)}
        />
      )}
      <ImageTableNavigation
        loading={loading}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        selectedPage={page}
        onMove={onMove}
      />
    </>
  );
};

export default ImageView;
