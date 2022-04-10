import { Checkbox, InputWrapper } from "@mantine/core";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type EvenDistributionCheckboxProps<
  T extends { evenDistribution: boolean },
> = {
  form: UseForm<T>;
  disabled: boolean;
};

const EvenDistributionCheckbox = <T extends { evenDistribution: boolean }>({
  form,
  disabled,
}: EvenDistributionCheckboxProps<T>) => {
  return (
    <InputWrapper
      label="Even distribution"
      description="Should bits be distributed evenly through out the image"
      error={form.errors.evenDistribution}
    >
      <Checkbox
        label="Enabled"
        disabled={disabled}
        checked={form.values.evenDistribution}
        onChange={(event) =>
          form.setFieldValue(`evenDistribution`, event.currentTarget.checked)
        }
      />
    </InputWrapper>
  );
};

export default EvenDistributionCheckbox;
