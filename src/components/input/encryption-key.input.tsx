import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { MagicWandIcon } from "@modulz/radix-icons";

import type { ImagesFormType } from "@features/images/images.types";
import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

const descriptions: Record<ImagesFormType, string> = {
  encode: `This key will be needed when decoding and decrypting
        the data so don't forget to store it somewhere.`,
  decode: `Custom encryption key which you specified when encoding
        data into your image.`,
};

export type EncryptionKeyInputProps<T extends { encryptionKey?: string }> = {
  form: UseForm<T>;
  formType: ImagesFormType;
  disabled: boolean;
};

const EncryptionKeyInput = <T extends { encryptionKey?: string }>({
  form,
  formType,
  disabled,
}: EncryptionKeyInputProps<T>) => {
  return (
    <MantinePasswordInput
      label="Encryption key"
      description={descriptions[formType]}
      placeholder="AES key, either 16, 24, or 32 bytes to select AES-128, AES-192, or AES-256."
      icon={<MagicWandIcon />}
      disabled={disabled}
      value={form.values.encryptionKey}
      onChange={(event) =>
        form.setFieldValue(
          `encryptionKey`,
          event.currentTarget.value || undefined,
        )
      }
      onBlur={() => form.validateField(`encryptionKey`)}
      error={form.errors.encryptionKey}
    />
  );
};

export default EncryptionKeyInput;
