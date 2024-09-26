import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { Filter, Gender } from '../../types/Filter';

export const GenderFilter = () => {
  const [searchParams] = useSearchParams();

  const gender = (searchParams.get('sex') as Filter['sex']) || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(Gender).map(([key, value]) => (
        <SearchLink
          key={key}
          params={{ sex: value || null }}
          className={classNames({ 'is-active': gender === value })}
        >
          {key}
        </SearchLink>
      ))}
    </p>
  );
};
