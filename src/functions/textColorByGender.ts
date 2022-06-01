import { Human } from '../types/Human';

export const textColorByGender = (human: Human | null) => {
  if (!human) {
    return 'not-found-name-text';
  }

  if (human.sex === 'm') {
    return 'male-name-text';
  }

  return 'female-name-text';
};
