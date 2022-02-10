import useClient from "@/graphql/client";
import type { FC } from "react";
import { Provider } from "urql";

const GraphqlProvider: FC = ({ children }) => {
  const client = useClient();

  return <Provider value={client}>{children}</Provider>;
};

export default GraphqlProvider;
