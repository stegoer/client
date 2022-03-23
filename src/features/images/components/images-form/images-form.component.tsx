import ImagesFormInput from "@features/images/components/images-form/images-form.input";
import useImagesForm from "@hooks/images-form.hook";

import { LoadingOverlay } from "@mantine/core";

import type { FormType, UseFormType } from "@features/images/images.types";
import type { PropsWithChildren, ReactNode } from "react";

export type ImagesFormComponentProps = PropsWithChildren<{
  formType: FormType;
  loading: boolean;
  onSubmit(values: UseFormType[`values`]): void;
  error?: ReactNode;
}>;

const ImagesFormComponent = ({
  formType,
  loading,
  onSubmit,
  error,
  children,
}: ImagesFormComponentProps): JSX.Element => {
  const form = useImagesForm(formType);

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <LoadingOverlay visible={loading} />
        <ImagesFormInput
          form={form}
          formType={formType}
          disabled={loading}
          error={error}
        />
      </form>
      {children}
    </>
  );
};

export default ImagesFormComponent;
