import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingTriSplit } from "./LandingTriSplit";

const meta = {
  title: "Blocks/LandingTriSplit",
  component: LandingTriSplit,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    a11y: {
      test: "todo",
    },
  },
  args: {
    hrefTattoo: "/tatuajes",
    hrefStage: "/escenico",
    hrefArt: "/arte",
    delay: 300,
    delayTattoo: 200,
    delayStage: 450,
    delayArt: 700,
  },
  argTypes: {
    hrefTattoo: { control: "text" },
    hrefStage: { control: "text" },
    hrefArt: { control: "text" },
    delay: { control: "number" },
    delayTattoo: { control: "number" },
    delayStage: { control: "number" },
    delayArt: { control: "number" },
    imageTattoo: { control: "text" },
    imageStage: { control: "text" },
    imageArt: { control: "text" },
    tattooEyebrow: { control: "text" },
    tattooTitle: { control: "text" },
    tattooDescription: { control: "text" },
    tattooCta: { control: "text" },
    tattooAriaLabel: { control: "text" },
    stageEyebrow: { control: "text" },
    stageTitle: { control: "text" },
    stageDescription: { control: "text" },
    stageCta: { control: "text" },
    stageAriaLabel: { control: "text" },
    artEyebrow: { control: "text" },
    artTitle: { control: "text" },
    artDescription: { control: "text" },
    artCta: { control: "text" },
    artAriaLabel: { control: "text" },
  },
} satisfies Meta<typeof LandingTriSplit>;

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
