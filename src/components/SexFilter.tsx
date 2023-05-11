import { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SEXES } from '../constants';

export const SexFilter: FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {SEXES.map(option => (
        <SearchLink
          key={option}
          className={classNames({
            'is-active': (sex === option
              || (option === 'All' && !sex)),
          })}
          params={{
            sex: option === 'All' ? null : option,
          }}
        >
          {option}
        </SearchLink>
      ))}
    </p>
  );
};
