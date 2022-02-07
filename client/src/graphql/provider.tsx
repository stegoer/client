import { FC } from "react";
import { Provider } from "urql";
import useClient from "./client";

const GraphqlProvider: FC = ({ children }) => {
  const client = useClient();

  return <Provider value={client}>{children}</Provider>;
};

export default GraphqlProvider;
