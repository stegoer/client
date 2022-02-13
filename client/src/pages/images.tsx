import Errors from "@components/errors/errors";
import ImageTable from "@components/image/image-table";
import { useImagesQuery } from "@graphql/generated/codegen.generated";

import { ActionIcon, Group, Title } from "@mantine/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@modulz/radix-icons";
import { useCallback, useState } from "react";

import type { NextPage } from "next";

const imageCountPerQuery = 10;

const Images: NextPage = () => {
  const [page, setPage] = useState(0);
  const [startCursor, setStartCursor] = useState<string>();
  const [endCursor, setEndCursor] = useState<string>();
  const [imagesQuery, fetchImages] = useImagesQuery({
    variables: {
      first: imageCountPerQuery,
      after: endCursor,
      before: startCursor,
    },
  });
  const loading = imagesQuery.fetching;
  const isFirstPage = page === 0;
  const isLastPage =
    imagesQuery.data?.images &&
    page ===
      Math.ceil(imagesQuery.data?.images.totalCount / imageCountPerQuery) - 1;

  const fetchNew = useCallback(() => {
    void fetchImages({
      requestPolicy: `network-only`,
    });
  }, [fetchImages]);

  const onLeft = useCallback(() => {
    setPage(page - 1);
    // eslint-disable-next-line unicorn/no-useless-undefined
    setEndCursor(undefined);
    setStartCursor(imagesQuery.data?.images.pageInfo.startCursor ?? undefined);
    fetchNew();
  }, [fetchNew, imagesQuery.data?.images.pageInfo.startCursor, page]);

  const onRight = useCallback(() => {
    setPage(page + 1);
    // eslint-disable-next-line unicorn/no-useless-undefined
    setStartCursor(undefined);
    setEndCursor(imagesQuery.data?.images.pageInfo.endCursor ?? undefined);
    fetchNew();
  }, [fetchNew, imagesQuery.data?.images.pageInfo.endCursor, page]);

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
        <ActionIcon onClick={onLeft} disabled={loading || isFirstPage}>
          <ArrowLeftIcon width={25} height={25} />
        </ActionIcon>
        <ActionIcon onClick={onRight} disabled={loading || isLastPage}>
          <ArrowRightIcon width={25} height={25} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default Images;
