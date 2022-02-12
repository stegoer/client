import { Anchor } from "@mantine/core";
import React from "react";

import type { FC } from "react";

type Props = {
  formType: `register` | `login`;
  toggleFormType(): void;
};

const AuthLink: FC<Props> = ({ formType, toggleFormType }) => {
  return (
    <Anchor
      component="button"
      type="button"
      color="gray"
      onClick={toggleFormType}
      size="sm"
    >
      {formType === `register`
        ? `Have an account? Login`
        : `Don't have an account? Register`}
    </Anchor>
  );
};

export default AuthLink;
