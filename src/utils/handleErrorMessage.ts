import { Errors } from '../types/Errors';

export const handleErrorMessage = (error: Errors): string | null => {
  switch (error) {
    case Errors.Loading:
      return 'peopleLoadingError';

    case Errors.NoPeople:
      return 'noPeopleMessage';
  }

  return null;
};
