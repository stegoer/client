import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { MagicWandIcon } from "@modulz/radix-icons";

import type { UseForm } from "@mantine/hooks/lib/use-form/use-form";

export type EncryptionKeyInputProps<T extends { encryptionKey?: string }> = {
  form: UseForm<T>;
  disabled: boolean;
};

const EncryptionKeyInput = <T extends { encryptionKey?: string }>({
  form,
  disabled,
}: EncryptionKeyInputProps<T>) => {
  return (
    <MantinePasswordInput
      label="Encryption key"
      description={`This key will be needed when decoding and decrypting
        the data so don't forget to store it somewhere.`}
      placeholder="AES key, either 16, 24, or 32 bytes to select AES-128, AES-192, or AES-256."
      icon={<MagicWandIcon />}
      disabled={disabled}
      {...form.getInputProps(`encryptionKey`)}
    />
  );
};

export default EncryptionKeyInput;
