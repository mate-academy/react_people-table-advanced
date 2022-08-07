import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../Links/SearchLink';

export const Sexfilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs">
      <SearchLink
        params={{ sex: null }}
        className={classNames({ 'is-active': !sex })}
      >
        All
      </SearchLink>

      <SearchLink
        params={{ sex: 'm' }}
        className={classNames({ 'is-active': sex === 'm' })}
      >
        Male
      </SearchLink>

      <SearchLink
        params={{ sex: 'f' }}
        className={classNames({ 'is-active': sex === 'f' })}
      >
        Female
      </SearchLink>
    </p>
  );
};
