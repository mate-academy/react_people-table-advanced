import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../../utils/SearchLink';

const sexes = [
  { name: 'All', shortName: null },
  { name: 'Male', shortName: 'm' },
  { name: 'Female', shortName: 'f' },
];

const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {sexes.map(({ name, shortName }) => (
        <SearchLink
          key={shortName}
          className={cn({ 'is-active': sex === shortName })}
          params={{ sex: shortName }}
        >
          {name}
        </SearchLink>
      ))}
    </p>
  );
};

export default SexFilter;
