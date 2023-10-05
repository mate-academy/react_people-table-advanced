import { useSearchParams } from 'react-router-dom';

export const useSexFilter = () => {
  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');

  const sexOptions = ['All', 'Male', 'Female'];

  const param = (name: string) => {
    const lowerCaseName = name.toLocaleLowerCase();

    if (lowerCaseName === 'female') {
      return 'f';
    }

    if (lowerCaseName === 'male') {
      return 'm';
    }

    return null;
  };

  const className = (name: string): string => {
    if (sexFilter === param(name)) {
      return 'is-active';
    }

    return '';
  };

  return { sexOptions, param, className };
};
