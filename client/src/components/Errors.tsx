import { FC } from "react";
import { Error } from "../graphql/generated/generated";

type Props = {
  data: Array<Error>;
};

const Errors: FC<Props> = ({ data }) => {
  return (
    <>
      Errors:
      <ul>
        {data.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </>
  );
};

export default Errors;
