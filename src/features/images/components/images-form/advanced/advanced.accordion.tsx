import ChannelSwitches from "@components/input/channel.switch";
import LSBUsedSlider from "@components/input/lsb-used.slider";
import AdvancedLabel from "@features/images/components/images-form/advanced/advanced.label";
import useUser from "@hooks/user.hook";

import { Accordion, Group, Tooltip, useAccordionState } from "@mantine/core";
import { LockClosedIcon } from "@modulz/radix-icons";

import type { Channel } from "@graphql/generated/codegen.generated";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type AdvancedAccordionProps<
  T extends { lsbUsed: number; channel?: Channel },
> = {
  form: UseForm<T>;
  disabled: boolean;
};

const AdvancedAccordion = <T extends { lsbUsed: number; channel?: Channel }>({
  form,
  disabled,
}: AdvancedAccordionProps<T>): JSX.Element => {
  const [user] = useUser();
  const [state, manage] = useAccordionState({
    initialItem: 1,
    total: 1,
    multiple: false,
  });

  return (
    <Tooltip
      label="Please log-in to gain access"
      placement="end"
      disabled={!!user}
    >
      <Accordion
        icon={user ? undefined : <LockClosedIcon />}
        iconPosition="right"
        state={state}
        onChange={(state) => {
          if (user) {
            manage.setState(state);
          }
        }}
      >
        <Accordion.Item label={<AdvancedLabel />}>
          <Group
            grow
            direction="column"
            spacing="xl"
          >
            <LSBUsedSlider form={form} />
            <ChannelSwitches
              form={form}
              disabled={disabled}
            />
          </Group>
        </Accordion.Item>
      </Accordion>
    </Tooltip>
  );
};

export default AdvancedAccordion;
