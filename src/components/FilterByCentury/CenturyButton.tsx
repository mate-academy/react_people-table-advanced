import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  century: string;
};

export const CenturyButton: React.FC<Props> = ({ century }) => {
  const [searchParams] = useSearchParams();
  let paramsCenturies = [...searchParams.getAll('centuries')];
  const centuries = searchParams.getAll('centuries');

  if (centuries.includes(century)) {
    paramsCenturies = paramsCenturies.filter(
      currentCentury => currentCentury !== century,
    );
  } else {
    paramsCenturies.push(century);
  }

  return (
    <SearchLink
      key={century}
      data-cy="century"
      className={classNames('button', 'mr-1', {
        'is-info': centuries.includes(century),
      })}
      params={{
        centuries: paramsCenturies,
      }}
    >
      {century}
    </SearchLink>
  );
};
