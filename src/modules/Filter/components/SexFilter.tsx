import cn from 'classnames';
import { SearchLink } from '../../Shared/SearchLink';
import { useSearchParams } from 'react-router-dom';

const sexFilters = [
  { title: 'All', value: null },
  { title: 'Male', value: 'm' },
  { title: 'Female', value: 'f' },
];

export const SexFilter = () => {
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
