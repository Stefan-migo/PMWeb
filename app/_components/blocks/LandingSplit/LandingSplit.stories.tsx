import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingSplit } from "./LandingSplit";

const meta = {
  title: "Blocks/LandingSplit",
  component: LandingSplit,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: {
      test: "todo",
    },
  },
  args: {
    hrefTattoo: "/tatuajes",
    hrefArt: "/arte",
  },
  argTypes: {
    hrefTattoo: { control: "text" },
    hrefArt: { control: "text" },
    tattooEyebrow: { control: "text" },
    tattooTitle: { control: "text" },
    tattooDescription: { control: "text" },
    tattooCta: { control: "text" },
    tattooAriaLabel: { control: "text" },
    artEyebrow: { control: "text" },
    artTitle: { control: "text" },
    artDescription: { control: "text" },
    artCta: { control: "text" },
    artAriaLabel: { control: "text" },
  },
} satisfies Meta<typeof LandingSplit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
