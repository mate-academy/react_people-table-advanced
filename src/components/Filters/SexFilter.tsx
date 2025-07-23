import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { FilterSearchParams, Sex } from '../../types/Filter';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  const sex = (searchParams.get('sex') as FilterSearchParams['sex']) || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(Sex).map(([key, value]) => (
        <SearchLink
          key={key}
          params={{ sex: value }}
          className={classNames({ 'is-active': sex === value })}
        >
          {key === 'All' ? 'All' : key}
        </SearchLink>
      ))}
    </p>
  );
};
