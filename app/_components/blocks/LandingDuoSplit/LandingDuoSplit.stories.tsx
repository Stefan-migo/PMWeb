import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingDuoSplit } from "./LandingDuoSplit";

const meta = {
  title: "Blocks/LandingDuoSplit",
  component: LandingDuoSplit,
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
    delay: 300,
    delayTattoo: 200,
    delayArt: 450,
  },
  argTypes: {
    hrefTattoo: { control: "text" },
    hrefArt: { control: "text" },
    delay: { control: "number" },
    delayTattoo: { control: "number" },
    delayArt: { control: "number" },
    imageTattoo: { control: "text" },
    imageArt: { control: "text" },
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
} satisfies Meta<typeof LandingDuoSplit>;

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
