import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TatuajesPage } from "./TatuajesPage";

const meta = {
  title: "Pages/TatuajesPage",
  component: TatuajesPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
} satisfies Meta<typeof TatuajesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
