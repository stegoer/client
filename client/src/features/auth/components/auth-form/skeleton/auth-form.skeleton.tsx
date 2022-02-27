import { Skeleton } from "@mantine/core";

import type { FC } from "react";

const AuthFormSkeleton: FC = () => {
  const keys = [0, 1, 2, 3];

  return (
    <>
      {keys.map((key) => (
        <Skeleton key={key} height={30} mb={10} visible />
      ))}
    </>
  );
};

export default AuthFormSkeleton;
