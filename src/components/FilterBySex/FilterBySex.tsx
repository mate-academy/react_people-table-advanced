import classNames from 'classnames';
import { SexFilters } from '../../types/SexFilters';
import { SearchLink } from '../SearchLink/SearchLink';
import { useSearchParams } from 'react-router-dom';

export const FilterBySex = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(SexFilters).map(([key, value]) => (
        <SearchLink
          key={key}
          params={{ sex: value || null }}
          className={classNames({
            'is-active': sex === value || (!value && !sex), // If sex is null, it’s the button "All” and if the value is null “All” is active
          })}
        >
          {key}
        </SearchLink>
      ))}
    </p>
  );
};
