import AdvancedAccordion from "@features/images/components/images-form/advanced/advanced.accordion";
import useUser from "@hooks/user.hook";

import { Tooltip } from "@mantine/core";

import type { ImagesFormType } from "@features/images/images.types";
import type { Channel } from "@graphql/generated/codegen.generated";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type AdvancedComponentProps<
  T extends { lsbUsed: number; channel?: Channel },
> = {
  form: UseForm<T>;
  formType: ImagesFormType;
  disabled: boolean;
};

const AdvancedComponent = <T extends { lsbUsed: number; channel?: Channel }>({
  form,
  formType,
  disabled,
}: AdvancedComponentProps<T>): JSX.Element => {
  const [user] = useUser();
  const locked = disabled || !user;

  return (
    <Tooltip
      label="Please log-in to gain access"
      placement="end"
      disabled={!locked}
    >
      <AdvancedAccordion
        form={form}
        formType={formType}
        locked={locked}
      />
    </Tooltip>
  );
};

export default AdvancedComponent;
