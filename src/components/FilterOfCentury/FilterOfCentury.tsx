import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  value: string
};

export const FilterOfCentury: React.FC<Props> = ({ value }) => {
  const [searchParams] = useSearchParams();

  const multipleNumbers = (number: string) => {
    const array = searchParams.getAll('centuries');

    if (number === 'all') {
      return [];
    }

    return array.includes(number)
      ? array.filter((element: string) => element !== number)
      : [...array, number];
  };

  return (
    <SearchLink
      data-cy="century"
      className={classNames('button mr-1', {
        'is-info': searchParams.getAll('centuries').includes(value),
      })}
      params={{
        centuries: multipleNumbers(value),
      }}
    >
      {value}
    </SearchLink>
  );
};
