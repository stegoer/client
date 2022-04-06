import AdvancedAccordion from "@features/images/components/images-form/advanced/advanced.accordion";
import useUser from "@hooks/user.hook";

import { Tooltip } from "@mantine/core";

import type {
  ImagesFormType,
  UseImagesFormType,
} from "@features/images/images.types";

export type AdvancedComponentProps = {
  form: UseImagesFormType;
  formType: ImagesFormType;
  disabled: boolean;
};

const AdvancedComponent = ({
  form,
  formType,
  disabled,
}: AdvancedComponentProps): JSX.Element => {
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
