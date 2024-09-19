import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Filters';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const SexFilter: React.FC = () => {
  const [searchParams] = useSearchParams();

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      {Object.values(Sex).map(typeSex => {
        const isActive =
          (typeSex === 'Male' && searchParams.get('sex') === 'm') ||
          (typeSex === 'Female' && searchParams.get('sex') === 'f') ||
          (typeSex === 'All' && !searchParams.has('sex'));

        return (
          <SearchLink
            params={
              typeSex === 'Male'
                ? { sex: 'm' }
                : typeSex === 'Female'
                  ? { sex: 'f' }
                  : { sex: null }
            }
            className={classNames({ 'is-active': isActive })}
            key={typeSex}
          >
            {typeSex}
          </SearchLink>
        );
      })}
    </p>
  );
};
