import SubmitButton from "@components/buttons/submit.button";
import ImageDropzoneInput from "@components/input/image-dropzone/image-dropzone.input";
import TextEditorInput from "@components/input/text-editor.input";
import AdvancedComponent from "@features/images/components/images-form/advanced/advanced.component";
import { capitalize } from "@utils/format.utils";

import { Group } from "@mantine/core";
import dynamic from "next/dynamic";

import type {
  ImagesFormType,
  UseImagesFormType,
} from "@features/images/images.types";

const ErrorText = dynamic(() => import(`@components/errors/error.text`));

export type ImagesFormInputProps = {
  form: UseImagesFormType;
  formType: ImagesFormType;
  disabled: boolean;
  error?: string;
};

const ImagesFormInput = ({
  form,
  formType,
  disabled,
  error,
}: ImagesFormInputProps): JSX.Element => {
  return (
    <Group
      grow
      direction="column"
      spacing="xl"
    >
      {formType === `encode` && (
        <TextEditorInput
          form={form}
          label="Data to encode"
          description="All data will be encrypted. Images will be converted and stored in base64 format."
          placeholder={`Message to ${formType} into your image`}
          disabled={disabled}
        />
      )}

      <AdvancedComponent
        form={form}
        formType={formType}
        disabled={disabled}
      />

      <ImageDropzoneInput
        form={form}
        formType={formType}
        loading={disabled}
      />

      {error && <ErrorText error={error} />}

      <SubmitButton
        disabled={disabled}
        mb={20}
      >
        {capitalize(formType)}
      </SubmitButton>
    </Group>
  );
};

export default ImagesFormInput;
