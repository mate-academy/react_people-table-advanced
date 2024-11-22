import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  century: number;
};

export const Centuries: React.FC<Props> = ({ century }) => {
  const [searchParams] = useSearchParams();

  const normalizedCentury = century.toString();

  const allCenturies = searchParams.getAll('centuries') || [];

  function toggleLetter(centuryParam: string) {
    const newCenturies = allCenturies.includes(centuryParam)
      ? allCenturies.filter(centItem => centItem != centuryParam)
      : [...allCenturies, centuryParam];

    return newCenturies;
  }

  return (
    <SearchLink
      data-cy="century"
      className={classNames('button mr-1', {
        'is-info': allCenturies.includes(normalizedCentury),
      })}
      params={{ centuries: toggleLetter(normalizedCentury) }}
    >
      {normalizedCentury}
    </SearchLink>
  );
};
