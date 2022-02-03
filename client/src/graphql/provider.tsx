import React from "react";
import { Provider } from "urql";
import useClient from "./client";

const GraphqlProvider: React.FC = ({ children }) => {
  const client = useClient();

  return <Provider value={client}>{children}</Provider>;
};

export default GraphqlProvider;
