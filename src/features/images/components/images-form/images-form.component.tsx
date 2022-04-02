import ImagesFormInput from "@features/images/components/images-form/images-form.input";
import useImagesForm from "@hooks/images-form.hook";

import { LoadingOverlay } from "@mantine/core";

import type {
  ImagesFormType,
  UseImagesFormType,
} from "@features/images/images.types";
import type { ReactNode } from "react";

export type ImagesFormComponentProps = {
  formType: ImagesFormType;
  loading: boolean;
  onSubmit(values: UseImagesFormType[`values`]): void;
  error?: ReactNode;
};

const ImagesFormComponent = ({
  formType,
  loading,
  onSubmit,
  error,
}: ImagesFormComponentProps): JSX.Element => {
  const form = useImagesForm(formType);

  console.log(form.values.data);

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
