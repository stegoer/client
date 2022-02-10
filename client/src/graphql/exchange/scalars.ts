import schema from "@/graphql/generated/schema.json";

import customScalarsExchange from "urql-custom-scalars-exchange";

const scalarsExchange = customScalarsExchange({
  schema,
  scalars: {
    Time(value: string) {
      return new Date(Date.parse(value));
    },
  },
});

export default scalarsExchange;
