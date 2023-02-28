import { useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { SearchLink } from '../../SearchLink';

type Props = {
  century: string,
  children: React.ReactNode,
};

export const CenturySearchLink: React.FC<Props> = ({ century, children }) => {
  const [searchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const isActive = selectedCenturies.includes(century);

  return (
    <SearchLink
      key={century}
      data-cy="century"
      className={classNames(
        'button mr-1',
        { 'is-info': isActive },
      )}
      params={{
        centuries: isActive
          ? selectedCenturies.filter(c => c !== century)
          : [...selectedCenturies, century],
      }}
    >
      {children}
    </SearchLink>
  );
};
