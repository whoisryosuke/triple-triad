import servbot from "./servbot";

const cards = {
  servbot: servbot,
};

export type AllCardIds = keyof typeof cards;

export default cards;
