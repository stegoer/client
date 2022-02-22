import Errors from "@components/errors/errors";
import ImageTable from "@components/image/image-table";
import { imageCountPerQuery } from "@constants/images/images.constants";
import { useImagesQuery } from "@graphql/generated/codegen.generated";

import { ActionIcon, Group, Title } from "@mantine/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@modulz/radix-icons";
import { useCallback, useState } from "react";

import type { MoveDirection } from "@custom-types/images.types";
import type { NextPage } from "next";

const Images: NextPage = () => {
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
  const isLastPage = Boolean(
    imagesQuery.data &&
      page ===
        Math.ceil(imagesQuery.data.images.totalCount / imageCountPerQuery),
  );

  const fetchNew = useCallback(() => {
    void fetchImages();
  }, [fetchImages]);

  const onMove = useCallback(
    (direction: MoveDirection) => {
      const isLeft = direction === `left`;
      setPage((previousPage) =>
        isLeft ? previousPage - 1 : previousPage + 1,
      );
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

  const content = imagesQuery.error ? (
    <Errors data={imagesQuery.error} />
  ) : (
    <ImageTable
      data={imagesQuery.data?.images.edges
        .slice(0, imageCountPerQuery)
        .map((image) => image.node)}
      loading={loading}
    />
  );

  return (
    <>
      <Title>Images</Title>
      {content}
      <Group>
        <ActionIcon
          onClick={() => onMove(`left`)}
          disabled={loading || page === 1}
        >
          <ArrowLeftIcon width={25} height={25} />
        </ActionIcon>
        <span>{page}</span>
        <ActionIcon
          onClick={() => onMove(`right`)}
          disabled={loading || isLastPage}
        >
          <ArrowRightIcon width={25} height={25} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default Images;
