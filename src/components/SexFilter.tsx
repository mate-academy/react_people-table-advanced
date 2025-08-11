import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';
import classNames from 'classnames';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(Sex).map(([sexKey, sexValue]) => {
        return (
          <SearchLink
            key={sexKey}
            className={classNames({ 'is-active': sex === sexValue })}
            params={{ sex: sexValue === '' ? null : sexValue }}
          >
            {sexKey}
          </SearchLink>
        );
      })}
    </p>
  );
};
