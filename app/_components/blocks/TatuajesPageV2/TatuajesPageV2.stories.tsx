import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TatuajesPageV2 } from "./TatuajesPageV2";

const meta = {
  title: "Pages/TatuajesPageV2",
  component: TatuajesPageV2,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
} satisfies Meta<typeof TatuajesPageV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
