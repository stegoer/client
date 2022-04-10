import ImagesFormInput from "@features/images/components/images-form/images-form.input";
import useImagesForm from "@hooks/images-form.hook";

import { LoadingOverlay } from "@mantine/core";

import type {
  ImagesFormType,
  UseImagesFormType,
} from "@features/images/images.types";

export type ImagesFormComponentProps = {
  formType: ImagesFormType;
  loading: boolean;
  onSubmit(values: UseImagesFormType[`values`]): void;
  error?: string;
};

const ImagesFormComponent = ({
  formType,
  loading,
  onSubmit,
  error,
}: ImagesFormComponentProps): JSX.Element => {
  const form = useImagesForm(formType);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay visible={loading} />
      <ImagesFormInput
        form={form}
        formType={formType}
        disabled={loading}
        error={error}
      />
    </form>
  );
};

export default ImagesFormComponent;
