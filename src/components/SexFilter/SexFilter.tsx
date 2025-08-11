import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import { PersonFilterSex } from '../../types/PersonSexFilter';
import cn from 'classnames';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const filterSex = Object.entries(PersonFilterSex);

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {filterSex.map(([key, value]) => {
        const validValue = value !== PersonFilterSex.All ? value : null;
        const isActive = sex === validValue;

        return (
          <SearchLink
            key={key}
            className={cn({
              'is-active': isActive,
            })}
            params={{ sex: validValue }}
          >
            {key}
          </SearchLink>
        );
      })}
    </p>
  );
};
