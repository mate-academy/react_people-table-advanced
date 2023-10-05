import { SearchLink } from '../../TableHeaders/TableHeder/SearchLink';
import { useSexFilter } from './useSexFilter';

export const SexFilter = () => {
  const { sexOptions, param, className } = useSexFilter();

  return (
    <p className="panel-tabs" data-cy="SexFilter">

      {sexOptions.map(s => (
        <SearchLink
          key={s}
          params={{ sex: param(s) }}
          className={className(s)}
        >
          {s}
        </SearchLink>
      ))}
    </p>
  );
};
