import { Anchor } from "@mantine/core";

import type { FormType } from "@/constants/account.constants";
import type { FC } from "react";

type Props = {
  formType: FormType;
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
