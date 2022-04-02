import RichTextEditor from "@components/input/rte.input";

import { InputWrapper } from "@mantine/core";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type MessageInputProps<T extends { data: string }> = {
  form: UseForm<T>;
  label: string;
  description?: string;
  placeholder: string;
  disabled: boolean;
};

const TextEditorInput = <T extends { data: string }>({
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
      error={form.errors.data}
    >
      <RichTextEditor
        value={form.values.data}
        onChange={(value) => form.setFieldValue(`data`, value)}
        placeholder={placeholder}
        sticky={false}
        readOnly={disabled}
      />
    </InputWrapper>
  );
};

export default TextEditorInput;
