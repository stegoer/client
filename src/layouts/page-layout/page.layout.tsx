import styles from "./page-layout.module.css";

import Head from "@layouts/head/head";

import { Group, Title } from "@mantine/core";

import type { PropsWithChildren } from "react";

export type PageLayoutProps = PropsWithChildren<{
  title: string;
}>;

const PageLayout = ({ children, title }: PageLayoutProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <Group
        direction="column"
        spacing="xl"
        grow
        className={styles.group}
      >
        <Title>{title}</Title>
        {children}
      </Group>
    </>
  );
};

export default PageLayout;
