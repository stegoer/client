import Head from "@layouts/head/head";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};

const PageLayout = ({ children, title }: Props): JSX.Element => {
  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
};

export default PageLayout;
