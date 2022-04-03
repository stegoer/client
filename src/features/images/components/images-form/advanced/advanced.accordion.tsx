import ChannelSwitches from "@components/input/channel.switch";
import EncryptionKeyInput from "@components/input/encryption-key.input";
import LSBUsedSlider from "@components/input/lsb-used.slider";
import AdvancedLabel from "@features/images/components/images-form/advanced/advanced.label";

import { Accordion, Group, useAccordionState } from "@mantine/core";
import { LockClosedIcon } from "@modulz/radix-icons";
import { useCallback } from "react";

import type { ImagesFormType } from "@features/images/images.types";
import type { Channel } from "@graphql/generated/codegen.generated";
import type { AccordionState } from "@mantine/core";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type AdvancedAccordionProps<
  T extends { encryptionKey?: string; lsbUsed: number; channel?: Channel },
> = {
  form: UseForm<T>;
  formType: ImagesFormType;
  locked: boolean;
};

const AdvancedAccordion = <
  T extends { encryptionKey?: string; lsbUsed: number; channel?: Channel },
>({
  form,
  formType,
  locked,
}: AdvancedAccordionProps<T>): JSX.Element => {
  const [state, manage] = useAccordionState({
    initialItem: 1,
    total: 1,
    multiple: false,
  });

  const onChange = useCallback(
    (state: AccordionState) => {
      if (!locked) {
        manage.setState(state);
      }
    },
    [locked, manage],
  );

  return (
    <Accordion
      icon={locked ? <LockClosedIcon /> : undefined}
      iconPosition="right"
      state={state}
      onChange={onChange}
    >
      <Accordion.Item label={<AdvancedLabel />}>
        <Group
          grow
          direction="column"
          spacing="xl"
        >
          <EncryptionKeyInput
            form={form}
            disabled={locked}
          />
          {formType === `encode` && <LSBUsedSlider form={form} />}
          {formType === `encode` && (
            <ChannelSwitches
              form={form}
              disabled={locked}
            />
          )}
        </Group>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvancedAccordion;
