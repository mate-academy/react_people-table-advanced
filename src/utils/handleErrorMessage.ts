import { Errors } from '../types/Errors';

const dataCyLoadingError = 'peopleLoadingError';
const dataCyNoPeopleError = 'noPeopleMessage';

export const handleErrorMessage = (error: Errors): string | null => {
  switch (error) {
    case Errors.Loading:
      return dataCyLoadingError;

    case Errors.NoPeople:
      return dataCyNoPeopleError;
  }

  return null;
};
