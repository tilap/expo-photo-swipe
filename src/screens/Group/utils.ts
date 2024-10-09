import { Direction } from "@components/Swiper";
import { Choice } from "@utils/stores/assets";

const directionChoiceMap: Record<Direction, Choice> = {
  [Direction.LEFT]: "drop",
  [Direction.RIGHT]: "keep",
};

const choiceDirectionMap = Object.fromEntries(
  Object.entries(directionChoiceMap).map(([direction, choice]: [Direction, Choice]) => [
    choice,
    direction,
  ]),
);

export function convertDirectionToChoice(direction: Direction): Choice | undefined {
  return directionChoiceMap[direction];
}

export function convertChoiceToDirection(choice: Choice): Direction | undefined {
  return choiceDirectionMap[choice];
}
