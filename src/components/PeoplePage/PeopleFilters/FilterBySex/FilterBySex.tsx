import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../../../SearchLink';
import { sexFilters } from '../utils/FilterParams';
import cn from 'classnames';

export const FilterBySex = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexFilters.map(({ title, value }) => (
        <SearchLink
          key={title}
          params={{ sex: value }}
          className={cn({ 'is-active': sex === value })}
        >
          {title}
        </SearchLink>
      ))}
    </p>
  );
};
