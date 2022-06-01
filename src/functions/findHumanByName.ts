import { Human } from '../types/Human';

export const findHumanByName
= (targetName: string, arr: Array<Human>): Human | null => {
  return arr.find(human => human.name === targetName) || null;
};
