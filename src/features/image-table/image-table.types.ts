export type ImageType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  file: { name: string };
};

export type MoveDirection = `left` | `right`;
export type MoveHotkey = `ArrowLeft` | `ArrowRight`;
