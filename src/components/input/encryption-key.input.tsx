import { TextInput } from "@mantine/core";
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
    <TextInput
      label="Encryption key"
      description={`All data is encrypted
        but you can specify your custom encryption key.
        This key will be needed when decoding and decrypting
        the data so don't forget to store it somewhere.`}
      placeholder="AES key, either 16, 24, or 32 bytes to select AES-128, AES-192, or AES-256."
      icon={<MagicWandIcon />}
      disabled={disabled}
      {...form.getInputProps(`encryptionKey`)}
    />
  );
};

export default EncryptionKeyInput;
