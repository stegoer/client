import { FC } from "react";
import { Image } from "../../graphql/generated/generated";

type Props = {
  data: Image;
};

const DisplayImage: FC<Props> = ({ data }) => {
  return (
    <div>
      <h3>Image {data.id}</h3>
      <h4>Created at: {data.createdAt}</h4>
      <h4>Channel: {data.channel}</h4>
    </div>
  );
};

export default DisplayImage;
