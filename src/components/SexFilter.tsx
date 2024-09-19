import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';
import { SEX_VARIANTS } from '../utils/sexFilter.config';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  const sexParam = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {SEX_VARIANTS.map(({ key, filter, title }) => (
        <SearchLink
          key={key}
          className={cn({
            'is-active': sexParam === filter,
          })}
          params={{ sex: filter }}
        >
          {title}
        </SearchLink>
      ))}
    </p>
  );
};
