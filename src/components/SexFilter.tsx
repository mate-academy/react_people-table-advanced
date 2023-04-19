import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { SearchLink } from './SearchLink';

import { sexOptions } from '../utils/constants';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexOptions.map(({ value, label }) => (
        <SearchLink
          key={label}
          params={{ sex: value }}
          className={classNames({
            'is-active': sex === value,
          })}
        >
          {label}
        </SearchLink>
      ))}
    </p>
  );
};
