import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import type { ChangeEvent, ReactNode } from "react";

type Props<T extends { file?: File }> = {
  form: UseForm<T>;
  setSelectedFile: (file?: File) => void;
};

const ImageFileInput = <T extends { file?: File }>({
  form,
  setSelectedFile,
}: Props<T>): JSX.Element => {
  const [error, setError] = useState<ReactNode>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0) ?? undefined;

    form.setFieldValue(`file`, file);
    setSelectedFile(file);
  };

  useEffect(() => {
    if (form.errors.file) {
      setError(form.errors.file);
    }
  }, [form.errors.file]);

  return (
    <>
      <label htmlFor="image">Choose an image:</label>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png"
        onChange={(event) => handleChange(event)}
      />

      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}
    </>
  );
};

export default ImageFileInput;
