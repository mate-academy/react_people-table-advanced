import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../SearchLink';

enum Gender {
  All = '',
  Male = 'm',
  Female = 'f',
}

const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const genderParam = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(Gender).map(([key, value]) => (
        <SearchLink
          key={key}
          className={cn({ 'is-active': genderParam === value })}
          params={{ sex: value }}
        >
          {key}
        </SearchLink>
      ))}
    </p>
  );
};

export default SexFilter;
