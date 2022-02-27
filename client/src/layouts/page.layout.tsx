import Head from "@layouts/head/head";

import type { FC } from "react";

type Props = {
  title?: string;
};

const PageLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
};

export default PageLayout;
