import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../types';
import { SearchLink } from '../components';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        className={classNames({ 'is-active': !searchParams.has('sex') })}
      >
        All
      </SearchLink>

      {Object.entries(Sex).map(entry => {
        return (
          <SearchLink
            key={entry[0]}
            params={{ sex: entry[1] }}
            className={classNames({
              'is-active': searchParams.get('sex') === entry[1],
            })}
          >
            {entry[0]}
          </SearchLink>
        );
      })}
    </p>
  );
};
