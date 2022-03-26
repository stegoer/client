import RichTextEditor from "@components/input/rich.text";

import { InputWrapper } from "@mantine/core";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type MessageInputProps<T extends { message: string }> = {
  form: UseForm<T>;
  placeholder: string;
  disabled: boolean;
};

const MessageInput = <T extends { message: string }>({
  form,
  placeholder,
  disabled,
}: MessageInputProps<T>) => {
  return (
    <InputWrapper
      label="Message"
      required
      error={form.errors.message}
    >
      <RichTextEditor
        value={form.values.message}
        onChange={(value) => form.setFieldValue(`message`, value.trim())}
        placeholder={placeholder}
        sticky={false}
        readOnly={disabled}
      />
    </InputWrapper>
  );
};

export default MessageInput;
