import { Card } from "../../types/game";
import servbot from "./servbot";

const SAMPLE_CARD1: Card = {
  ...servbot,
  img: "servbot-ohno.png",
  value: {
    top: 2,
    bottom: 3,
    left: 4,
    right: 5,
  },
};

const SAMPLE_CARD2: Card = {
  ...servbot,
  img: "servbot-ohno2.png",
  value: {
    top: 5,
    bottom: 4,
    left: 3,
    right: 2,
  },
};

const SAMPLE_CARD3: Card = {
  ...servbot,
  img: "servbot-ohno3.png",
  value: {
    top: 8,
    bottom: 2,
    left: 3,
    right: 2,
  },
};

const SAMPLE_CARD4: Card = {
  ...servbot,
  value: {
    top: 2,
    bottom: 2,
    left: 7,
    right: 6,
  },
};

const SAMPLE_CARD5: Card = {
  ...servbot,
  value: {
    top: 3,
    bottom: 1,
    left: 4,
    right: 8,
  },
};

const cards = {
  servbot: servbot,
  sample1: SAMPLE_CARD1,
  sample2: SAMPLE_CARD2,
  sample3: SAMPLE_CARD3,
  sample4: SAMPLE_CARD4,
  sample5: SAMPLE_CARD5,
};

export type AllCardIds = keyof typeof cards;

export default cards;
