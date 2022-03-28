import AdvancedAccordion from "@features/images/components/images-form/advanced/advanced.accordion";
import useUser from "@hooks/user.hook";

import { Tooltip } from "@mantine/core";

import type { Channel } from "@graphql/generated/codegen.generated";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type AdvancedComponentProps<
  T extends { lsbUsed: number; channel?: Channel },
> = {
  form: UseForm<T>;
  disabled: boolean;
};

const AdvancedComponent = <T extends { lsbUsed: number; channel?: Channel }>({
  form,
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
        locked={locked}
      />
    </Tooltip>
  );
};

export default AdvancedComponent;
