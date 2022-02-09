import { FC } from "react";
import { CombinedError } from "urql";
import { Alert, List, Text } from "@mantine/core";

type Props = {
  data: CombinedError;
};

const Errors: FC<Props> = ({ data }) => {
  if (data.networkError) {
    return <Text>Network error: {data.networkError.message}</Text>;
  } else if (data.graphQLErrors.length) {
    return (
      <Alert title="Errors" color="red" variant="outline">
        <List>
          {data.graphQLErrors.map((e, index) => (
            <List.Item key={index}>{e.message}</List.Item>
          ))}
        </List>
      </Alert>
    );
  }
  return data.message;
};

export default Errors;
