import { Group, Text } from "@mantine/core";
import { GearIcon } from "@modulz/radix-icons";

const AdvancedLabel = () => {
  return (
    <Group>
      <GearIcon />
      <div>
        <Text>Advanced configuration</Text>
        <Text
          size="sm"
          color="dimmed"
        >
          Available for logged-in users only
        </Text>
      </div>
    </Group>
  );
};

export default AdvancedLabel;
