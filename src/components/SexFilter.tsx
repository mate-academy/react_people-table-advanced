import { useSearchParams } from 'react-router-dom';
import { SEX_VARIANTS } from '../utils/sexFilter.config';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {SEX_VARIANTS.map(({ key, filter, title }) => (
        <SearchLink
          key={key}
          className={classNames({
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
