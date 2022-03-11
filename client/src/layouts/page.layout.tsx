import Head from "@layouts/head/head";

import { Paper, Title } from "@mantine/core";

import type { PropsWithChildren } from "react";

export type Props = PropsWithChildren<{
  title: string;
}>;

const PageLayout = ({ children, title }: Props): JSX.Element => {
  return (
    <Paper style={{ width: 300, position: `relative` }}>
      <Head title={title} />
      <Title>{title}</Title>
      {children}
    </Paper>
  );
};

export default PageLayout;
