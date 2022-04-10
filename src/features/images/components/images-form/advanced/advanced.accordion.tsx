import ChannelSwitches from "@components/input/channel.switch";
import EncryptionKeyInput from "@components/input/encryption-key.input";
import EvenDistributionCheckbox from "@components/input/even-distribution.checkbox";
import LSBUsedSlider from "@components/input/lsb-used.slider";
import AdvancedLabel from "@features/images/components/images-form/advanced/advanced.label";

import { Accordion, Group, useAccordionState } from "@mantine/core";
import dynamic from "next/dynamic";
import { useCallback } from "react";

import type {
  ImagesFormType,
  UseImagesFormType,
} from "@features/images/images.types";
import type { AccordionState } from "@mantine/core";
import type { IconProps } from "@modulz/radix-icons/dist/types";

const LockClosedIcon = dynamic<IconProps>(() =>
  import(`@modulz/radix-icons`).then((module_) => module_.LockClosedIcon),
);

export type AdvancedAccordionProps = {
  form: UseImagesFormType;
  formType: ImagesFormType;
  locked: boolean;
};

const AdvancedAccordion = ({
  form,
  formType,
  locked,
}: AdvancedAccordionProps): JSX.Element => {
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
            formType={formType}
            disabled={locked}
          />

          {formType === `encode` && (
            <>
              <LSBUsedSlider form={form} />
              <ChannelSwitches
                form={form}
                disabled={locked}
              />
              <EvenDistributionCheckbox
                form={form}
                disabled={locked}
              />
            </>
          )}
        </Group>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvancedAccordion;
