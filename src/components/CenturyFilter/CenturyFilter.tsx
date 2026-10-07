import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  centuryNumber: string;
};

export const CenturyFilter = ({ centuryNumber }: Props) => {
  const [searchParams] = useSearchParams();

  const getUpdatedCenturies = (newCentury: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    if (currentCenturies.includes(newCentury)) {
      return currentCenturies.filter(century => century !== newCentury);
    }

    return [...currentCenturies, newCentury];
  };

  return (
    <SearchLink
      data-cy="century"
      className={cn('button mr-1', {
        'is-info': searchParams.getAll('centuries')?.includes(centuryNumber),
      })}
      params={{ centuries: getUpdatedCenturies(centuryNumber) }}
    >
      {centuryNumber}
    </SearchLink>
  );
};
