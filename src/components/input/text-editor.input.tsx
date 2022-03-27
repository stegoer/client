import RichTextEditor from "@components/input/rte.input";

import { InputWrapper } from "@mantine/core";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type MessageInputProps<T extends { message: string }> = {
  form: UseForm<T>;
  label: string;
  description?: string;
  placeholder: string;
  disabled: boolean;
};

const TextEditorInput = <T extends { message: string }>({
  form,
  label,
  description,
  placeholder,
  disabled,
}: MessageInputProps<T>) => {
  return (
    <InputWrapper
      label={label}
      description={description}
      required
      error={form.errors.message}
    >
      <RichTextEditor
        value={form.values.message}
        onChange={(value) => form.setFieldValue(`message`, value)}
        placeholder={placeholder}
        sticky={false}
        readOnly={disabled}
      />
    </InputWrapper>
  );
};

export default TextEditorInput;
