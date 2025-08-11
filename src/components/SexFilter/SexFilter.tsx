import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex') || '';

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.entries(Sex).map(([sexKey, sexValue]) => {
        return (
          <SearchLink
            key={sexKey}
            className={classNames({ 'is-active': currentSex === sexValue })}
            params={{ sex: sexValue === '' ? null : sexValue }}
          >
            {sexKey}
          </SearchLink>
        );
      })}
    </p>
  );
};
