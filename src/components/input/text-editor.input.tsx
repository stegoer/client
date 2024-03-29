import RichTextEditor from "@components/input/rte.input";

import { InputWrapper } from "@mantine/core";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import type { ToolbarControl } from "@mantine/rte/lib/components/Toolbar/controls";

const controls: ToolbarControl[][] = [
  [`bold`, `italic`, `underline`, `strike`, `clean`],
  [`h1`, `h2`, `h3`, `h4`],
  [`orderedList`, `unorderedList`],
  [`codeBlock`, `blockquote`, `image`],
  [`alignLeft`, `alignCenter`, `alignRight`],
  [`sup`, `sub`],
];

export type TextEditorInputProps<T extends { data: string }> = {
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
}: TextEditorInputProps<T>) => {
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
        controls={controls}
      />
    </InputWrapper>
  );
};

export default TextEditorInput;
